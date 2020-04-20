import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../../service/academic/class.service';
import {HostelService} from '../../../service/hostel/hostel.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-hmember',
  templateUrl: './hmember.page.html',
  styleUrls: ['./hmember.page.scss'],
})
export class HmemberPage implements OnInit {
    classID: any;
    students: any;
    siteUrl: any;
    classes: any;
    permission: any;
    language: any;
    myProfile = false;
    loginuser: any;
    public studentprofile: any;
    public hmember: any;
    public hostel: any;
    public category: any;
    public usertypes: any;
    selectedClass: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public hostelService: HostelService,
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
        this.getHmebear();
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
    getHmemberView(studentID, classID) {
        this.router.navigate([ '/hmemberview', studentID, classID]);
    }

    doRefresh(event, value, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.hostelService.getHmember(value, classID, null , null)
                .then((data: any) => {
                    this.students = data.students;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'hmember')
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

                this.hostelService.getHmember(false, this.classID , null, null)
                    .then((data: any) => {
                        this.students = data.students;
                    });

                this.langandpermissionService.getLangandPermissionCall(false, 'hmember')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
            }
        }
    }


    getHmebear() {

        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {

            this.langandpermissionService.getLangandPermissionCall(false, 'hmember')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.hostelService.getHmember(false, null, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.hmember_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.studentprofile = data.student;
                                    this.hmember = data.hmember;
                                    this.hostel = data.hostel;
                                    this.category = data.category;
                                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.hostelService.getHmember(false, null , null, null)
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

            this.langandpermissionService.getLangandPermissionCall(value, 'hmember')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.hostelService.getHmember(value, null, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.hmember_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.studentprofile = data.student;
                                    this.hmember = data.hmember;
                                    this.hostel = data.hostel;
                                    this.category = data.category;
                                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.hostelService.getHmember(value, null , null, null)
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
