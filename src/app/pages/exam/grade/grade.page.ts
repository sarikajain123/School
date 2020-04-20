import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamService} from '../../../service/exam/exam.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.page.html',
  styleUrls: ['./grade.page.scss'],
})
export class GradePage implements OnInit {

     gradeList: any;
     language: any;
     permission: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
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
            this.examService.getGradeList(boolean)
                .then((data: any) => {
                    this.gradeList = data.grades;

                });
            this.langandpermissionService.getLangandPermissionCall(boolean, 'grade')
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
