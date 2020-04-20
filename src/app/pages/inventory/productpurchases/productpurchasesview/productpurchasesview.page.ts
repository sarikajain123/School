import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {AccountService} from '../../../../service/account/account.service';
import {LangandparmisionService} from '../../../../service/langandparmision.service';
import {InventoryService} from '../../../../service/inventory/inventory.service';

@Component({
  selector: 'app-productpurchasesview',
  templateUrl: './productpurchasesview.page.html',
  styleUrls: ['./productpurchasesview.page.scss'],
})
export class ProductpurchasesviewPage implements OnInit {
    productpurchaseID: any;
    createuser: any;
    productpurchase: any;
    productpurchaseitems: any;
    productsupplier: any;
    productwarehouse: any;
    productpurchasepaid: any;
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
        this.productpurchaseID = this.route.snapshot.paramMap.get('purchaseID');
        this.doRefresh(false, false, this.productpurchaseID);
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

    doRefresh(event, value, productpurchaseID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }

        this.inventoryService.getProductPurchasesView(value, productpurchaseID)
            .then((data: any) => {
                this.productpurchase = data.productpurchase;
                this.products = data.products;
                this.productpurchaseitems = data.productpurchaseitems;
                this.productpurchasepaid = data.productpurchasepaid;
                this.productsupplier = data.productsupplier;
                this.productwarehouse = data.productwarehouse;
                this.createuser = data.createuser;
            });
        this.langandpermissionService.getLangandPermissionCall(value, 'productpurchase')
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
