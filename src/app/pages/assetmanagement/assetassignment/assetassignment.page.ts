import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetmanagementService} from '../../../service/assetmanagement/assetmanagement.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-assetassignment',
  templateUrl: './assetassignment.page.html',
  styleUrls: ['./assetassignment.page.scss'],
})
export class AssetassignmentPage implements OnInit {

    assetassignments: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public assetmanagementService: AssetmanagementService,
        public langandpermissionService: LangandparmisionService
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
            this.assetmanagementService.getAssetAssignment(value)
                .then((data: any) => {
                    this.assetassignments = data.asset_assignments;
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

    assetassignmentView(assetassignmentID) {
        this.router.navigate([ '/assetassignmentview', assetassignmentID]);
    }
}
