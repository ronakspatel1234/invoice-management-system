import { Injectable } from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { promise } from 'protractor';

export interface CanComponentDeactivate
{
  // canDeactivate:()=>Observable<boolean>
  confirm():boolean;
}

@Injectable()
export class GuardService implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component:CanComponentDeactivate,
      // next:ActivatedRouteSnapshot,state:RouterStateSnapshot
      ):Observable<boolean>  | boolean
    {
      return component.confirm();
    }



}
