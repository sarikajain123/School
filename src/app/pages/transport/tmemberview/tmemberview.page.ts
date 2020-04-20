import { Component, OnInit } from '@angular/core';
import {LibraryService} from '../../../service/library/library.service';
import {ActivatedRoute} from '@angular/router';
import {TransportService} from '../../../service/transport/transport.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-tmemberview',
  templateUrl: './tmemberview.page.html',
  styleUrls: ['./tmemberview.page.scss'],
})
export class TmemberviewPage implements OnInit {


    studentID: any;
    siteUrl: any;
    classID: any;
    public studentprofile: any;
    public tmember: any;
    public transport: any;
    public usertypes: any;
    permission: any;
    language: any;

    constructor(
        public transportService: TransportService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute
    ) {
        this.studentID = this.route.snapshot.paramMap.get('studentID');
        this.classID   =   this.route.snapshot.paramMap.get('classID');
        this.siteUrl = fileUrl;
        this.doRefresh(false, false, this.studentID,  this.classID );  }

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
            this.transportService.getTmemberView(value, studentID, classID)
                .then((data: any) => {
                    this.studentprofile = data.student;
                    this.tmember = data.tmember;
                    this.transport = data.transport;
                    this.usertypes = data.usertypes[this.studentprofile.usertypeID];
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'tmember')
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
