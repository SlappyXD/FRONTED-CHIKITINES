import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navtop',
  templateUrl: './navtop.component.html',
  styleUrls: ['./navtop.component.css']
})
export class NavtopComponent {

  @Input() title: string = '';

}
