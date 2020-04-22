import { Component } from '@angular/core';

/**
 * Generated class for the MainMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.html'
})
export class MainMenuComponent {

  text: string;

  constructor() {
    console.log('Hello MainMenuComponent Component');
    this.text = 'Hello World';
  }

}
