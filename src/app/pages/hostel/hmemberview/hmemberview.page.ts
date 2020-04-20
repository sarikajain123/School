import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HostelService} from '../../../service/hostel/hostel.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-hmemberview',
  templateUrl: './hmemberview.page.html',
  styleUrls: ['./hmemberview.page.scss'],
})
export class HmemberviewPage implements OnInit {

    classID: any;
    siteUrl: any;
    studentID: any;
    public studentprofile: any;
    public hmember: any;
    public hostel: any;
    public category: any;
    public usertypes: any;
    permission: any;
    language: any;

    constructor(
        public hostelService: HostelService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute
    ) {
        this.studentID = this.route.snapshot.paramMap.get('studentID');
        this.classID   =   this.route.snapshot.paramMap.get('classID');
        this.siteUrl = fileUrl;
        this.doRefresh(false, false, this.studentID, this.classID);  }

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
            this.hostelService.getHmemberView(value, studentID, classID)
                .then((data: any) => {
                    this.studentprofile = data.student;
                    this.hmember = data.hmember;
                    this.hostel = data.hostel;
                    this.category = data.category;
                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'hmember')
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
