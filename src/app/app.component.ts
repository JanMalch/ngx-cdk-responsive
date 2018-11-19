import { Component } from '@angular/core';
import {Observe} from 'ngx-cdk-responsive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  i = 0;

  readonly observePoints = [Observe.ORIENTATION, ...Observe.ANY_WINDOW_CHANGE];

  incr() {
    this.i++;
  }

  hasChanged(newSize: string) {
    console.log('newSize:', newSize);
  }
}
