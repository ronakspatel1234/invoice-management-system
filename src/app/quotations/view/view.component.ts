/**
 * @author Sonal Prajapati
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onNewOqutation() {
    this.router.navigate(['/quotation/add']);

  }
}
