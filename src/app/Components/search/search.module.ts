import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { SearchRoutes } from './search.routing';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import { NgSelectModule } from '@ng-select/ng-select';


import { NgForm } from '@angular/forms';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SearchRoutes),
    FormsModule,
    ModalModule.forRoot(),
    NgbModule,
    MatTooltipModule,
    NgxSpinnerModule,
    RatingModule,
    NgSelectModule,
  ],
  providers: [ 
    RatingConfig
  ],
})

export class SearchModule { }
