import { Component, OnInit } from '@angular/core';
import {ParentsService} from '../../service/parents.service';
import {ActivatedRoute} from '@angular/router';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../config/config';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-parentsview',
  templateUrl: './parentsview.page.html',
  styleUrls: ['./parentsview.page.scss'],
})
export class ParentsviewPage implements OnInit {

    public parentsID: any;
    public parentsprofile: any;
    public childrens: any;
    public usertype: any;
     permission: any;
    loginuser: any;
    language: any;
    siteUrl: any;

    constructor(
        public parentsService: ParentsService,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute,
        private storage: Storage,
        private network: Network,
        private toastCtrl: ToastController,
    ) {
        this.parentsID = this.route.snapshot.paramMap.get('parentsID');
        this.siteUrl = fileUrl;
        this.doRefreshProfile(false, false, this.parentsID);  }

    ngOnInit() {}

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

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefreshProfile(event, value, parentsID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
        this.parentsService.getParentsView(value, parentsID)
            .then((data: any) => {
                this.parentsprofile = data.profile;
                this.childrens = data.childrens;
                this.usertype = data.usertypes[this.parentsprofile.usertypeID];
            });

        this.langandpermissionService.getLangandPermissionCall(value, 'parents')
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
