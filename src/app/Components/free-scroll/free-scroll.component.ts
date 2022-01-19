import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/Auth/auth.service';
import {ApisService} from 'src/app/Services/apis.service';
import {ReuseFunctionService} from 'src/app/Services/reuse-function.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';

declare const $: any;
import {FormControl} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';
import {SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-free-scroll',
  templateUrl: './free-scroll.component.html',
  styleUrls: ['./free-scroll.component.css']
})
export class FreeScrollComponent implements OnInit {


  imagePath: any;
  resultList: any = [];
  productTitle: any;
  reason: any;
  resultListFeed: any = [];
  resultListComment: any = [];
  resultListLike: any = [];
  commentProductId: any;
  modalRef: BsModalRef;
  comment: any;
  userId: any;
  editComments = true;
  commentModalToggle = true;
  comments = [];
  isLoggedIn: any;
  resultListFollower: any = [];
  previousPageCount: any;
  postId: any;
  postOwnerThumbnail: any;
  postOwnerDukanName: any;
  postImage: any;
  newFeeds: any;
  value: any = 1;

  config = {
    ignoreBackdropClick: true,
    class: 'modal-md modal-dialog-centered',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private reuseFun: ReuseFunctionService,
    private modalService: BsModalService,
    private routes: Router,
    private service: ApisService,
    private auth: AuthService
  ) {
    this.userId = this.auth.getUserId();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.imagePath = this.reuseFun.imagePath;

    $(window).scroll(function () {
      if (
        $(window).scrollTop() + $(window).height() >
        $(document).height() - 100
      ) {
        $('#otherProd').trigger('click');
      }
    });
  }

  Languages = [
    {id: 1, Name: 'Urdu'},
    {id: 2, Name: 'Italian'},
    {id: 3, Name: 'Dutch'},

  ];

  addLike(id, value) {
    this.service.like(id, value).subscribe(
      (res: any) => {
        if (res.data.code == 400) {
          this.spinner.hide();
          // this.reuseFun.errorShowSwal(res['data'].message);
        } else {
          this.homefeed();

          this.spinner.hide();
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);


      }
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    if (this.isLoggedIn) {
      this.homefeed();
    } else {
      this.guestHomefeed();
    }
  }

  copyUrl(productId) {
    const val = `${location.origin}/product-page?productId=${productId}`;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  close() {
    this.reason = null;
    this.comments = [];
  }

  modalComments(template, productId) {
    this.commentModalToggle = true;

    this.listComment(productId);
    this.commentProductId = productId;

    this.modalRef = this.modalService.show(template, this.config);
  }

  removeErrors(fieldErrorName) {
    $(fieldErrorName).text('');
  }

  homefeed() {
    this.spinner.show();
    this.service.homefeed().subscribe(
      (res: any) => {
        if (res.data.code == 400) {
          this.spinner.hide();
          // this.reuseFun.errorShowSwal(res['data'].message);
        } else {
          this.resultList = res.data;
          this.spinner.hide();
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);


      }
    );
  }

  guestHomefeed() {
    this.spinner.show();
    this.service.guestHomefeed().subscribe(
      (res: any) => {
        if (res.data.code == 400) {
          this.spinner.hide();
          // this.reuseFun.errorShowSwal(res['data'].message);
        } else {
          this.resultList = res.data;
          this.spinner.hide();
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);


      }
    );
  }

  checkComment() {
    let errorStatus = false;
    if (
      this.reuseFun.textTypeLength(
        '#l11',
        'comment',
        this.comment.length,
        1,
        250
      )
    ) {
      errorStatus = true;
    }

    if (errorStatus == false) {
      this.addcomment(this.commentProductId, this.comment);
    }
  }

  addcomment(productId, comment) {
    this.service.addcomment(productId, comment).subscribe(
      (res: any) => {
        if (res.data.code == 400) {
          this.spinner.hide();
          this.reuseFun.errorShowSwal(res.data.message);
        } else {
          // this.resultListComment = res['data']['userResult'];
          // this.spinner.hide();

          this.comments = [];
          this.listComment(productId);
          this.comment = '';
        }
      },
      (err: any) => {
      }
    );
  }

  listComment(productId) {
    console.log(productId);
    this.spinner.show();
    this.service.listComment(productId).subscribe(
      (res: any) => {
        if (res.data.code == 400) {
        } else {
          this.resultListComment = res.data;
          console.log(this.resultListComment);
          this.spinner.hide();
        }
      },
      (err: any) => {
      }
    );
  }
  isfollow= false ;
  follow(){
    this.isfollow=!this.isfollow;
  }

}
