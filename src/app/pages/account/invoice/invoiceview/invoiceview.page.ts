import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {LangandparmisionService} from '../../../../service/langandparmision.service';
import {AccountService} from '../../../../service/account/account.service';

@Component({
  selector: 'app-invoiceview',
  templateUrl: './invoiceview.page.html',
  styleUrls: ['./invoiceview.page.scss'],
})
export class InvoiceviewPage implements OnInit {
    inivoiceID: any;
    invoices: any;
    maininvoice: any;
    siteinfos: any;
    createuser: any;
    grandtotalandpayment: any;
    student: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public accountService: AccountService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.inivoiceID = this.route.snapshot.paramMap.get('invoiceID');
        this.doRefresh(false, false, this.inivoiceID);
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

    doRefresh(event, value, inivoiceID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }

        this.accountService.getInvoiceView(value, inivoiceID)
            .then((data: any) => {
              this.student = data.student;
              this.invoices = data.invoices;
              this.grandtotalandpayment = data.grandtotalandpayment;
              this.createuser = data.createuser;
              this.maininvoice = data.maininvoice;
              this.siteinfos = data.siteinfos;
            });
        this.langandpermissionService.getLangandPermissionCall(value, 'invoice')
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
