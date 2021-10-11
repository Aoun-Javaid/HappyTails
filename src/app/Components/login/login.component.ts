import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/Auth/auth.service';
import {ApisService} from '../../Services/apis.service';
import {ReuseFunctionService} from '../../Services/reuse-function.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {SocialAuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  config = {
    ignoreBackdropClick: true,
    class: 'modal-md modal-dialog-centered',
  };
  visibilityIcon: any = '/assets/images/hide.png';
  visibilityIcon1: any = '/assets/images/hide.png';
  show1: boolean;
  show: boolean;
  imagePath: any;
  modalRef: BsModalRef;
  formToggle: any = 0;
  otpResult: any;
  Password: any = '';
  Email: any = '';
  newPassword: any = '';
  confirmPassword: any = '';


  constructor(
    private reuseFun: ReuseFunctionService,
    private modalService: BsModalService,
    private routes: Router,
    private service: ApisService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private authSocialService: SocialAuthService
  ) {
    this.imagePath = this.reuseFun.imagePath;

    if (this.auth.isLoggedIn()) {
      //if user login status  true then check its verified status
      this.routes.navigate(['/free-scroll']);
    }
    this.show = false;
  }

  ngOnInit() {

  }


  passwordShowHide() {
    this.show = this.reuseFun.passwordVisibility();
    if (this.show) {
      this.visibilityIcon = '/assets/images/show.png';
    } else {
      this.visibilityIcon = '/assets/images/hide.png';
    }
  }

  newPasswordShowHide() {
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


  removeErrors(fieldErrorName) {
    $(fieldErrorName).text('');
  }


  checkEmail(form: NgForm) {
    let errorStatus = false;
    if (this.reuseFun.emailType('#l3', this.Email)) errorStatus = true;

    if (errorStatus == false) {

      this.onSubmitEmail()
    }
  }

  close() {
    this.Email = null;
  }


  onSubmitEmail() {
    this.spinner.show();
    this.service.validateEmail(this.Email).subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.reuseFun.errorShowSwal(res['data'].message);
          this.spinner.hide();

        } else {
          this.otpResult = res['data'].OTP;
          this.formToggle = 1;
          this.reuseFun.successShowSwal(res['data'].message);
          this.spinner.hide();

        }
      },
      (err: any) => {
      }
    );
  }

  numberCheck(e) {
    return this.reuseFun.numberCheckWithLength(e);
  }

  checkLogin(form: NgForm, template) {
    let errorStatus = false;
    if (this.reuseFun.emailType('#l1', form.value.email)) errorStatus = true;
    if (
      this.reuseFun.textTypeLength(
        '#l2',
        'Password',
        form.value.password.trim().length,
        6,
        30
      )
    )
      errorStatus = true;
    if (errorStatus == false) {
      this.onSubmitLogin(form, template);
    }
  }

  onSubmitLogin(form: NgForm, template) {
    this.spinner.show();
    this.service.login(form.value.email, form.value.password).subscribe(
      (res: any) => {
        // if (res['message'] == 'message' ) {
        // } else {
        this.auth.sendToken(res.token);
        this.auth.sendFullName(res['data'].name);
        this.auth.sendUserId(res['data'].id);
        this.auth.sendProfileImage(res['data'].profile_picture_url);

        this.auth.sendEmail(res['data'].email);
        this.auth.sendRole(res['data'].userType);

        // $('#imageBtn').trigger('click');
        this.modalRef = this.modalService.show(template, this.config);
        this.routes.navigate(['/free-scroll']);
        this.spinner.hide();

      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);


      }
    );
  }

  onSubmitAdd() {
    this.routes.navigate(['/free-scroll']);
    this.modalRef.hide();
  }
}
