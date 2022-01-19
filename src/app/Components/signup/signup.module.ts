import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SignupRoutes } from './signup.routing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularOtpLibModule } from 'angular-otp-box';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SignupRoutes),
    FormsModule,
    NgSelectModule,
    AngularOtpLibModule,
    MatIconModule,
  ]
})
export class SignupModule { }
