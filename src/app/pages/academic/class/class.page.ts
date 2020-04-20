import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../../service/academic/class.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {
   public classesData: any;
   public teachers: any;
   public permission: any;
   public language: any;

  constructor(
        private router: Router,
        private route: ActivatedRoute,
        public classService: ClassService,
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

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') { this.presentToast(); }

            this.classService.getClasses(value)
                .then((data: any) => {
                    this.classesData = data.classes;
                    this.teachers = data.teachers;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'classes')
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
