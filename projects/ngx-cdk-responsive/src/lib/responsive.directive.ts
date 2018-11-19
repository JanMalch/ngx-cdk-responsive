import {Directive, EventEmitter, Host, Input, OnDestroy, OnInit, Output, TemplateRef, ViewContainerRef} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {AllBreakpoints} from './internal';

@Directive({
  selector: '[responsive]' // tslint:disable-line
})
export class ResponsiveDirective implements OnInit, OnDestroy {

  @Input() observe: string[];
  @Output() updated = new EventEmitter<string>();

  private registeredTemplates = new Map<string, TemplateRef<any>>();
  private defaultTemplate: TemplateRef<any>;
  private sub: Subscription;

  constructor(private vcr: ViewContainerRef,
              private breakpoints: BreakpointObserver) {
  }

  ngOnInit() {
    if (this.observe !== undefined && this.observe.length > 0) {
      this.sub = this.breakpoints.observe(this.observe).subscribe(() => this.render());
    }
  }

  register(size: string, template: TemplateRef<any>) {
    this.registeredTemplates.set(size.trim(), template);
    this.render();
  }

  registerDefault(template: TemplateRef<any>) {
    this.defaultTemplate = template;
    this.render();
  }

  render() {
    const usedSize = Array.from(this.registeredTemplates.keys()).find(size => this.breakpoints.isMatched(AllBreakpoints[size]));
    const usedTemplate = this.registeredTemplates.get(usedSize) || this.defaultTemplate;

    if (usedTemplate !== undefined) {
      this.vcr.clear();
      this.vcr.createEmbeddedView(usedTemplate);
      this.updated.emit(usedSize || 'Default');
    }
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

}


@Directive({
  selector: '[responsiveCase], [responsiveDefault]' // tslint:disable-line
})
export class ResponsiveCaseDirective {

  @Input('responsiveCase') set responsiveCase(size: string) {
    if (size === null) {
      throw new Error('No \'size\' passed. Use \'responsive.default\' for default case.');
    }

    size = size.startsWith('<=') ? size.substring(2).trim() + ' and smaller' : size;
    size = size.startsWith('>=') ? size.substring(2).trim() + ' and larger' : size;

    if (!(size in AllBreakpoints)) {
      throw new Error(`No such size '${size}'. Choose either prefix, suffix, or none.
Available base breakpoints: '${Object.keys(Breakpoints).join('\', \'')}'.
Available prefixes: '<= ', '>= '.
Available suffixes: ' and smaller', ' and larger'.`);
    }
    this.registerTemplate(size);
  }

  @Input('responsiveDefault') set responsiveDefault(_) {
    this.registerDefault();
  }

  constructor(private templateRef: TemplateRef<any>,
              @Host() private host: ResponsiveDirective) {
  }

  registerTemplate(breakpoint: string) {
    this.host.register(breakpoint, this.templateRef);
  }

  registerDefault() {
    this.host.registerDefault(this.templateRef);
  }

}
