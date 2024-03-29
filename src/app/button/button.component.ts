import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Output() buttonClick =  new EventEmitter<MouseEvent>;

  onClick(event:MouseEvent){
    this.buttonClick.emit(event);
  }
}
