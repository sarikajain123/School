import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnouncementService} from '../../../service/announcement/announcement.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-noticeview',
  templateUrl: './noticeview.page.html',
  styleUrls: ['./noticeview.page.scss'],
})
export class NoticeviewPage implements OnInit {

    noticeID: any;
    notice: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public announcementService: AnnouncementService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.noticeID = this.route.snapshot.paramMap.get('noticeID');
        this.doRefresh(false, false,  this.noticeID);
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

    doRefresh(event, value, noticeID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }

            this.announcementService.getNoticeview(value, noticeID)
                .then((data: any) => {
                    this.notice = data.notice;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'notice')
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
