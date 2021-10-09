import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { ApisService } from 'src/app/Services/apis.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReuseFunctionService } from 'src/app/Services/reuse-function.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [NgbCarouselConfig], // add NgbCarouselConfig to the component providers
})
export class ProfileComponent implements OnInit {
  resultList: any = [];
  resultList1: any = [];
  resultListProduct: any = [];
  resultListLike: any = [];
  userId: any = '';
  productId: any = [];
  resultListComment: any = [];
  resultListFollowing: any = [];
  commentProductId: any = [];
  comment: any = [];
  comments: any = [];
  editComments = true;
  url: any = [];
  cities: any = [];
  selectedCity: any;
  profilePic: any;
  modalRef: BsModalRef;
  firstName: any;
  lastName: any;
  max = '9';
  otpResult:any;
  dukanName: any;
  dukanBio: any;
  address: any;
  phoneNumber: any;
  oldPhoneNumber:any;
  imagePath: any;
  commentModalToggle: boolean = true;
  imageIndex:any;
  image:any;
  resultListFollower: any = [];
  previousPageCount: any;
  postId: any;
  postOwnerThumbnail:any;
  postOwnerDukanName:any;
  postImage:any;
  formToggle:boolean=true;
  email:any;
  listReviews:any=[];
  token:any;
  isLoggedIn:any;
  profileimg:any;
  username:any;
  bio:any;
  likeResult:any;
  saveResult:any;
  phone:any= '';
  state:any = '';
  selectedState: any;
  state_id:any;
  role:any;
  shelter_city:any;
  shelter_name:any;
  opening_hour:any;
  closing_hour:any;
  postVideo:any;


  color: any = 1;
  config = {
    ignoreBackdropClick: true,
    class: 'modal-md modal-dialog-centered',
  };
  public settings = {
    length: 4,
    numbersOnly: true,
    timer: 60,
    timerType: 1,
    
  };
  removeCheck: boolean = true;

  constructor(
    private routes: Router,
    private service: ApisService,
    private reuseFun: ReuseFunctionService,
    private modalService: BsModalService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,

  ) {
    $('#profileSwitchingFalse').trigger('click');

    this.reuseFun.checkLoggedIn()
    this.isLoggedIn = this.auth.isLoggedIn();
    this.userId = this.auth.getUserId();
    this.email = this.auth.getEmail();
    this.profilePic = this.auth.getProfileImage();
    this.state = this.auth.getState();
    this.role = this.auth.getRole();
    this.userId = this.auth.getUserId();


    this.imagePath = this.reuseFun.imagePath;
    if (this.profilePic == 'public/propertyThumbnail/userImage.jpeg') {
      this.removeCheck = true;
    } else {
      this.removeCheck = false;
    }
  }

  ngOnInit(): void {
    this.userProfile();
    this.liked();
    this.saved();
    this.listState();
    this.post();
    
  }
  modalEditProfile(template) {
    this.username = this.resultList1.username;
    this.bio = this.resultList1.shelter_bio;
    this.selectedState = parseInt(this.resultList1.state_id);
    this.modalRef = this.modalService.show(template, this.config);
  }



toggle(val){
this.color=val;
}

  userProfile(apiArray = null, spinStatus = null) {
    this.spinner.show();
    this.service.userProfile().subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.reuseFun.errorShowSwal(res['data'].message);
          this.spinner.hide();
        } else {
          this.resultList1 = res['data'];
          this.profileimg = res['data'].profile_picture_url;
          this.username = res['data'].username;
          this.bio = res['data'].shelter_bio;
          this.phone = res['data'].phone;
          this.address = res['data'].address;
          this.state_id = res['data'].state_id;
          this.shelter_city = res['data'].shelter_city;
          this.shelter_name = res['data'].shelter_name;
          this.opening_hour = res['data'].opening_hour;
          this.closing_hour = res['data'].closing_hour;
          this.spinner.hide();
          // this.resultList.thumbnail = null;
    

          
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);
      }
    );
  }
  checkUpdateProfile() {
    let errorStatus = false;
    if (
      this.reuseFun.textTypeLength('#l1', 'User Namr', this.username.length, 3, 25)
    )
      errorStatus = true;
    if (this.reuseFun.onlyTextLength('#l2', 'Email', this.email, 150))
      errorStatus = true;
      if (this.reuseFun.textTypeLength('#l3', 'Phone', this.phone.length, 3, 50))
      errorStatus = true;
    if (this.reuseFun.textTypeLength('#l4', 'Address', this.address.length, 3, 50))
      errorStatus = true;

    if (this.reuseFun.checkEmpty('#10', 'State', this.selectedState))
      errorStatus = true;

    if (errorStatus == false) {
      this.userProfileUpdate();
    }
  }
  checkUpdateProfileShelter() {
    let errorStatus = false;
    if (
      this.reuseFun.textTypeLength('#l1', 'User Namr', this.username.length, 3, 25)
    )
      errorStatus = true;
    if (this.reuseFun.onlyTextLength('#l2', 'Email', this.email, 150))
      errorStatus = true;
      if (this.reuseFun.textTypeLength('#l3', 'Phone', this.phone.length, 3, 50))
      errorStatus = true;
    if (this.reuseFun.textTypeLength('#l4', 'Address', this.address.length, 3, 50))
      errorStatus = true;
      if (this.reuseFun.textTypeLength('#l5', 'Shelter Name', this.shelter_name.length, 3, 50))
      errorStatus = true;
      if (this.reuseFun.textTypeLength('#l6', 'Shelter City', this.shelter_city.length, 3, 50))
      errorStatus = true;
      if (this.reuseFun.textTypeLength('#l7', 'Bio', this.bio.length, 3, 50))
      errorStatus = true;
      if (this.reuseFun.textTypeLength('#l8', 'Opening Hour', this.opening_hour.length, 3, 50))
      errorStatus = true;
      if (this.reuseFun.textTypeLength('#l9', 'Closing Hour', this.closing_hour.length, 3, 50))
      errorStatus = true;
    if (this.reuseFun.checkEmpty('#10', 'State', this.selectedState))
      errorStatus = true;

    if (errorStatus == false) {
      this.userProfileUpdate();
    }
  }
  userProfileUpdate(apiArray = null, spinStatus = null) {
    this.spinner.show();
    this.service.userProfileUpdate(this.username,this.phone,this.address,this.shelter_name,this.shelter_city,this.bio,this.opening_hour,this.closing_hour, this.selectedState).subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.reuseFun.errorShowSwal(res['data'].message);
          this.spinner.hide();
        } else {
          this.resultList1 = res['data'];
          this.profileimg = res['data'].profile_picture_url;
          this.username = res['data'].username;
          this.bio = res['data'].shelter_bio;
         this.modalRef.hide();
          this.spinner.hide();
          this.userProfile();
          // this.resultList.thumbnail = null;
    

          
        }
      },
      (err: any) => {}
    );
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
  post(apiArray = null, spinStatus = null) {
    this.spinner.show();
    this.service.post(this.userId).subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.reuseFun.errorShowSwal(res['data'].message);
          this.spinner.hide();
        } else {
          this.postVideo = res['data'];
          this.spinner.hide();
          // this.resultList.thumbnail = null;
    

          
        }
      },
      (err: any) => {}
    );
  }
  liked(apiArray = null, spinStatus = null) {
    this.spinner.show();
    this.service.liked().subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.reuseFun.errorShowSwal(res['data'].message);
          this.spinner.hide();
        } else {
          this.likeResult = res['data'];
          this.spinner.hide();
          // this.resultList.thumbnail = null;
    

          
        }
      },
      (err: any) => {}
    );
  }
  saved(apiArray = null, spinStatus = null) {
    this.spinner.show();
    this.service.saved().subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.reuseFun.errorShowSwal(res['data'].message);
          this.spinner.hide();
        } else {
          this.saveResult = res['data'];
          this.spinner.hide();
          // this.resultList.thumbnail = null;
    

          
        }
      },
      (err: any) => {}
    );
  }

 
  // addLike(id) {
  //   // this.service.addLike(id).subscribe(
  //     // (res: any) => {
  //       if (res['data'].code == 400) {
  //         // this.spinner.hide();
  //         // this.reuseFun.errorShowSwal(res['data'].message);
  //       } else {
  //         // this.spinner.hide();
          
  //         this.userProfile();
  //       }
  //     },
  //     (err: any) => {}
  //   );
  // }

 

}
