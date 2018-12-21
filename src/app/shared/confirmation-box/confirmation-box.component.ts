 import { Component, OnInit, Output, EventEmitter } from '@angular/core';
 import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

 @Component({
  selector: 'ims-confirmation-box',
templateUrl:'confirmation-box.html'
 })
export class ConfirmationBoxComponent implements OnInit {

 constructor() { }
  @Output() saveClick=new EventEmitter();
  @Output() cancelClick=new EventEmitter();
   ngOnInit() {
   }

   save()
   {
     this.saveClick.emit();
   }

   cancel()
   {
     this.cancelClick.emit();
   }


 }
