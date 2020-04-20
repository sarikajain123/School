import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../../service/academic/class.service';
import {RoutionService} from '../../../service/academic/roution.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss'],
})
export class RoutinePage implements OnInit {
    public classesData: any;
    public routines: any;
   private days: any;
    language: any;
    permission: any;
    classesID: any;
    loginuser: any;
    classes: any;
    selectedClass: string = '';

    slideOpts = {
        autoplay: true
    };

    isRefresh = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public routionService: RoutionService,
        public classService: ClassService,
        private network: Network,
        private storage: Storage,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
    ) {  }

    ngOnInit() {
        this.Profile();
        this.getRoutine();
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
    getRoutine() {
        const daysData = [];
        this.routionService.getRoutine('', false)
            .then((data: any) => {
                this.classes = data.classes;
                this.classesID = data.classesID;
                if (data.days) {
                    Object.keys(data.days).forEach(function(key) {
                        daysData.push({'day': data.days[key]});
                    });
                    this.days = daysData;
                    this.routines = data.routines;

                }
            });

        this.langandpermissionService.getLangandPermissionCall(false, 'routine')
            .then((data: any) => {
                this.permission = data.permission;
                this.language = data.language;
            });
    }

    selectedClasses() {

        const classID = this.selectedClass;
        const daysData = [];
        if (classID) {
            this.routionService.getRoutine(classID, false)
                .then((data: any) => {
                    this.classes = data.classes;
                    this.classesID = data.classesID;
                    if (data.days) {
                        Object.keys(data.days).forEach(function(key) {
                            daysData.push({'day': data.days[key]});
                        });
                        this.days = daysData;
                    }
                    this.routines = data.routines;
                    console.log(this.routines);
                });

            this.langandpermissionService.getLangandPermissionCall(false, 'routine')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                });
        }
    }

    doRefresh(event, classID, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') { this.presentToast(); }
        const daysData = [];
        this.routionService.getRoutine(classID, value)
            .then((data: any) => {
                this.classes = data.classes;
                this.classesID = data.classesID;
                if (data.days) {
                    Object.keys(data.days).forEach(function(key) {
                        daysData.push({'day': data.days[key]});
                    });
                    this.days = daysData;
                }
                this.routines = data.routines;
                console.log(this.routines);
            });

        this.langandpermissionService.getLangandPermissionCall(value, 'routine')
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
