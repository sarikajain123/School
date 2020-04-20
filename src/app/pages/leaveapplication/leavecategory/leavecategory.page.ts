import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InventoryService} from '../../../service/inventory/inventory.service';
import {LeaveapplicationService} from '../../../service/leaveapplication/leaveapplication.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-leavecategory',
  templateUrl: './leavecategory.page.html',
  styleUrls: ['./leavecategory.page.scss'],
})
export class LeavecategoryPage implements OnInit {

    leavecategorys: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public leaveapplicationService: LeaveapplicationService,
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
            this.leaveapplicationService.getLeaveCategory(value)
                .then((data: any) => {
                    this.leavecategorys = data.leavecategorys;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'leavecategory')
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
