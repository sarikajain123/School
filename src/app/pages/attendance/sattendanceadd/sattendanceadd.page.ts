import { Component, OnInit } from '@angular/core';
import {AttendanceService} from '../../../service/attendance/attendance.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {ClassService} from '../../../service/academic/class.service';
import { DatePipe } from '@angular/common';
import {SectionService} from '../../../service/academic/section.service';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {SubjectService} from '../../../service/academic/subject.service';
import {fileUrl} from '../../../../config/config';



@Component({
  selector: 'app-sattendanceadd',
  templateUrl: './sattendanceadd.page.html',
  styleUrls: ['./sattendanceadd.page.scss'],
})
export class SattendanceaddPage implements OnInit {


    students: any;
    classes: any;
    sections: any;
    sattendanceinfo: any;
    subjects: any;
    attendanceType: any;
    language: any;
    permission: any;
    classesID: string = '';
    sectionID: string = '';
    subjectID: string = '';
    myDate: string;
    attsubjectID: any;
    attsectionID: any;
    attmonthyear: any;
    attclassesID: any;
    calenderdisabledates: any;
    calenderfromdate: any;
    calenderdisableweekdays: any = [];
    calendertodate: any;
    attday: any;
    siteUrl: any;
    aday: any;
    Previesattendances: any;
    attendancearray: any = {};
    submitbutton: any = false;
    datePickerObj: any = {};



    constructor(
        public attendanceService: AttendanceService,
        public langandpermissionService: LangandparmisionService,
        public sectionService: SectionService,
        public classService: ClassService,
        public datepipe: DatePipe,
        public modalCtrl: ModalController,
        public  loadingCtrl: LoadingController,
        public toastController: ToastController,
        public subjectService: SubjectService,

    ) {
        this.siteUrl = fileUrl;
    }

    ngOnInit() {
        this.getAddattendance();
    }

    takeAttendance(id, value) {
        this.submitbutton = true;
        this.attendancearray['attendance' + id] = value;
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
        return await  this.loadingCtrl.dismiss({
            'dismissed': true
        });
    }

    selectedClasses() {
        const classID = this.classesID;
        this.sectionService.getSection(false, classID)
            .then((data: any) => {
                this.sections = data.sections;
            });
        if (this.attendanceType === 'subject') {
            this.subjectService.getSubjectAttendance(false, classID)
                .then((data: any) => {
                    this.subjects = data.subjects;
                });
        }

    }

    addAttendance() {
        const allData = {
            classesID: this.classesID,
            sectionID: this.sectionID,
            subjectID: this.subjectID,
            date:  this.myDate
        };
        if (this.attendanceType === 'subject') {

            if (allData.classesID && allData.sectionID && allData.date && allData.subjectID) {
                this.attendanceService.PostSattendance(allData)
                    .then((data: any) => {
                        this.students = data.students;
                        this.Previesattendances = data.attendances;
                        this.aday = 'a' + data.day;
                        this.sattendanceinfo = data.sattendanceinfo;
                        this.attsubjectID = data.subjectID;
                        this.attsectionID = data.sectionID;
                        this.attmonthyear = data.monthyear;
                        this.attclassesID = data.classesID;
                        this.attday = data.day;
                    });
            }
        } else {

            if (allData.classesID && allData.sectionID && allData.date) {
                this.attendanceService.PostSattendance(allData)
                    .then((data: any) => {
                        this.students = data.students;
                        this.Previesattendances = data.attendances;
                        this.aday = 'a' + data.day;
                        this.sattendanceinfo = data.sattendanceinfo;
                        this.attsubjectID = data.subjectID;
                        this.attsectionID = data.sectionID;
                        this.attmonthyear = data.monthyear;
                        this.attclassesID = data.classesID;
                        this.attday = data.day;
                    });
            }
        }

    }


    submitAttendance() {
        this.presentLoading();
        const allData = {
            classesID: this.attclassesID,
            sectionID: this.attsectionID,
            subjectID:  this.attsubjectID,
            monthyear: this.attmonthyear,
            day: this.attday,
            attendance: JSON.stringify(this.attendancearray)
        };

        this.attendanceService.SaveSattendance(allData)
            .then((data: any) => {
                this.dismiss();
                this.presentToast();
                this.submitbutton = false;
            });

    }

    getAddattendance() {
        this.attendanceService.PostSattendance(null)
            .then((data: any) => {
                this.classes = data.classes;
                this.attendanceType = data.attendanceType;
                this.calenderdisabledates = data.calenderdisabledates;
                this.calenderfromdate = data.calenderfromdate;
                this.calendertodate = data.calendertodate;
                const disableweekdays = data.calenderdisableweekdays;

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
        this.langandpermissionService.getLangandPermissionCall(false, 'sattendance')
            .then((data: any) => {
                this.permission = data.permission;
                this.language = data.language;
            });
    }
}
