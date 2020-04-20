import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-academicyear',
  templateUrl: './academicyear.page.html',
  styleUrls: ['./academicyear.page.scss'],
})
export class AcademicyearPage implements OnInit {

     schoolyears: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public administratorService: AdministratorService,
        public langandpermissionService: LangandparmisionService
    ) { this.doRefresh(false, false);  }

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
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.administratorService.getSchoolyear(value)
                .then((data: any) => {
                    this.schoolyears = data.schoolyears;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'schoolyear')
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
