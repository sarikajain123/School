import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-systemadminview',
  templateUrl: './systemadminview.page.html',
  styleUrls: ['./systemadminview.page.scss'],
})
export class SystemadminviewPage implements OnInit {

     systemadmin: any;
    userID: any;
    permission: any;
    language: any;
    siteUrl: any;
    make_payments: any;
    netsalary: any;
    totaldeduction: any;
    grosssalary: any;
    salary_template: any;
    hourly_salary: any;
    salaryoptions: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public administratorService: AdministratorService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.userID = this.route.snapshot.paramMap.get('userID');
        this.siteUrl = fileUrl;
        this.doRefresh(false, false,  this.userID);
    }


    isRefresh = true;
    ngOnInit() {

    }

    public useritems = false;
    public invoicesitems = true;
    public paymentsitems = true;

    isCollapsed(value) {
        this.paymentsitems = true;
        this.invoicesitems = true;
        this.useritems = value;
    }

    isCollapsedinvoices(value) {
        this.useritems = true;
        this.invoicesitems = value;
        this.paymentsitems = true;
    }

    isCollapsedpayments(value) {
        this.useritems = true;
        this.invoicesitems = true;
        this.paymentsitems = value;
    }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefresh(event, value, userID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.administratorService.getSystemAdminview(value, userID)
                .then((data: any) => {
                    this.systemadmin = data.profile;
                    this.salary_template =  data.salary_template;
                    this.hourly_salary = data.hourly_salary;
                    this.grosssalary =  data.grosssalary;
                    this.totaldeduction =  data.totaldeduction;
                    this.netsalary =  data.netsalary;
                    this.salaryoptions =  data.salaryoptions;
                    this.make_payments =  data.make_payments;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'systemadmin')
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
