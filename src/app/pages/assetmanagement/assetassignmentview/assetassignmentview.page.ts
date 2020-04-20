import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AssetmanagementService} from '../../../service/assetmanagement/assetmanagement.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-assetassignmentview',
  templateUrl: './assetassignmentview.page.html',
  styleUrls: ['./assetassignmentview.page.scss'],
})
export class AssetassignmentviewPage implements OnInit {

   public assetassignmentID: any;
    public asset_assignment: any;
    public siteUrl: any;
    public user: any;
    public usertype: any;
    permission: any;
    language: any;

    constructor(
        public assetmanagementService: AssetmanagementService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute
    ) {
        this.assetassignmentID = this.route.snapshot.paramMap.get('assetassignmentID');
        this.doRefresh(false, false,  this.assetassignmentID);
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

    doRefresh(event, value, assetassignmentID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.assetmanagementService.getAssetAssignmentView(value, assetassignmentID)
                .then((data: any) => {
                    this.asset_assignment = data.asset_assignment;
                    this.user = data.user;
                    if (this.user) {
                        this.usertype = data.usertypes[this.user.usertypeID];
                    }
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'asset_assignment')
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
