import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnouncementService} from '../../../service/announcement/announcement.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.page.html',
  styleUrls: ['./holiday.page.scss'],
})
export class HolidayPage implements OnInit {

    holidays: any;
    siteUrl: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public announcementService: AnnouncementService,
        public langandpermissionService: LangandparmisionService
    ) { this.doRefresh(false, false); this.siteUrl = fileUrl; }

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

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.announcementService.getHoliday(value)
                .then((data: any) => {
                    this.holidays = data.holidays;
                });

            this.langandpermissionService.getLangandPermissionCall(value, 'holiday')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                });
            if (event){
            setTimeout(() => {
                event.target.complete();
            }, 2000);
        }
    }

    getholiydayView(holidayID) {
        this.router.navigate([ '/holidayview', holidayID]);
    }
}
