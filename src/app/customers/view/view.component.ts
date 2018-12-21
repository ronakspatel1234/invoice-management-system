

/**
 * @author Vaibhavi Prajapati
 */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as CryptoJs from 'crypto-js';
// --------------------------------------//
import { Customers } from './../customers.model';
import { Action, ActionEvent } from './../../shared/table/table.model';
import { CustomersService } from './../customers.service';

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  /**action for perform operation */
  public action = [Action.EDIT, Action.DELETE, Action.VIEW];

  /**heading for table */
  public heading = {
    name: ['ID', 'Number', 'Person', 'Company', 'Group', 'CreatedAt'],
    key: ['id', 'customer_number', 'name', 'company', 'group', 'created_at']
  };
  public totalItems = 0;
  public page = 1;
  public pageSize = 10;
  public customers: Customers[];
  public serchResult: Customers[];
  public sortResult: Customers[];
  public result: Customers[];
  public searchData: string;
  constructor(
    private customersService: CustomersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCustomers();

  }
  /**
   *  @param actionEvent define action what we perform adit or delete
   * If click on edit it redirect to edit page
   * or click on dlete it delete the record */
  actionClick(actionEvent: ActionEvent) {
    console.log(actionEvent);

    if (actionEvent.action === Action.EDIT) {
      const encryptedId = CryptoJs.AES.encrypt(actionEvent.id.toString().trim(), 'aaaa').toString();
      this.router.navigate(['/customer/edit/', encryptedId]);
    } else if (actionEvent.action === Action.VIEW) {
      const encryptedId = CryptoJs.AES.encrypt(actionEvent.id.toString().trim(), 'aaa').toString();
        this.router.navigate(['/customer/detail/', encryptedId]);
    } else if (actionEvent.action === Action.DELETE) {
      this.deleteCustomer(actionEvent.id);
    }

  }

  /** @param id define which record will be deleted
   * delete the record from the server */
  deleteCustomer(id: number) {
    this.customersService.deleteCustomer(id).subscribe(data => this.getCustomers());
  }


  /**this method generate pdf file
   * in data variable contenttoConvert contain id of table with we display in pdf
   */
  public export() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  /** this methos get all data from the server using service */
  getCustomers() {

    this.customersService.getCustomer().subscribe(customer => {
      this.totalItems = customer.length;
      if (this.totalItems > 0) {
         this.getcustomerByPagination();
      }
    });
  }

  /** this method display customer by applying pagination */
  public getcustomerByPagination(): void {
    this.customersService.pagination(this.page, this.pageSize, this.searchData).subscribe(
      (customer) => {
        this.customers = customer;
      });
  }
  /** this method return the search data */


  /** this method serch data from the service and displaying related data */
  public search(data) {
    this.searchData = data;
    this.getCustomers();
  }
  /** this method use for howmany data display in one page */
  goToPage(pageSize: any) {
      this.page = 1;
      this.pageSize = pageSize;
      this.getcustomerByPagination();
  }
  /** this method use when click on next it show other data
   * and for prev its show previous data
   */
  goNextPrev(page: any) {
    if (page === 'next') {
      this.page++;
    } else if (page === 'prev') {
      this.page--;
    }
    this.getcustomerByPagination();
  }
  /** this method use for sort data in asending or descending order */
  sort(keys: any, orders: string): void {

    this.customersService.orderByData(keys, orders).subscribe((data) => {
      this.sortResult = data;
      console.log(this.sortResult);
    });
  }

  // mapData(data: Customers[]): Customers[] {
  //   const mappedData: Customers[] = [];
  //   data.map(each => {
  //     this.map = [
  //       {
  //         id: each.id,
  //         customerNumber: each.customer_number,
  //         name: each.name,
  //         company: each.company,
  //         group: each.group,
  //         createdAt: each.created_at,
  //         email: each.email,
  //         mobileNumber: each.mobile_number,
  //         address: each.address
  //       }
  //     ];
  //     console.log(this.map);

  //   });
  //   mappedData.push(this.map);
  //   return ;
  // }
}
