import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ParentsService} from '../../service/parents.service';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {Storage} from '@ionic/storage';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, ToastController} from '@ionic/angular';
import {fileUrl} from '../../../config/config';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss'],
})
export class ParentsPage implements OnInit {

    parents: any;
    permission: any;
    language: any;
    loginuser: any;
    myProfile = false;
    public parentsprofile: any;
    public childrens: any;
    public usertype: any;
    private siteUrl: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private storage: Storage,
        private network: Network,
        private toastCtrl: ToastController,
        public  alertCtrl: AlertController,
        public parentsService: ParentsService,
        public langandpermissionService: LangandparmisionService,
    ) {
        this.siteUrl = fileUrl;
        this.getParents();
    }

    public isRefresh = true;
    public parentitems = false;
    public studentitems = true;

    isCollapsed(value) {
        this.studentitems = true;
        this.parentitems = value;
    }

    isCollapsedParent(value) {
        this.parentitems = true;
        this.studentitems = value;
    }

    ngOnInit() {
        this.Profile();
    }


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

    doRefresh(event, value) {
        this.parentsService.getParents(value, '', '')
            .then((data: any) => {
                this.parents = data.parents;
            });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    getParentsView(partentsID) {
        this.router.navigate([ '/parentsview', partentsID]);
    }

    getParents() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.storage.get('Profile').then((response) => {
                this.loginuser = response;
            });
            this.langandpermissionService.getLangandPermissionCall(false, 'parents')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 4) {
                        this.parentsService.getParents(false, this.loginuser.loginuserID, this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.parents_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 4 && this.myProfile) {
                                    this.parentsprofile = data.profile;
                                    this.childrens = data.childrens;
                                    this.usertype = data.usertypes[this.parentsprofile.usertypeID];

                                } else {
                                    this.parents = data.parents;
                                }

                            });
                    } else {

                        this.parentsService.getParents(false, '', '')
                            .then((data: any) => {
                                this.parents = data.parents;
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
            this.langandpermissionService.getLangandPermissionCall(value, 'parents')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 4) {
                        this.parentsService.getParents(value, this.loginuser.loginuserID, this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.parents_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 4 && this.myProfile) {
                                    this.parentsprofile = data.profile;
                                    this.childrens = data.childrens;
                                    this.usertype = data.usertypes[this.parentsprofile.usertypeID];

                                } else {
                                    this.parents = data.parents;
                                }

                            });
                    } else {

                        this.parentsService.getParents(value, '', '')
                            .then((data: any) => {
                                this.parents = data.parents;
                            });
                    }
                });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


}
