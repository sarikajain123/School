import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../../service/academic/class.service';
import {TransportService} from '../../../service/transport/transport.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-tmember',
  templateUrl: './tmember.page.html',
  styleUrls: ['./tmember.page.scss'],
})
export class TmemberPage implements OnInit {
    classID: any;
    students: any;
    classes: any;
    permission: any;
    language: any;
    myProfile = false;
    siteUrl: any;
    loginuser: any;
    selectedClass: string = '';

    public studentprofile: any;
    public tmember: any;
    public transport: any;
    public usertypes: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public transportService: TransportService,
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
        this.getTmebear();
        this.siteUrl = fileUrl;

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

    getTmemberView(studentID, classID) {
        this.router.navigate([ '/tmemberview', studentID, classID]);
    }

    doRefresh(event, value, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.transportService.getTmember(value, classID, null , null)
                .then((data: any) => {
                    this.students = data.students;
                });
            this.langandpermissionService.getLangandPermissionCall(false, 'tmember')
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

                this.transportService.getTmember(false, this.classID , null, null)
                    .then((data: any) => {
                        this.students = data.students;
                    });
                this.langandpermissionService.getLangandPermissionCall(false, 'tmember')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
            }
        }

    }


    getTmebear() {

        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {

            this.langandpermissionService.getLangandPermissionCall(false, 'tmember')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;

                    if (this.loginuser.usertypeID == 3 ) {
                        this.transportService.getTmember(false, null, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.tmember_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.studentprofile = data.student;
                                    this.tmember = data.tmember;
                                    this.transport = data.transport;
                                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.transportService.getTmember(false, null , null, null)
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
            this.langandpermissionService.getLangandPermissionCall(value, 'tmember')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.transportService.getTmember(value, null, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.tmember_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.studentprofile = data.student;
                                    this.tmember = data.tmember;
                                    this.transport = data.transport;
                                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.transportService.getTmember(value, null , null, null)
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
