import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {AccountService} from '../../../service/account/account.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

    maininvoices: any;
    grandtotal: any;
    totalamount: any;
    totaldiscount: any;
    totalpayment: any;
    totalweaver: any;
    totalfine: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public accountService: AccountService,
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

    getinvoiceIDView(inivoiceID)

    {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.router.navigate(['/invoiceview', inivoiceID]);
        }
    }

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.accountService.getInvoice(value)
            .then((data: any) => {
                this.maininvoices  = data.maininvoices;
                this.grandtotal    = data.grandtotalandpayment.grandtotal;
                this.totalamount   = data.grandtotalandpayment.totalamount;
                this.totaldiscount = data.grandtotalandpayment.totaldiscount;
                this.totalpayment  = data.grandtotalandpayment.totalpayment;
                this.totalweaver   = data.grandtotalandpayment.totalweaver;
                this.totalfine     = data.grandtotalandpayment.totalfine;
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
