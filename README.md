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

## Usage

The library consists of two directives: `responsive` and `responsiveCase`.

Create a wrapper element like `ng-container` with the `responsive` directory
and put your cases inside. The first matching case will be used.

```html
<ng-container responsive>
  <p *responsiveCase="'Small'">Small</p>
  <p *responsiveCase="'Medium'">Medium</p>
  <p *responsiveCase="'Large and larger'">Large</p>
</ng-container>
```

## `responsiveCase`

The `responsiveCase` directive takes a string as input that describes the breakpoint.
`@angular/cdk` breakpoints are used.

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
<ng-container responsive>
  <!--<p *responsiveCase="'Small and smaller'">Small</p>-->
  <p *responsiveCase="'<= Small'">Small</p>
  <p *responsiveCase="'Medium'">Medium</p>
  <p *responsiveCase="'Large and larger'">Large</p>
  <!--<p *responsiveCase="'>=Large'">XLarge</p>-->
</ng-container>
```

>`<p *responsiveCase="'<= Small and larger'">Small</p>` will not work.

## `responsiveDefault`

You can add a fallback case with `responsiveDefault` if no other breakpoint matches.
```html
<ng-container responsive>
  <p *responsiveCase="'<= Small'">Small</p>
  <p *responsiveDefault'">Default</p>
</ng-container>
```


## `responsive`

The `responsive` directive has an input `observe`, that determine on which breakpoint
changes the templates should be updated. When a template is rendered the output `(updated)` will emit.
The value of `observe` is an array of strings that represent queries. 
>See https://material.angular.io/cdk/layout/overview#react-to-changes-to-the-viewport

```html
<ng-container responsive [observe]="observePoints" (updated)="hasChanged($event)">
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
* `MAX_WIDTH` → `max_width` query matching changes (e.g. window was below given `max_width`, now not anymore)
* `MIN_WIDTH` → `min_width` query matching changes
* `ANY_WINDOW_CHANGE` → Whenever one of the 5 window sizes `xs, s, m, l, xl` changes.
