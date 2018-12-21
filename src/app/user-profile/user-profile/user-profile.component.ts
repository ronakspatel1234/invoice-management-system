/**
 * @author- Shahbaz Shaikh
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// ----------------------------------------------------- //
import { UserProfileService } from '../user-profile.service';
import { UserProfile } from '../user-profile.model';


@Component({
  selector: 'ims-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userProfiles: UserProfile;
  public userProfileForm: FormGroup;
  public id: number;

  // Declare variable for regular expression
  public nameRegEx: string;
  public emailRegEx: string;
  public numberRegEx: string;

  constructor(private service: UserProfileService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.userProfiles = new UserProfile();
    // Define variable for regular expression
    this.nameRegEx = '[a-zA-Z][a-zA-Z ]+[a-zA-Z]$';
    this.emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
    this.numberRegEx = '^[0-9]+$';
  }

  ngOnInit() {
    this.updateDetails();
    this.updateSettings();
    this.userProfileForm.get('password').valueChanges.subscribe(val => {
      this.validatePassword(val);
    });
  }

  public updateDetails() {
    this.userProfileForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern(this.nameRegEx)]],
      title: [{ value: '', disabled: true }],
      email: ['', [Validators.pattern(this.emailRegEx)]],
      mobile_number: ['', [Validators.pattern(this.numberRegEx), Validators.maxLength(10)]],
      password: ['', [Validators.required]],
      new_password: [{ value: '', disabled: true }],
      retype_password: [{ value: '', disabled: true }]
    },
      {
        validator: UserProfileComponent.MatchPassword
      });
  }

  public updateSettings(): void {
    const loginUser = localStorage.getItem('token');
    this.service.getUserByEmail(loginUser)
      .subscribe((userProfile) => {
        this.userProfiles = userProfile,
          this.userProfileForm.patchValue({
            id: this.userProfiles[0].id,
            name: this.userProfiles[0].name,
            title: this.userProfiles[0].title,
            email: this.userProfiles[0].email,
            mobile_number: this.userProfiles[0].mobile_number,
            // password: this.userProfiles[0].password
          });
      });
  }

  onSubmit(): void {
    const userProfile: UserProfile = new UserProfile();
    userProfile.id = this.userProfileForm.get('id').value;
    userProfile.email = this.userProfileForm.get('email').value;
    userProfile.mobile_number = this.userProfileForm.get('mobile_number').value;
    userProfile.name = this.userProfileForm.get('name').value;
    userProfile.password = this.userProfileForm.get('new_password').value;

    this.service.updateUserProfile(userProfile).subscribe(obj => {
      localStorage.setItem('token', userProfile.email);
    });
    alert('Update Record Suceefully.');
    this.router.navigate(['/dashboard']);
  }

  validatePassword(val) {
    if (this.userProfiles[0].password === val) {
      this.userProfileForm.get('new_password').enable();
      this.userProfileForm.get('retype_password').enable();
    } else {
      this.userProfileForm.get('new_password').disable();
      this.userProfileForm.get('retype_password').disable();
    }
  }


  // tslint:disable-next-line:member-ordering
  static MatchPassword(ac: AbstractControl) {
    const newPassword = ac.get('new_password').value;
    const confirmPassword = ac.get('retype_password').value;
    if (newPassword !== confirmPassword) {
      ac.get('retype_password').setErrors({ notmatch: true });
    } else {
      ac.get('retype_password').setErrors(null);
    }
  }

}
