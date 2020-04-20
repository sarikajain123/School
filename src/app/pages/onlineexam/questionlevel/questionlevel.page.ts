import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OnlineexamserviceService} from '../../../service/onlineexam/onlineexamservice.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-questionlevel',
  templateUrl: './questionlevel.page.html',
  styleUrls: ['./questionlevel.page.scss'],
})
export class QuestionlevelPage implements OnInit {

    public questionlevels: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public onlineexamserviceService: OnlineexamserviceService,
        public langandpermissionService: LangandparmisionService
    ) {  }


    isRefresh = true;
    ngOnInit() {
        this.doRefresh(false, false);
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
            this.onlineexamserviceService.getQuestionLevel(value)
                .then((data: any) => {
                    this.questionlevels = data.question_levels;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'question_level')
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
