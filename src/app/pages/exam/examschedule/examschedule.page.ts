import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamService} from '../../../service/exam/exam.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-examschedule',
  templateUrl: './examschedule.page.html',
  styleUrls: ['./examschedule.page.scss'],
})
export class ExamschedulePage implements OnInit {
    public classID: any;
     examschedules: any;
     classesData: any;
     classes: any;
    loginuser: any;
    language: any;
    permission: any;
    selectedClass: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public examService: ExamService,
        private network: Network,
        private storage: Storage,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService
    ) {  }

    isRefresh = true;
    ngOnInit() {
        this.Profile();
        this.doRefresh(false, false, '');
    }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }
    doRefresh(event, value, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.examService.getExamSchedule(value, classID)
                .then((data: any) => {
                    this.classesData = data.classes;
                    this.examschedules = data.examschedules;
                    this.classes = data.classes;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'examschedule')
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

    selectedClasses() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.classID = this.selectedClass;
            if (this.classID) {
                this.examService.getExamSchedule(false, this.classID)
                    .then((data: any) => {
                        this.classesData = data.classes;
                        this.examschedules = data.examschedules;
                    });

                this.langandpermissionService.getLangandPermissionCall(false, 'examschedule')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
            }
    }
}
