import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../service/student.service';
import { ActivatedRoute } from '@angular/router';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {fileUrl} from '../../../config/config';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-studentview',
  templateUrl: './studentview.page.html',
  styleUrls: ['./studentview.page.scss'],
})
export class StudentviewPage implements OnInit {
    objectKeys = Object.keys;
    studentID: any;
    classID: any;
    public studentprofile: any;
    public studentGrup: any;
    public optionalsubject: any;
    public invoices: any;
    public payments: any;
    public weaverandpayment: any;
    public parents: any;
    public siteUrl: any;
    attendances: any;
    attendanceType: any;
    attendancesMonth: any;
    attendancesubjects: any;
    subjects: any;
    exams: any;
    grades: any;
    marks: any;
    marksettings: any;
    markpercentages: any;
    highestmarks: any;
    totalcount: any;
    loginuser: any;
    permission: any;
    language: any;
    totalSumpoint: any = 0;
    public routines: any;
    private days: any;
    class: any;
    section: any;
    examkey: any;

    slideOpts = {
        autoplay: true
    };

    constructor(
      public studentService: StudentService,
      public langandpermissionService: LangandparmisionService,
      private route: ActivatedRoute,
      private network: Network,
      private storage: Storage,
      private toastCtrl: ToastController,
      public  loadingCtrl: LoadingController,
      public  alertCtrl: AlertController,
      public menuCtrl: MenuController,
  ) {
        this.studentID = this.route.snapshot.paramMap.get('studentID');
        this.classID = this.route.snapshot.paramMap.get('classID');
        this.doRefreshProfile(false, false, this.studentID, this.classID );
        this.siteUrl = fileUrl;
    }

  ngOnInit() {
  }


   public isRefresh = true;
    public studentitems = false;
    public parentitems = true;
    public routineitems = true;
    public attendanceitems = true;
    public invoicesitems = true;
    public paymentsitems = true;
    public markitems = true;

    isCollapsed(value) {

        this.parentitems = true;
        this.routineitems = true;
        this.attendanceitems = true;
        this.invoicesitems = true;
        this.paymentsitems = true;
        this.markitems = true;
        this.studentitems = value;
    }

    isCollapsedParent(value) {

        this.studentitems = true;
        this.routineitems = true;
        this.attendanceitems = true;
        this.invoicesitems = true;
        this.markitems = true;
        this.paymentsitems = true;
        this.parentitems = value;
    }

    isCollapsedroutine(value) {

        this.studentitems = true;
        this.parentitems = true;
        this.attendanceitems = true;
        this.invoicesitems = true;
        this.paymentsitems = true;
        this.markitems = true;
        this.routineitems = value;
    }

    isCollapsedattendance(value) {

        this.studentitems = true;
        this.parentitems = true;
        this.attendanceitems = value;
        this.routineitems = true;
        this.invoicesitems = true;
        this.paymentsitems = true;
        this.markitems = true;
    }

    isCollapsedinvoices(value) {

        this.studentitems = true;
        this.parentitems = true;
        this.invoicesitems = value;
        this.attendanceitems = true;
        this.routineitems = true;
        this.paymentsitems = true;
        this.markitems = true;
    }

    isCollapsedpayments(value) {

        this.studentitems = true;
        this.parentitems = true;
        this.invoicesitems = true;
        this.attendanceitems = true;
        this.routineitems = true;
        this.paymentsitems = value;
        this.markitems = true;
    }

    isCollapsedmark(value) {

        this.studentitems = true;
        this.parentitems = true;
        this.invoicesitems = true;
        this.attendanceitems = true;
        this.routineitems = true;
        this.paymentsitems = true;
        this.markitems = value;
    }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }


    doRefreshProfile(event, value, studentID, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
            if (studentID && classID) {
                const daysData = [];
                this.studentService.getStudentView(studentID, classID, value)
                    .then((data: any) => {
                        this.studentprofile = data.profile;
                        this.studentGrup = data.group;
                        this.optionalsubject = data.optionalsubject;
                        this.parents = data.parents;
                        this.invoices = data.invoices;
                        this.payments = data.payments;
                        this.weaverandpayment = data.allweaverandpaymentbyinvoice;
                        this.attendanceType = data.attendanceType;
                        this.attendances = data.attendance;
                        this.totalcount = data.totalcount;
                        this.attendancesMonth = data.attendancesmonths;
                        this.subjects =  data.subjects;
                        this.attendancesubjects =  data.attendancesubjects;
                        this.exams =  data.exams;
                        this.marks =  data.marks;
                        this.grades =  data.grades;
                        this.marksettings =  data.marksettings;
                        this.markpercentages =  data.markpercentages;
                        this.highestmarks =  data.highestmarks;
                        if (data.days) {
                            Object.keys(data.days).forEach(function (key) {
                                daysData.push({'day': data.days[key]});
                            });
                        }
                        this.days = daysData;
                        this.routines = data.routine;
                        this.section = data.section;
                        this.class = data.class;
                    });
            }

            this.langandpermissionService.getLangandPermissionCall(value, 'student')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                });
        if (event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
      }
  }
 }
