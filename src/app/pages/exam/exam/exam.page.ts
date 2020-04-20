import { Component, OnInit } from '@angular/core';
import {ExamService} from '../../../service/exam/exam.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {

    public examlist: any;
    public permission: any;
    public language: any;

    constructor(
        public examService: ExamService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService
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

    doRefresh(event, boolean) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.examService.getExam(boolean)
                .then((data: any) => {
                    this.examlist = data.exams;

                });
            this.langandpermissionService.getLangandPermissionCall(boolean, 'exam')
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
