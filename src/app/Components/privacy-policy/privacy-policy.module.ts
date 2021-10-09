import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { RouterModule} from '@angular/router';
import { PrivacyPolicyRoutes } from './privacy-policy.routing';


@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PrivacyPolicyRoutes),



  ]
})
export class PrivacyPolicyModule { }