import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetmanagementService} from '../../../service/assetmanagement/assetmanagement.service';
import {InventoryService} from '../../../service/inventory/inventory.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-productpurchases',
  templateUrl: './productpurchases.page.html',
  styleUrls: ['./productpurchases.page.scss'],
})
export class ProductpurchasesPage implements OnInit {

    productpurchases: any;
    productsuppliers: any;
    grandtotalandpaid: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public inventoryService: InventoryService,
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
            this.inventoryService.getProductPurchases(value)
                .then((data: any) => {
                    this.productpurchases = data.productpurchases;
                    this.productsuppliers = data.productsuppliers;
                    this.grandtotalandpaid = data.grandtotalandpaid;
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
