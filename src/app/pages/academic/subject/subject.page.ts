import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../../service/academic/subject.service';
import {ClassService} from '../../../service/academic/class.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
    classID: any;
    public classesData: any;
    public subjects: any;
    public subjectteachers: any;
    public teachers: any;
    loginuser: any;
    classes: any;
    language: any;
    permission: any;
    selectedClass: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public subjectService: SubjectService,
        public classService: ClassService,
        private network: Network,
        private storage: Storage,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService
    ) { }

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
    doRefresh(event, boolean, classID) {

        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.subjectService.getSubject(boolean,  classID)
            .then((data: any) => {
                this.classesData = data.classes;
                this.subjects = data.subjects;
                this.subjectteachers = data.subjectteachers;
                this.teachers = data.teachers;
                this.classes = data.classes;
            });

        this.langandpermissionService.getLangandPermissionCall(boolean, 'subject')
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
                this.subjectService.getSubject(false, this.classID)
                    .then((data: any) => {
                        this.classesData = data.classes;
                        this.subjects = data.subjects;
                        this.subjectteachers = data.subjectteachers;
                        this.teachers = data.teachers;
                    });

                this.langandpermissionService.getLangandPermissionCall(false, 'subject')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
            }
    }
}
