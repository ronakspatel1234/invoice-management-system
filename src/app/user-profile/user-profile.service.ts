/**
 * @author - Ronak Patel.
 * @description - Create for get user data from component and pass to server.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// --------------------------------------------------------------------------------//
import { environment } from '../../environments/environment';
import { UserProfile } from './user-profile.model';

@Injectable()
export class UserProfileService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
/**
 * Create for get user from server.
 * @property url define for user profile base url.
 */
  public getUser(): Observable<UserProfile> {
    const url = this.baseUrl + '/user_profile';
    return this.http.get<UserProfile>(url);
  }

}
