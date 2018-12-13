/**
 * @author Sonal Prajapati
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  /**
   * navigate to the view page
   */
<<<<<<< HEAD
  onSave() {
=======
 public onSave() {
>>>>>>> 6d7c746c35d02a81b671cb1cd9e84457814b1ed3
    this.router.navigate(['/quotation/view']);
  }
  /**
  * navigate to the view page
  */
<<<<<<< HEAD
  onCancel() {
=======
  public onCancel() {
>>>>>>> 6d7c746c35d02a81b671cb1cd9e84457814b1ed3
    confirm('Are You Sure?');
    this.router.navigate(['/quotation/view']);

  }
}
