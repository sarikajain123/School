import { Component, OnInit } from '@angular/core';
import {AttendanceService} from '../../../service/attendance/attendance.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {ClassService} from '../../../service/academic/class.service';
import {DatePipe} from '@angular/common';
import {LoadingController, ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-uattendanceadd',
  templateUrl: './uattendanceadd.page.html',
  styleUrls: ['./uattendanceadd.page.scss'],
})
export class UattendanceaddPage implements OnInit {

    users: any;
    dateinfo: any;
    language: any;
    permission: any;
    myDate: string;
    attmonthyear: any;
    attday: any;
    aday: any;
    Previeuattendances: any;
    attendancearray: any = {};
    submitbutton: any = false;

    calenderdisabledates: any;
    calenderfromdate: any;
    calenderdisableweekdays: any = [];
    calendertodate: any;
    siteUrl: any;
    datePickerObj: any = {};

    constructor(
        public attendanceService: AttendanceService,
        public langandpermissionService: LangandparmisionService,
        public classService: ClassService,
        public datepipe: DatePipe,
        public  loadingCtrl: LoadingController,
        public toastController: ToastController

    ) {
        this.siteUrl = fileUrl;
    }

    ngOnInit() {
        this.getUattendance();
    }
    takeAttendance(id, value) {
        this.attendancearray['attendance' + id] = value;
        this.submitbutton = true;
    }
    async presentLoading() {

        const loading = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: 'crescent',
        });
        await loading.present();

    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Your attendance have been saved.',
            duration: 3000
        });
        await toast.present();
    }

    async dismiss() {
        return await this.loadingCtrl.dismiss({             'dismissed': true         });
    }


    addAttendance() {
        const allData = {date:  this.myDate};
        this.attendanceService.PostUattendance(allData)
            .then((data: any) => {
                this.users = data.users;
                this.Previeuattendances = data.uattendances;
                this.aday = 'a' + data.day;
                this.dateinfo = data.dateinfo;
                this.attmonthyear = data.monthyear;
                this.attday = data.day;
            });

    }


    submitAttendance() {
        this.presentLoading();

        const allData = {
            monthyear:  this.attmonthyear,
            day: this.attday,
            attendance: JSON.stringify(this.attendancearray)
        };

        this.attendanceService.SaveUattendance(allData)
            .then((data: any) => {
                this.dismiss();
                this.presentToast();
                this.submitbutton = false;
            });

    }

    getUattendance() {
        this.attendanceService.PostUattendance(null).then((data: any) => {
            this.calenderdisabledates = data.calenderdisabledates;
            this.calenderfromdate = data.calenderfromdate;
            this.calendertodate = data.calendertodate;
            const disableweekdays = data.calenderdisableweekdays;
            this.myDate = data.date;

            const disableweekArray = [];
            Object.keys(disableweekdays).forEach(function (key) {
                disableweekArray.push(Number(disableweekdays[key].replace()));
            });

            this.datePickerObj = {
                fromDate: this.calenderfromdate,
                toDate: this.calendertodate,
                showTodayButton: false,
                closeOnSelect: true,
                disableWeekDays: disableweekArray,
                mondayFirst: true,
                setLabel: 'S',
                todayLabel: 'Today',
                closeLabel: 'Close',
                disabledDates: this.calenderdisabledates,
                titleLabel: 'Select a Date',
                monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                dateFormat: 'DD-MM-YYYY',
                clearButton : false ,
                momentLocale: 'pt-BR',
                yearInAscending: true,
                btnCloseSetInReverse: true,
                btnProperties: {
                    expand: 'block',
                    fill: '',
                    size: '',
                    disabled: '',
                    strong: '',
                    color: '',
                },
                arrowNextPrev: {
                    nextArrowSrc: 'assets/img/right-arrow.svg',
                    prevArrowSrc: 'assets/img/left.svg'
                }
            };
        });
        this.langandpermissionService.getLangandPermissionCall(false, 'uattendance')
            .then((data: any) => {
                this.permission = data.permission;
                this.language = data.language;
            });
    }

}
