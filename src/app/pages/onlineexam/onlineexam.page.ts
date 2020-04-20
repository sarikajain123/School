import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {OnlineexamserviceService} from '../../service/onlineexam/onlineexamservice.service';
import {LangandparmisionService} from '../../service/langandparmision.service';

@Component({
  selector: 'app-onlineexam',
  templateUrl: './onlineexam.page.html',
  styleUrls: ['./onlineexam.page.scss'],
})
export class OnlineexamPage implements OnInit {
    online_exams: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public onlineexamserviceService: OnlineexamserviceService,
        public langandpermissionService: LangandparmisionService,
    ) { this.doRefresh(false, false); }


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
        this.onlineexamserviceService.getonlineExam(value)
            .then((data: any) => {
                this.online_exams = data.online_exams;
            });
        this.langandpermissionService.getLangandPermissionCall(value, 'online_exam')
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
