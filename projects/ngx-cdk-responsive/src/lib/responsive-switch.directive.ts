import {
  AfterViewInit,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {AllBreakpoints} from './models';


@Directive({
  selector: '[responsiveCase], [responsiveDefault]' // tslint:disable-line
})
export class ResponsiveCaseDirective {

  @Input('responsiveCase') set responsiveCase(size: string) {
    this._size = this.normalizeSize(size);
  }

  @Input('responsiveDefault') set responsiveDefault(_: null | never) {
    this._size = 'Default';
  }

  private _size: string;

  get size(): string {
    return this._size;
  }

  constructor(public readonly templateRef: TemplateRef<any>) {
  }

  normalizeSize(input: string): string {
    if (input === null) {
      throw new Error('No \'size\' passed. Use \'responsive.default\' for default case.');
    }

    input = input.startsWith('<=') ? input.substring(2).trim() + ' and smaller' : input;
    input = input.startsWith('>=') ? input.substring(2).trim() + ' and larger' : input;

    if (!(input in AllBreakpoints)) {
      throw new Error(`No such size '${input}'. Choose either prefix, suffix, or none.
Available base breakpoints: '${Object.keys(Breakpoints).join('\', \'')}'.
Available prefixes: '<= ', '>= '.
Available suffixes: ' and smaller', ' and larger'.`);
    }

    return input;
  }
}

@Directive({
  selector: '[responsiveSwitch]' // tslint:disable-line
})
export class ResponsiveSwitchDirective implements OnDestroy, AfterViewInit {

  @Input() observe: string[];
  @Output() update = new EventEmitter<string>();

  @ContentChildren(ResponsiveCaseDirective) private contentChildren: QueryList<ResponsiveCaseDirective>;

  private registeredTemplates: { [size: string]: TemplateRef<any> } = {};
  private defaultTemplate: TemplateRef<any>;
  private sub: Subscription;

  constructor(private vcr: ViewContainerRef,
              private breakpoints: BreakpointObserver) {
  }

  ngAfterViewInit(): void {
    const children = this.contentChildren.toArray();
    this.registeredTemplates = children.filter(c => c.size !== 'Default')
      .reduce((acc, curr) => {
        acc[curr.size] = curr.templateRef;
        return acc;
      }, {});

    const defaultCase = children.find(c => c.size === 'Default');
    this.defaultTemplate = defaultCase !== undefined ? defaultCase.templateRef : undefined;

    setTimeout(() => this.render(), 0);
    if (this.observe !== undefined && this.observe.length > 0) {
      this.sub = this.breakpoints.observe(this.observe).subscribe(() => this.render());
    }
  }

  render() {
    const usedSize = Object.keys(this.registeredTemplates).find(size => this.breakpoints.isMatched(AllBreakpoints[size]));
    const usedTemplate = this.registeredTemplates[usedSize] || this.defaultTemplate;

    if (usedTemplate !== undefined) {
      this.vcr.clear();
      this.vcr.createEmbeddedView(usedTemplate);
      this.update.emit(usedSize || 'Default');
    }
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
    this.vcr.clear();
  }

}

