import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, group, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormArrayName, FormGroupName, FormControl } from '@angular/forms';
//-----------------------------------------------------------------------
import { Mode } from './item-description-data.model';
import { ItemList } from './item-list.model';
import { Product, ItemDescriptionData, ItemCalculation } from './item-description-data.model';
import ItemDescriptionUtil from '../item-description/utility';

@Component({
  selector: 'ims-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.scss']
})

export class ItemDescriptionComponent implements OnInit {
  public itemCalculation: ItemCalculation[];
  public itemForm: FormGroup;
  public itemList: ItemList[];
  public product: Product[];
  public total: ItemCalculation;
  public subTotal: number;
  public discountValue: number;
  public sgstValue: number;
  public cgstValue: number;
  public finalTotal: number;
  public itemDescriptionData: ItemDescriptionData[];
  @Input() mode: Mode;
  @Input() set data(data: ItemList[]) {
    this.itemList = data;
  }
  get data() {
    return this.itemList;
  }
  constructor(private fb: FormBuilder) {
    this.subTotal = 0;
  }
  ngOnInit() {
    if (this.mode === Mode.Add) {
      this.createForm();
      // this.addForm();
      // this.form($event, formGroupIndex);
    }
    else if (this.mode === Mode.Edit) {
      this.createForm();

      // this.form(event, formGroupIndex);
      let formArray = this.itemForm.get('addNewLine') as FormArray;
      formArray.controls.forEach((value) => {
        this.itemList.values = this.itemForm.controls['addNewLine'].value.push(value);
        debugger;
        console.log(this.itemList);
        value.controls.patchValue({
          description: this.itemList[0].description
        })
        // this.itemForm.controls.itemList.value.patchValue({
        //   description: this.itemForm.value.ItemList.value.description,
        //   uom: this.itemForm.value.itemList.value.uom
        // })
        console.log(this.itemForm.value.itemList.value.description);
        // this.itemForm.patchValue({
        //   description: this.itemForm.value.description,
        //   uom: this.itemForm.value.uom,
        //   unitPrice: this.itemForm.value.unitPrice,
        // })
        // console.log(this.itemList[0]); 
      });
      // formArray.controls.forEach((value) => {
      //   value.controls.patchValue({
      //     // id:this.addNewLine.value.itemDescriptionData.product.id
      //     description: value.controls.description
      //   })
      // })
      // this.addForm();
      // let controlArray = <FormArray>this.itemForm.controls['addNewLine'];           
      // this.itemList.forEach(app => {
      //             const fb = this.buildGroup();
      //             fb.patchValue(app);
      //             controlArray.push(fb);
      // this.itemForm.controls['addNewLine'] = this.fb.addNewLine(formArray.map(i => this.fb.group(i)));
      // this.myForm.controls['array'] = this.formBuilder.array(newArray.map(i => this.formBuilder.group(i)));
      //  this.itemForm.controls['addNewLine'].push(new FormControl('formArray'));
      // });
    }
    else (this.mode === Mode.View)
    {
      this.createForm();
    }
  }

  public createForm() {
    this.itemForm = this.fb.group({
      id: [''],
      addNewLine: this.fb.array([this.fb.group({
        description: [''],
        uom: [''],
        unitPrice: [''],
        qty: [''],
        total: [''],
      })
      ])
    });
  }
  get addNewLine(): FormArray {
    return this.itemForm.get('addNewLine') as FormArray;
  }

  addForm() {
    this.addNewLine.push(this.fb.group({
      description: [''],
      uom: [''],
      unitPrice: [''],
      qty: [''],
      total: [''],
    }));
  }
  onChange($event, formGroupIndex: number) {
    console.log(formGroupIndex);
    this.form($event, formGroupIndex);
  }
  form(event, formGroupIndex) {
    let FormArrayName = this.itemForm.controls['addNewLine'] as FormArray;
    this.itemList.forEach(
      (item) => {
        if (item.id == event) {
          console.log(item.id);
          FormArrayName.controls[formGroupIndex].patchValue({
            description: item.id,
            uom: item.uom,
            unitPrice: item.unitPrice,
            qty: '1',
            total: '',
          })
        }
      }
    )
  }
  onKeyUp(event, i) {
    this.calculation(i);
  }

  calculation(i) {
    let formArray = this.itemForm.get('addNewLine') as FormArray;
    formArray.controls[i].patchValue({
      total: formArray.controls[i].value.qty * formArray.controls[i].value.unitPrice,
    })
    this.calculateSubTotal();
  }

  calculateSubTotal() {
    let formArray = this.itemForm.get('addNewLine') as FormArray;
    this.subTotal = 0;
    formArray.controls.forEach(value => {
      this.subTotal += value.value.total;
    })
  }

  deleteRow(i) {
    let control = <FormArray>this.itemForm.controls.addNewLine;
    control.removeAt(i);
    this.calculateSubTotal();
    this.calculateGrandTotal();
  }

  calculateDiscount(discunt) {
    this.discountValue = ItemDescriptionUtil.subtraction(discunt, this.subTotal);
  }

  calculateCGST(cgst) {
    this.cgstValue = ItemDescriptionUtil.addition(cgst, this.subTotal);
  }

  calculateSGST(sgst) {
    this.sgstValue = ItemDescriptionUtil.add(sgst, this.subTotal);
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.finalTotal = this.subTotal - this.discountValue + this.sgstValue + this.cgstValue
  }


}

