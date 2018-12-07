/**
 * @author Sonal Prajapati
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'quotation', pathMatch: 'full' },
  { path: 'quotation', loadChildren: './quotations/quotations.module#QuotationsModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
