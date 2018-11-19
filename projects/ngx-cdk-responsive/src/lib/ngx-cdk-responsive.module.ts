import { NgModule } from '@angular/core';
import {ResponsiveCaseDirective, ResponsiveDirective} from './responsive.directive';

@NgModule({
  declarations: [ResponsiveCaseDirective, ResponsiveDirective],
  imports: [],
  exports: [ResponsiveCaseDirective, ResponsiveDirective]
})
export class NgxCdkResponsiveModule { }
