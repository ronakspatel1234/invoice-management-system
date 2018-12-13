/**
 * @author Sonal Prajapati
<<<<<<< HEAD
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
=======
 * @description this class represent for view the quotation.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// -------------------------------//
import { QuotationService } from '../quotation.service';
>>>>>>> 6d7c746c35d02a81b671cb1cd9e84457814b1ed3

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

<<<<<<< HEAD
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onNewOqutation() {
    this.router.navigate(['/quotation/add']);

=======
  action = ['EDIT', 'DELETE'];
  heading = {
    name: ['ID', 'Number', 'Issue Date', 'Expiry Date', 'Customer', 'Grand Total', 'Status'],
    key: ['id', 'quotation_number', 'issue_date', 'expiry_date', 'customer_id', 'grand_total', 'status']
  };
  qoutation;
  constructor(private router: Router, private quotationService: QuotationService) { }

  ngOnInit() {
    this.quotation();
  }
  public quotation() {
    this.quotationService.getQoutation().subscribe((qoutations) => {
      this.qoutation = qoutations;
      console.log(this.qoutation);

    });
  }
  public onNewOqutation() {
    this.router.navigate(['/quotation/add']);
  }
  actionClick(id, id1) {
    this.router.navigate(['/qoutation/add']);
>>>>>>> 6d7c746c35d02a81b671cb1cd9e84457814b1ed3
  }
}
