import { Component, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PageHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-header',
  templateUrl: 'page-header.html'
})
export class PageHeaderComponent {

  @Input('spacer') spacer: boolean = true;
  @Input('color') color: string = 'text-all-black';
  @Input('title') title: string;
  @Input('hasDismiss') hasDismiss: boolean = false;
  @Input('icon') icon: string = 'close';
  @Input('subtitle') subtitle: string;

  constructor(public viewCtrl: ViewController,) {
    console.log('Hello PageHeaderComponent Component');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
