import { Component, OnInit } from '@angular/core';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';
import {fileUrl} from '../../../config/config';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.page.html',
  styleUrls: ['./userview.page.scss'],
})
export class UserviewPage implements OnInit {

    public userprofile: any;
    public userID: any;
    loginuser: any;
    attendances: any;
    attendancesMonth: any;
    totalcount: any;
    make_payments: any;
    netsalary: any;
    totaldeduction: any;
    grosssalary: any;
    salary_template: any;
    hourly_salary: any;
    salaryoptions: any;
    permission: any;
    language: any;
    usertype: any;
    private siteUrl: any;

    constructor(
        public userService: UserService,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute,
        private storage: Storage,
        private network: Network,
        private toastCtrl: ToastController,
    ) {
        this.userID = this.route.snapshot.paramMap.get('userID');
        this.doRefreshProfile(false, false,  this.userID);
        this.siteUrl = fileUrl;
    }

    ngOnInit() {
    }

    public useritems = false;
    public  isRefresh = true;
    public routineitems = true;
    public attendanceitems = true;
    public invoicesitems = true;
    public paymentsitems = true;

    isCollapsed(value) {

        this.attendanceitems = true;
        this.invoicesitems = true;
        this.paymentsitems = true;
        this.useritems = value;
    }


    isCollapsedattendance(value) {


        this.useritems = true;
        this.attendanceitems = value;
        this.invoicesitems = true;
        this.paymentsitems = true;
    }

    isCollapsedinvoices(value) {


        this.useritems = true;
        this.attendanceitems = true;
        this.invoicesitems = value;
        this.paymentsitems = true;
    }

    isCollapsedpayments(value) {


        this.useritems = true;
        this.attendanceitems = true;
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

    doRefreshProfile(event, value, userID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
        this.userService.getUserView(value, userID)
            .then((data: any) => {
                this.userprofile = data.profile;
                this.attendances =  data.attendance;
                this.totalcount =  data.totalcount;
                this.attendancesMonth =  data.attendancesmonths;
                this.salary_template =  data.salary_template;
                this.hourly_salary = data.hourly_salary;
                this.grosssalary =  data.grosssalary;
                this.totaldeduction =  data.totaldeduction;
                this.netsalary =  data.netsalary;
                this.salaryoptions =  data.salaryoptions;
                this.make_payments =  data.make_payments;
            });

        this.langandpermissionService.getLangandPermissionCall(false, 'user')
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
