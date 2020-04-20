import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionService} from '../../../service/academic/section.service';
import {ClassService} from '../../../service/academic/class.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {
    public classID: any;
    public sectionsData: any;
    public teachers: any;
    classes: any;
    permission: any;
    loginuser: any;
    language: any;
    selectedClass: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public sectionService: SectionService,
        public classService: ClassService,
        private network: Network,
        private storage: Storage,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService
    ) {
        this.Profile();
        this.doRefresh(false, false, '');
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

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }
    doRefresh(event, value, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') { this.presentToast(); }
            this.sectionService.getSection(value, classID)
                .then((data: any) => {
                    this.sectionsData = data.sections;
                    this.teachers = data.teachers;
                    this.classes = data.classes;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'section')
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
        if (this.network.type === 'none' || this.network.type === 'unknown') {this.presentToast(); }

            this.classID = this.selectedClass;
            if (this.classID) {
                this.sectionService.getSection(false, this.classID)
                    .then((data: any) => {
                        this.sectionsData = data.sections;
                        this.teachers = data.teachers;
                    });

                this.langandpermissionService.getLangandPermissionCall(false, 'section')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
            }
    }
}
