import { Component, OnInit } from '@angular/core';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../../service/academic/class.service';
import {MarkService} from '../../../service/mark/mark.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.page.html',
  styleUrls: ['./mark.page.scss'],
})
export class MarkPage implements OnInit {
    objectKeys = Object.keys;
    classID: any;
    students: any;
    classes: any;
    permission: any;
    language: any;
    myProfile = false;
    loginuser: any;
    siteUrl: any;
    selectedClass: string = '';

    public studentprofile: any;
    public optionalsubject: any;
    subjects: any;
    grades: any;
    totalSumpoint: any = 0;
    usertype: any;
    exams: any;
    marks: any;
    marksettings: any;
    highestmarks: any;
    markpercentages: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public markService: MarkService,
        private network: Network,
        private toastCtrl: ToastController,
        public  loadingCtrl: LoadingController,
        public  alertCtrl: AlertController,
        public menuCtrl: MenuController,
        private storage: Storage,
        public langandpermissionService: LangandparmisionService,
        public classService: ClassService
    ) {
        this.Profile();
        this.getMarkList();
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

    ngOnInit() {}

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }


    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }

    doRefresh(event, value, classID) {
        this.markService.getMarkList(classID, value, null, null)
            .then((data: any) => {
                this.students = data.students;
            });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    getmarkView(studentID, classID) {
        this.router.navigate([ '/markview', studentID, classID]);
    }

    selectedClasses() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.classID = this.selectedClass;
            if (this.classID) {

                this.markService.getMarkList( this.classID , false,  null, null)
                    .then((data: any) => {
                        this.students = data.students;
                    });

                this.langandpermissionService.getLangandPermissionCall(false, 'mark')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
        }
    }


    getMarkList() {

        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.langandpermissionService.getLangandPermissionCall(false, 'mark')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.markService.getMarkList(null, false, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.mark_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.studentprofile = data.profile;
                                    this.subjects =  data.subjects;
                                    this.exams =  data.exams;
                                    this.marks =  data.marks;
                                    this.grades =  data.grades;
                                    this.marksettings =  data.marksettings;
                                    this.markpercentages =  data.markpercentages;
                                    this.highestmarks =  data.highestmarks;
                                    this.usertype =  data.usertype;

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.markService.getMarkList(null, false, null,  null)
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
        } else {
            this.langandpermissionService.getLangandPermissionCall(value, 'mark')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.markService.getMarkList(null, value, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.mark_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.studentprofile = data.profile;
                                    this.subjects =  data.subjects;
                                    this.exams =  data.exams;
                                    this.marks =  data.marks;
                                    this.grades =  data.grades;
                                    this.marksettings =  data.marksettings;
                                    this.markpercentages =  data.markpercentages;
                                    this.highestmarks =  data.highestmarks;
                                    this.usertype =  data.usertype;

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.markService.getMarkList(null, false, null,  null)
                            .then((data: any) => {
                                this.classes = data.classes;
                                this.students = data.students;
                            });
                    }

                });

        }
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


}
