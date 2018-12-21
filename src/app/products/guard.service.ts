import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router'
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate
{
  canDeactivate:()=>Observable<boolean>
}

@Injectable()
export class GuardService implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component:CanComponentDeactivate)
    {
      return component.canDeactivate ? component.canDeactivate() : true;
    }



}
