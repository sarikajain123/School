import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Network} from '@ionic-native/network/ngx';


import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonicStorageModule} from '@ionic/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {StudentService} from './service/student.service';
import {TeacherService} from './service/teacher.service';
import {ParentsService} from './service/parents.service';
import {ClassService} from './service/academic/class.service';
import {SectionService} from './service/academic/section.service';
import {SubjectService} from './service/academic/subject.service';
import {SyllabusService} from './service/academic/syllabus.service';
import {RoutionService} from './service/academic/roution.service';
import {UserService} from './service/user.service';
import {ExamService} from './service/exam/exam.service';
import {MarkService} from './service/mark/mark.service';
import {AssignmentService} from './service/academic/assignment.service';
import {OnlineexamserviceService} from './service/onlineexam/onlineexamservice.service';
import {PayrollService} from './service/payroll/payroll.service';
import {AssetmanagementService} from './service/assetmanagement/assetmanagement.service';
import {InventoryService} from './service/inventory/inventory.service';
import {LeaveapplicationService} from './service/leaveapplication/leaveapplication.service';
import {ChildService} from './service/child/child.service';
import {TransportService} from './service/transport/transport.service';
import {LibraryService} from './service/library/library.service';
import {HostelService} from './service/hostel/hostel.service';
import {AnnouncementService} from './service/announcement/announcement.service';
import {AccountService} from './service/account/account.service';
import {VisitorinfoService} from './service/visitorinfo/visitorinfo.service';
import {LangandparmisionService} from './service/langandparmision.service';
import {FrontendService} from './service/frontend/frontend.service';
import {AdministratorService} from './service/administrator/administrator.service';
import {AuthenticationService} from './service/authentication/authentication.service';
import {AuthGuardService} from './service/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';
import { FileTransfer , FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {MaillsmsService} from './service/maillsms.service';






@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        FontAwesomeModule,
        Ionic4DatepickerModule,
    ],
  providers: [
     Network,
      DatePipe,
    StatusBar,
    SplashScreen,
    StudentService,
    UserService,
    TeacherService,
    ParentsService,
    ClassService,
    SectionService,
    SubjectService,
    SyllabusService,
    RoutionService,
    AssignmentService,
    ExamService,
    MarkService,
    OnlineexamserviceService,
    PayrollService,
      AssetmanagementService,
      InventoryService,
      LeaveapplicationService,
      ChildService,
      TransportService,
      LibraryService,
      HostelService,
      AnnouncementService,
      AccountService,
      VisitorinfoService,
      LangandparmisionService,
      FrontendService,
      AdministratorService,
      AuthenticationService,
      AuthGuardService,
      File,
      FileTransfer,
      FileOpener,
      FileTransferObject,
      AndroidPermissions,
      MaillsmsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
