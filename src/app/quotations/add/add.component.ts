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
  onSave() {
    this.router.navigate(['/quotation/view']);
  }
  /**
  * navigate to the view page
  */
  onCancel() {
    confirm('Are You Sure?');
    this.router.navigate(['/quotation/view']);

  }
}
