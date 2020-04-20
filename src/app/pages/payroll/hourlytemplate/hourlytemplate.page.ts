import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PayrollService} from '../../../service/payroll/payroll.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-hourlytemplate',
  templateUrl: './hourlytemplate.page.html',
  styleUrls: ['./hourlytemplate.page.scss'],
})
export class HourlytemplatePage implements OnInit {

    hourlytemplates: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public payrollService: PayrollService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
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
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.payrollService.getHourlyTemplate(value)
                .then((data: any) => {
                    this.hourlytemplates = data.hourly_templates;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'hourly_template')
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
