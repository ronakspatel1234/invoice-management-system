import { Component, OnInit, Input } from '@angular/core';
import { Mode } from './enums.model';
import { Items } from './items.model';
import { ItemDescriptionData } from './item-description-data.model';
import { element } from 'protractor';

@Component({
  selector: 'ims-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.scss']
})
export class ItemDescriptionComponent implements OnInit {

@Input() mode : Mode[];
@Input() item : ItemDescriptionData[];
public key: any;
public itemList : any[];
@Input() set  data(data : ItemDescriptionData[]){
this.itemList=data;
if (data){
  this.itemList.forEach(element =>{
    this.key = Object.keys(element);
    console.log(this.key);
  });
}
}
get data() {
  return this.itemList;
}

  constructor() { }

  ngOnInit() {
  }

}
