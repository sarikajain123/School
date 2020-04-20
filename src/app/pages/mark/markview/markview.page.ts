import { Component, OnInit } from '@angular/core';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {ActivatedRoute} from '@angular/router';
import {MarkService} from '../../../service/mark/mark.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-markview',
  templateUrl: './markview.page.html',
  styleUrls: ['./markview.page.scss'],
})
export class MarkviewPage implements OnInit {
    objectKeys = Object.keys;
    public studentID: any;
    public classID: any;
    public studentprofile: any;
    public optionalsubject: any;
    subjects: any;
    grades: any;
    totalSumpoint: any = 0;
    usertype: any;
    exams: any;
    marks: any;
    highestmarks: any;
    markpercentages: any;
    marksettings: any;
    siteUrl: any;
    permission: any;
    language: any;
    examkey: any;

    constructor(
        public markService: MarkService,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
    ) { this.siteUrl = fileUrl;}


    public isRefresh = true;

    ngOnInit() {
        this.classID = this.route.snapshot.paramMap.get('classID');
        this.studentID = this.route.snapshot.paramMap.get('studentID');
        this.doRefreshProfile(false, false,  this.studentID,  this.classID );
    }


    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefreshProfile(event, value, studentID, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }

        if (studentID && classID) {
            this.markService.getMarkListView(studentID, classID, value)
                .then((data: any) => {
                    this.studentprofile = data.profile;
                    this.subjects =  data.subjects;
                    this.exams =  data.exams;
                    this.marks =  data.marks;
                    this.grades =  data.grades;
                    this.marksettings =  data.marksettings;
                    this.markpercentages =  data.markpercentages;
                    this.highestmarks =  data.highestmarks;
                    this.usertype = data.usertype;
                });
        }

        this.langandpermissionService.getLangandPermissionCall(value, 'mark')
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
