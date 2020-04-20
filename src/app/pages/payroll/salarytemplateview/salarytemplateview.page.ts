import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PayrollService} from '../../../service/payroll/payroll.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-salarytemplateview',
  templateUrl: './salarytemplateview.page.html',
  styleUrls: ['./salarytemplateview.page.scss'],
})
export class SalarytemplateviewPage implements OnInit {

    salarytemplateID: any;
     salarytemplate: any;
     salaryoptions: any;
     grosssalary: any;
     totaldeduction: any;
     netsalary: any;
    permission: any;
    language: any;

    constructor(
        public payrollService: PayrollService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute
    ) {
        this.salarytemplateID = this.route.snapshot.paramMap.get('salarytemplateID');
        this.doRefresh(false, false, this.salarytemplateID);  }

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

    doRefresh(event, value, salarytemplateID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.payrollService.getSalaryTemplateView(value, salarytemplateID)
                .then((data: any) => {
                    this.salarytemplate = data.salary_template;
                    this.salaryoptions = data.salaryoptions;
                    this.grosssalary = data.grosssalary;
                    this.totaldeduction = data.totaldeduction;
                    this.netsalary = data.netsalary;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'salary_template')
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
