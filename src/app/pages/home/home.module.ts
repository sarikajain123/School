import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { NgCalendarModule  } from 'ionic2-calendar';


import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ionic4DatepickerModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
      NgCalendarModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
