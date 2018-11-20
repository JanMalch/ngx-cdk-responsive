import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subject, Subscription} from 'rxjs';
import {AllBreakpoints} from './models';
import {AvailableBreakpoints} from './models';

@Directive({
  selector: '[responsive]' // tslint:disable-line
})
export class ResponsiveDirective implements OnInit, OnDestroy {

  /* tslint:disable */
  @Input('responsive') alternativeElements: Partial<AvailableBreakpoints<TemplateRef<any>>>;
  @Input('responsiveObserve') observe: string[];
  @Input('responsiveUpdate') update: Subject<string> | undefined;
  /* tslint:enable */

  private sub: Subscription;

  constructor(private tmpl: TemplateRef<any>,
              private vcr: ViewContainerRef,
              private breakpoints: BreakpointObserver) {
  }

  ngOnInit() {
    if (this.observe !== undefined && this.observe.length > 0) {
      this.sub = this.breakpoints.observe(this.observe).subscribe(() => this.render());
    }
    this.render();
  }

  render() {
    const usedSize = Object.keys(this.alternativeElements).find(size => this.breakpoints.isMatched(AllBreakpoints[size]));
    const usedTemplate = this.alternativeElements[usedSize] || this.tmpl;
    this.vcr.clear();
    this.vcr.createEmbeddedView(usedTemplate);
    if (this.update !== undefined) {
      this.update.next(usedSize || 'Default');
    }
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
    this.vcr.clear();
  }

}
