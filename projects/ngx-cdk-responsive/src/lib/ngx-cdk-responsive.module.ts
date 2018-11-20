import { NgModule } from '@angular/core';
import {ResponsiveCaseDirective, ResponsiveSwitchDirective} from './responsive-switch.directive';
import { ResponsiveDirective } from './responsive.directive';

@NgModule({
  declarations: [ResponsiveCaseDirective, ResponsiveSwitchDirective, ResponsiveDirective],
  imports: [],
  exports: [ResponsiveCaseDirective, ResponsiveSwitchDirective, ResponsiveDirective]
})
export class NgxCdkResponsiveModule { }
