import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { ApisService } from 'src/app/Services/apis.service';
import { ReuseFunctionService } from 'src/app/Services/reuse-function.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';

declare const $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  phoneNumber: any = '';
  visibilityIcon: any = '/assets/images/hide.png';
  visibilityIcon1: any = '/assets/images/hide.png';
  show1: boolean;
  show: boolean;
  address: any = '';
  userName: any = '';
  password: any = '';
  confirmPassword: any = '';
  email: any = '';
  phoneNo: any = '';
  otpResult: any;
  name: any = '';
  shelter: any = '';
  city: any = '';
  bio: any = '';
  open: any = '';
  close: any = '';

  showcontent: boolean = false;
  readioSelected: any;
  formToggle: any = true;
  state: any;
  fileToUpload: File | null = null;
  selectedState: any;
  profilePic: any="";
  selectedUser: any = 0;
  user = [
    { id: 0, name: 'Adoptor' },
    { id: 1, name: 'Rescue Organization' },
  ];

  formBool: any = 0;

  public settings = {
    length: 4,
    numbersOnly: true,
    timer: 60,
    timerType: 1,
  };

  constructor(
    private reuseFun: ReuseFunctionService,
    private routes: Router,
    private service: ApisService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.listState();
  }

  formCall(val, val2) {
    this.formBool = val;
    this.selectedUser = val2;
  }

  back() {
    this.formToggle = true;
  }

  numberCheck(e) {
    return this.reuseFun.numberCheckWithLength(e);
  }

  listState(apiArray = null, spinStatus = null) {
    if (spinStatus) {
      // this.spinner.show();
    }
    this.service.listState().subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          // this.spinner.hide();
          // this.reuseFun.errorShowSwal(res['data'].message);
        } else {
          this.state = res['data'];
        }
      },
      (err: any) => {
        // this.spinner.hide();
      }
    );
  }

  removeErrors(fieldErrorName) {
    $(fieldErrorName).text('');
  }

  checkSignup(form: NgForm) {
    let errorStatus = false;
    if (this.formBool == 1) {
      if (this.reuseFun.textTypeLength('#l2', 'Name', this.name.length, 3, 30))
        errorStatus = true;

      if (
        this.reuseFun.textTypeLength(
          '#l3',
          'User Name',
          this.userName.length,
          3,
          30
        )
      )
        errorStatus = true;

      if (this.reuseFun.emailType('#l4', this.email)) errorStatus = true;

      if (
        this.reuseFun.textTypeLengthPhoneNumber(
          '#l5',
          'Phone Number',
          this.phoneNo.length,
          11,
          11
        )
      )
        errorStatus = true;

      if (
        this.reuseFun.textTypeLength(
          '#l6',
          'Address',
          this.address.length,
          3,
          50
        )
      )
        errorStatus = true;

      if (this.reuseFun.checkEmpty('#l7', 'State', this.selectedState))
        errorStatus = true;

      if (this.reuseFun.strongPassword('#l8', 'Password', this.password, 6, 30))
        errorStatus = true;

      if (
        this.reuseFun.confirmPasswordValidator(
          '#l9',
          'Confirm password',
          this.password,
          this.confirmPassword
        )
      )
        errorStatus = true;

      if (this.reuseFun.textTypeLength('#l11', 'City', this.city.length, 2, 50))
        errorStatus = true;
      if (this.reuseFun.textTypeLength('#l12', 'Bio', this.bio.length, 3, 50))
        errorStatus = true;
    }

    if (this.formBool == 2) {
      if (this.reuseFun.textTypeLength('#l2', 'Name', this.name.length, 3, 30))
        errorStatus = true;

      if (
        this.reuseFun.textTypeLength(
          '#l3',
          'User Name',
          this.userName.length,
          3,
          30
        )
      )
        errorStatus = true;

      if (this.reuseFun.emailType('#l4', this.email)) errorStatus = true;

      if (
        this.reuseFun.textTypeLengthPhoneNumber(
          '#l5',
          'Phone Number',
          this.phoneNo.length,
          11,
          11
        )
      )
        errorStatus = true;

      if (
        this.reuseFun.textTypeLength(
          '#l6',
          'Address',
          this.address.length,
          3,
          50
        )
      )
        errorStatus = true;

      if (this.reuseFun.checkEmpty('#l7', 'State', this.selectedState))
        errorStatus = true;

      if (this.reuseFun.strongPassword('#l8', 'Password', this.password, 6, 30))
        errorStatus = true;

      if (
        this.reuseFun.confirmPasswordValidator(
          '#l9',
          'Confirm password',
          this.password,
          this.confirmPassword
        )
      )
        errorStatus = true;
      if (
        this.reuseFun.textTypeLength(
          '#l10',
          'Shelter/Organization',
          this.shelter.length,
          3,
          50
        )
      )
        errorStatus = true;
      if (this.reuseFun.textTypeLength('#l11', 'City', this.city.length, 2, 50))
        errorStatus = true;
      if (this.reuseFun.textTypeLength('#l12', 'Bio', this.bio.length, 3, 50))
        errorStatus = true;
      if (
        this.reuseFun.textTypeLength(
          '#l13',
          'Opening Hour',
          this.open.length,
          1,
          50
        )
      )
        errorStatus = true;
      if (
        this.reuseFun.textTypeLength(
          '#l14',
          'Closing Hour',
          this.close.length,
          1,
          50
        )
      )
        errorStatus = true;
    }

    if (errorStatus == false) {
      this.sendOtp();

    }
  }

  public onInputChange(e) {
    if (e.length == this.settings.length) {
      // e will emit values entered as otp and,
      if (e == this.otpResult) {
        this.onSubmitSignup(this.fileToUpload);
      } else {
        this.reuseFun.errorShowSwal('Invalid OTP');
      }

    } else if (e == -1) {
      // if e == -1, timer has stopped

    } else if (e == -2) {
      // e == -2, button click handle
      this.sendOtp();

    }
  }
 

  sendOtp() {
    this.spinner.show();
    this.service.sendOtp(this.email, this.phoneNo, this.userName).subscribe(
      (res: any) => {
        if (res.code == 400) {
          this.spinner.hide();
          // this.reuseFun.errorShowSwal(res['data'].message);
        } else {
          this.otpResult = res.OTPcode;
          this.formToggle = false;
          this.spinner.hide();
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    var file = files[0];

    var reader = new FileReader();

    reader.onload = this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);
  }

  _handleReaderLoaded(e) {
    this.profilePic = 'data:image/png;base64,' + btoa(e.target.result);
  }

  onSubmitSignup(fileToUpload: File) {
    this.spinner.show();

    const formData = new FormData();

    formData.append('userType', this.selectedUser);
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('username', this.userName);
    formData.append('phone', this.phoneNo);
    formData.append('address', this.address);
    formData.append('state_id', this.selectedState);
    formData.append('password', this.password);
    formData.append('shelter_city', this.shelter);
    formData.append('shelter_bio', this.bio);
    formData.append('opening_hour', this.open);
    formData.append('closing_hour', this.close);
    if(this.profilePic!="")
    formData.append('profile_picture', fileToUpload);

    this.service.signup(formData).subscribe(
      (res: any) => {
        if (res.code == 400) {
          this.reuseFun.errorShowSwal(res['data'].message);
          this.spinner.hide();
        } else {
          this.routes.navigate(['/login']);
          this.spinner.hide();
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);
      }
    );
  }

  passwordShowHide() {
    this.show = this.reuseFun.passwordVisibility();
    if (this.show) {
      this.visibilityIcon = '/assets/images/show.png';
    } else {
      this.visibilityIcon = '/assets/images/hide.png';
    }
  }

  passwordShowHideConfirmPassword() {
    this.show1 = this.reuseFun.passwordVisibility();
    if (this.show1) {
      this.visibilityIcon1 = '/assets/images/show.png';
    } else {
      this.visibilityIcon1 = '/assets/images/hide.png';
    }
  }
}
