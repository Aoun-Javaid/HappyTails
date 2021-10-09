import { Component, HostListener, OnInit } from '@angular/core';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/Auth/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ReuseFunctionService } from 'src/app/Services/reuse-function.service';
import { ApisService } from 'src/app/Services/apis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { AngularOtpLibModule } from 'angular-otp-box';
import Swal from 'sweetalert2';

import { ToastrService } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  fontStyle?: string;
  isLoggedIn:any;
  profile:any;
  profileImage:any;
  constructor(
    private auth: AuthService,
    private service: ApisService,
    private routes: Router,
    private reuseFun: ReuseFunctionService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _router: Router,
  ) {
    this.isLoggedIn=true;
    // this.isLoggedIn = this.auth.isLoggedIn();
    this.profile = this.auth.getProfileImage();
   }

  ngOnInit(): void {
  }
  signOut() {
    Swal.fire({
      text: 'Are you sure you want to sign out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff5757',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No!',
    }).then((result) => {
      if (result.value) {
        this.logout();
      }
    });
  }
  logout() {
    localStorage.setItem('logout-event', 'logout' + Math.random());
    this.auth.logout();
    this._router.navigateByUrl('/home');
    $('#imageBtn').trigger('click');
  }
  imageChange() {
    this.profileImage = this.auth.getProfileImage();
    this.isLoggedIn = this.auth.isLoggedIn();
  }
  NotificationFetcher(){
    debugger
   this.service.getnotification().subscribe( res => {
     
     console.log(res);
   })
  }
  
 
}
