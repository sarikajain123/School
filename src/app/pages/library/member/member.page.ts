import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../../service/academic/class.service';
import {LibraryService} from '../../../service/library/library.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
    classID: any;
    students: any;
    classes: any;
    permission: any;
    myProfile = false;
    siteUrl: any;
    loginuser: any;
    language: any;
    selectedClass: string = '';
    public studentprofile: any;
    public lmember: any;
    public usertypes: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public libraryService: LibraryService,
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
        this.siteUrl = fileUrl;
        this.getLmebear();
    }

    isRefresh = true;
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
    getLmemberView(studentID, classID) {
        this.router.navigate([ '/memberview', studentID, classID]);
    }

    doRefresh(event, value, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.libraryService.getLmember(value, classID, null , null)
                .then((data: any) => {
                    this.students = data.students;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'lmember')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                });

            setTimeout(() => {
                event.target.complete();
            }, 2000);
        }
    }

    selectedClasses() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.classID = this.selectedClass;
            if (this.classID) {

                this.libraryService.getLmember(false, this.classID , null, null)
                    .then((data: any) => {
                        this.students = data.students;
                    });

                this.langandpermissionService.getLangandPermissionCall(false, 'lmember')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
            }
        }

    }


    getLmebear() {

        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.langandpermissionService.getLangandPermissionCall(false, 'lmember')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.libraryService.getLmember(false, null, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.lmember_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.studentprofile = data.student;
                                    this.lmember = data.lmember;
                                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.libraryService.getLmember(false, null , null, null)
                            .then((data: any) => {
                                this.classes = data.classes;
                                this.students = data.students;
                            });
                    }
                });
        }

    }

    doRefreshProfile(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.langandpermissionService.getLangandPermissionCall(value, 'lmember')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.libraryService.getLmember(value, null, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.lmember_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.studentprofile = data.student;
                                    this.lmember = data.lmember;
                                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.libraryService.getLmember(value, null , null, null)
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



}
