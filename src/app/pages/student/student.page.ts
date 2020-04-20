import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../service/student.service';
import {ClassService} from '../../service/academic/class.service';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {fileUrl} from '../../../config/config';


@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
    objectKeys = Object.keys;
    classID: any;
    students: any;
    classes: any;
    permission: any;
    language: any;
    myProfile = false;
    loginuser: any;
    selectedClass: string = '';
    private siteUrl: any;

    public studentprofile: any;
    public studentGrup: any;
    public optionalsubject: any;
    public invoices: any;
    public payments: any;
    public weaverandpayment: any;
    public parents: any;
    attendances: any;
    attendanceType: any;
    attendancesMonth: any;
    attendancesubjects: any;
    subjects: any;
    marksettings: any;
    markpercentages: any;
    highestmarks: any;
    exams: any;
    marks: any;
    grades: any;
    totalSumpoint: any = 0;
    totalcount: any;
    public routines: any;
    public days: any;
    public class: any;
    public section: any;
    examkey: any;


    constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    public studentService: StudentService,
    public langandpermissionService: LangandparmisionService,
    public classService: ClassService,
    private network: Network,
    private toastCtrl: ToastController,
    public  loadingCtrl: LoadingController,
    public  alertCtrl: AlertController,
    public menuCtrl: MenuController,
  ) {
        this.getStudent();
        this.siteUrl = fileUrl;
        setTimeout(() => {
            this.isLoaded = true;
        }, 3000);
    }

    isLoaded = false;
    isRefresh = true;


    arrayOne(n: number): any[] {
        return Array(n);
    }


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



  ngOnInit() {}

    async presentLoading() {

        const loading = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: 'crescent',
        });
        await loading.present();

    }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    async dismiss() {
       return await this.loadingCtrl.dismiss({'dismissed': true});
    }


    doRefresh(event, value, classID) {
        this.studentService.getStudent(classID, value, null, null)
            .then((data: any) => {
                this.students = data.students;
            });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


    getStudentView(studentID, classID)

    {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.router.navigate(['/studentview', studentID, classID]);
        }
    }

    selectedClasses()
    {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.classID = this.selectedClass;
            if ( this.classID ) {
                this.studentService.getStudent( this.classID , false,  null, null)
                    .then((data:any) => {
                        this.students = data.students;
                    });
                this.langandpermissionService.getLangandPermissionCall(false, 'student')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
            }
    }


    getStudent() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.storage.get('Profile').then((response) => {
                this.loginuser = response;
            });
            this.langandpermissionService.getLangandPermissionCall(false, 'student')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    const daysData = [];
                    const examkeybox = [];
                    if (this.loginuser.usertypeID == 3 ) {
                        this.studentService.getStudent(null, false, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                    if (this.permission.student_view == 'no') {
                                        this.myProfile = true;
                                    }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
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
                                    this.attendancesubjects =  data.attendancesubjects;
                                    this.subjects =  data.subjects;
                                    this.exams =  data.exams;
                                    this.marks =  data.marks;
                                    this.grades =  data.grades;
                                    this.marksettings =  data.marksettings;
                                    this.markpercentages =  data.markpercentages;
                                    this.highestmarks =  data.highestmarks;

                                    Object.keys(data.days).forEach(function (key) {
                                        daysData.push({'day': data.days[key]});
                                    });
                                    this.days = daysData;
                                    this.routines = data.routine;
                                    this.section = data.section;
                                    this.class = data.class;

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.studentService.getStudent(null, false, null,  null)
                            .then((data: any) => {
                                this.classes = data.classes;
                                this.students = data.students;
                            });
                    }

                });

    }


    doRefreshProfile(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.storage.get('Profile').then((response) => {
                this.loginuser = response;
            });
            this.langandpermissionService.getLangandPermissionCall(value, 'student')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    const daysData = [];
                    const examkeybox = [];
                    if (this.loginuser.usertypeID == 3 ) {
                        this.studentService.getStudent(null, value, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.student_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
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
                                    this.attendancesubjects =  data.attendancesubjects;
                                    this.subjects =  data.subjects;
                                    this.exams =  data.exams;
                                    this.marks =  data.marks;
                                    this.grades =  data.grades;
                                    this.marksettings =  data.marksettings;
                                    this.markpercentages =  data.markpercentages;
                                    this.highestmarks =  data.highestmarks;

                                    Object.keys(data.days).forEach(function (key) {
                                        daysData.push({'day': data.days[key]});
                                    });
                                    this.days = daysData;
                                    this.routines = data.routine;
                                    this.section = data.section;
                                    this.class = data.class;

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.studentService.getStudent(null, false, null,  null)
                            .then((data: any) => {
                                this.classes = data.classes;
                                this.students = data.students;
                            });
                    }

                });


        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }
}
