import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {OnlineexamserviceService} from '../../../service/onlineexam/onlineexamservice.service';

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.page.html',
  styleUrls: ['./questionbank.page.scss'],
})
export class QuestionbankPage implements OnInit {

    groups: any;
    question_banks: any;
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

    getquestionBankView(questionbankID)

    {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.router.navigate(['/questionbankview', questionbankID]);
        }
    }

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.onlineexamserviceService.getQuestionbank(value)
            .then((data: any) => {
                this.question_banks = data.question_banks;
                this.groups = data.groups;
            });
        this.langandpermissionService.getLangandPermissionCall(value, 'question_bank')
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
