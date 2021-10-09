import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { NotificationRoutes } from './notifications.routing';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(NotificationRoutes),
  ]
})
export class NotificationsModule { }
