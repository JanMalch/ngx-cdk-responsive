[![npm version](https://badge.fury.io/js/ngx-cdk-responsive.svg)](https://badge.fury.io/js/ngx-cdk-responsive) 

# ngx-cdk-responsive

This library provides a simple `responsive` directive that helps you switch templates on different sizes.
It build on top of the `@angular/cdk`.

## Installation

```
npm i ngx-cdk-responsive
```

Import in your module:

```typescript
@NgModule({
  imports: [
    NgxCdkResponsiveModule
  ]
})
```

The library consists of two directives: `responsive` and `responsiveSwitch` + `responsiveCase`.

Two quick code examples:

```html
<p *responsive="{'Small and smaller': onSmall}" >Default</p>

<ng-template #onSmall>
  <p>Small and smaller</p>
</ng-template>
```

```html
<ng-container responsiveSwitch>
  <p *responsiveCase="'<= Small'">Small</p>
  <p *responsiveDefault>Default</p>
</ng-container>
```

## Usage of `responsive`

The `responsive` directives is a structural directives added to any element. It takes a map of `Breakpoint → TemplateRef` pairs as input.
The first breakpoint that matches will have its template rendered. If no breakpoints match the template in the host will be used.

```html
<p *responsive="{'Small and smaller': onSmall, 'Medium': onMedium}">Default</p>

<ng-template #onSmall>
  <p>Small and smaller</p>
</ng-template>
<ng-template #onMedium>
  <p>Medium</p>
</ng-template>
```

## Usage of `responsiveSwitch`

Create a wrapper element like `ng-container` with the `responsiveSwitch` directory
and put your cases inside. The first matching case will be used.

```html
<ng-container responsiveSwitch>
  <p *responsiveCase="'<= Small'">Small</p>
  <p *responsiveCase="'Medium'">Medium</p>
  <p *responsiveDefault>Default Fallback</p>
</ng-container>
```

## Available Breakpoints

Both the `responsive` input object and `responsiveCase` directive take a string that describes the breakpoint.
The following `@angular/cdk` breakpoints are available.

* XSmall
* Small
* Medium
* Large
* XLarge
* Handset
* Tablet
* Web
* HandsetPortrait
* TabletPortrait
* WebPortrait
* HandsetLandscape
* TabletLandscape
* WebLandscape

All breakpoints can be extended be **either** using the prefixes `<=` / `>=` 
or the suffixes ` and smaller` / ` and larger`. They mean the same.

Consider the following working example:

```html
<ng-container responsiveSwitch>
  <!--<p *responsiveCase="'Small and smaller'">Small</p>-->
  <p *responsiveCase="'<= Small'">Small</p>
  <p *responsiveCase="'Medium'">Medium</p>
  <p *responsiveCase="'Large and larger'">Large</p>
  <!--<p *responsiveCase="'>=Large'">XLarge</p>-->
</ng-container>
```

>`<p *responsiveCase="'<= Small and larger'">Small</p>` will not work.


## `observe` and `update`

Both main directives have an input `observe`, that determine on which breakpoint
changes the templates should be updated. When a template is rendered the output `(update)` will emit.

Unfortunately structural directives don't have outputs. For the `responsive` write 

```html
<p *responsive="{'Small and smaller': none}; observe: observePoints; update: onChange$">Default</p>
<ng-template #none></ng-template>
``` 

```typescript
onChange$ = new Subject<string>();

ngOnInit() {
  this.onChange$.subscribe(val => this.hasChanged("onChange$: " + val));
}
```

### `observe`

The value of `observe` is an array of strings that represent queries. 
>See https://material.angular.io/cdk/layout/overview#react-to-changes-to-the-viewport

```html
<ng-container responsiveSwitch [observe]="observePoints" (update)="hasChanged($event)">
  <p *responsiveCase="'Small'">Small</p>
  <p *responsiveCase="'Medium'">Medium</p>
  <p *responsiveCase="'Large and larger'">Large</p>
</ng-container>
```

```typescript
import {Observe} from 'ngx-cdk-responsive';
// ...
observePoints = [Observe.ORIENTATION, ...Observe.ANY_WINDOW_CHANGE];

hasChanged(newSize: string) {
  console.log('newSize:', newSize);
}
```

The `Observe` namespace contain triggers for the following cases:

* `ORIENTATION` → orientation changes
* `MAX_WIDTH(value: number, unit: string = "px")` → `max_width` query matching changes (e.g. window was below given `max_width`, now above)
* `MIN_WIDTH(value: number, unit: string = "px")` → `min_width` query matching changes
* `ANY_WINDOW_CHANGE` → Whenever one of the 5 window sizes `xs, s, m, l, xl` changes.
