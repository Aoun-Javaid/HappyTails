import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule} from '@angular/router';
import { ProfileRoutes } from './profile.routing';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';;
import { AngularOtpLibModule } from 'angular-otp-box';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    FormsModule,
    ModalModule.forRoot(),
    NgbModule,
    NgSelectModule,
    AngularOtpLibModule
  ]
})
export class ProfileModule { }