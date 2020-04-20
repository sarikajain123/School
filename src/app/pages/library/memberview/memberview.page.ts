import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LibraryService} from '../../../service/library/library.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-memberview',
  templateUrl: './memberview.page.html',
  styleUrls: ['./memberview.page.scss'],
})
export class MemberviewPage implements OnInit {

    studentID: any;
    siteUrl: any;
    classID: any;
    public studentprofile: any;
    public lmember: any;
    public usertypes: any;
    permission: any;
    language: any;

    constructor(
        public libraryService: LibraryService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute
    ) {
        this.studentID = this.route.snapshot.paramMap.get('studentID');
        this.classID = this.route.snapshot.paramMap.get('classID');
        this.doRefresh(false, false, this.studentID, this.classID);
        this.siteUrl = fileUrl;
    }

    isRefresh = true;
    ngOnInit() {

    }


    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefresh(event, value, studentID, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.libraryService.getLmemberView(value, studentID, classID)
                .then((data: any) => {
                    this.studentprofile = data.student;
                    this.lmember = data.lmember;
                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'lmember')
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
