import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Auth/auth.service';
import { ApisService } from 'src/app/Services/apis.service';
import { ReuseFunctionService } from 'src/app/Services/reuse-function.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { NgSelectModule, NgOption } from '@ng-select/ng-select';
declare const $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isLoggedIn: any;
  resultList: any = [];

  sex = [
    { name: "Male" },
    { name: "Female" },
  ];

  size = [
    { name: "Small"},
    { name: "Medium" },
    { name: "Large" },
  ];

  age = [
    { name: "puppy"},
    { name: "young" },
    { name: "adult" },
    { name: "senior" }
  ];

  energyLevel = [
    { name: "mellow" },
    { name: "average" },
    { name: "active" }
  ];




  selectedState: any; selectedColor: any; selectedSex: any; selectedAge: any; selectedEnergyLevel: any; selectedSize: any;
  state: any = []; color: any = [];;
  constructor(
    private spinner: NgxSpinnerService,
    private reuseFun: ReuseFunctionService,

    private service: ApisService,
    private auth: AuthService
  ) {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  ngOnInit(): void {
    this.listColor();
    this.listState();
  }

  search() {
    this.spinner.show();
    this.service.search(this.selectedState, this.selectedColor, this.selectedSex, this.selectedAge, this.selectedEnergyLevel, this.selectedSize).subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.spinner.hide();
          // this.reuseFun.errorShowSwal(res['data'].message);
        } else {
          this.resultList = res['data'];
          this.spinner.hide();
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);
      }
    );
  }
  listState() {
    this.spinner.show();
    this.service.listState().subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.spinner.hide();
          // this.reuseFun.errorShowSwal(res['data'].message);
        } else {
          this.state = res['data'];
          this.spinner.hide();
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);
      }
    );
  }

  removeErrors(fieldErrorName) {
    $(fieldErrorName).text('');
  }

  listColor() {
    this.spinner.show();
    this.service.listColor().subscribe(
      (res: any) => {
        if (res['data'].code == 400) {
          this.spinner.hide();
          // this.reuseFun.errorShowSwal(res['data'].message);
        } else {
          this.color = res['data'];
          this.spinner.hide();
        }
      },
      (err: any) => {
        this.reuseFun.errorShowSwal(err.message);


      }
    );
  }



}
