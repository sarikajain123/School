import { Component, OnInit } from '@angular/core';
import {AssetmanagementService} from '../../../../service/assetmanagement/assetmanagement.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {LangandparmisionService} from '../../../../service/langandparmision.service';
import {ActivatedRoute} from '@angular/router';
import {fileUrl} from '../../../../../config/config';

@Component({
  selector: 'app-assetview',
  templateUrl: './assetview.page.html',
  styleUrls: ['./assetview.page.scss'],
})
export class AssetviewPage implements OnInit {

    public assetID: any;
    public asset: any;
    public siteUrl: any;
    permission: any;
    language: any;

    constructor(
        public assetmanagementService: AssetmanagementService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute
    ) {
        this.assetID = this.route.snapshot.paramMap.get('assetID');
        this.doRefresh(false, false,  this.assetID);
        this.siteUrl = fileUrl;
    }

    isRefresh = true;
    ngOnInit() {}


    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefresh(event, value, assetID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.assetmanagementService.getAssetView(value, assetID)
            .then((data: any) => {
                this.asset = data.asset;
            });
        this.langandpermissionService.getLangandPermissionCall(value, 'asset')
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

