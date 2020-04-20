import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {LangandparmisionService} from '../../../../service/langandparmision.service';
import {fileUrl} from '../../../../../config/config';
import {OnlineexamserviceService} from '../../../../service/onlineexam/onlineexamservice.service';

@Component({
  selector: 'app-questionbankview',
  templateUrl: './questionbankview.page.html',
  styleUrls: ['./questionbankview.page.scss'],
})
export class QuestionbankviewPage implements OnInit {

    questionbankID: any;
    questions: any;
    optionss: any;
    answers: any;
    permission: any;
    siteUrl: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public onlineexamserviceService: OnlineexamserviceService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.questionbankID = this.route.snapshot.paramMap.get('questionbankID');
        this.doRefresh(false, false, this.questionbankID );
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

    doRefresh(event, value, questionbankID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.onlineexamserviceService.getQuestionbankview(value, questionbankID)
            .then((data: any) => {
                console.log(data);
                this.questions = data.question;
                this.optionss = data.options;
                this.answers = data.answers;
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
