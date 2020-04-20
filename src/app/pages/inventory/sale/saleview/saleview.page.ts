import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {InventoryService} from '../../../../service/inventory/inventory.service';
import {LangandparmisionService} from '../../../../service/langandparmision.service';

@Component({
  selector: 'app-saleview',
  templateUrl: './saleview.page.html',
  styleUrls: ['./saleview.page.scss'],
})
export class SaleviewPage implements OnInit {
    saleID: any;
    createuser: any;
    user: any;
    usertypes: any;
    productsale: any;
    siteinfos: any;
    productsaleitems: any;
    productsalepaid: any;
    products: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public inventoryService: InventoryService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.saleID = this.route.snapshot.paramMap.get('saleID');
        this.doRefresh(false, false, this.saleID);
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

    doRefresh(event, value, saleID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }

        this.inventoryService.getProductSaleView(value, saleID)
            .then((data: any) => {
                this.productsale = data.productsale;
                this.products = data.products;
                this.productsaleitems = data.productsaleitems;
                this.productsalepaid = data.productsalepaid;
                this.usertypes = data.usertypes;
                this.user = data.user;
                this.createuser = data.createuser;
            });
        this.inventoryService.getSiteInfo().then((data: any) => {
            this.siteinfos = data;
        });

        this.langandpermissionService.getLangandPermissionCall(value, 'productsale')
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
