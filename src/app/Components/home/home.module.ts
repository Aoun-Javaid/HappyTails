import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    FormsModule,
    ModalModule.forRoot(),
    NgbModule,
    MatTooltipModule,
    NgxSpinnerModule,
    RatingModule,
    MatIconModule,

  ],
  providers: [ 
    RatingConfig
  ],
})
export class HomeModule { }
