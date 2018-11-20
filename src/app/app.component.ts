import {Component, OnInit} from '@angular/core';
import {Observe} from 'ngx-cdk-responsive';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  i = 0;

  onChange$ = new Subject<string>();
  readonly observePoints = [Observe.ORIENTATION, ...Observe.ANY_WINDOW_CHANGE];

  ngOnInit() {
    this.onChange$.subscribe(val => this.hasChanged("onChange$: " + val));
  }

  incr() {
    this.i++;
  }

  hasChanged(newSize: string) {
    console.log('newSize:', newSize);
  }
}
