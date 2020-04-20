import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HostelService} from '../../../service/hostel/hostel.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.page.html',
  styleUrls: ['./hostel.page.scss'],
})
export class HostelPage implements OnInit {

    hostels: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public hostelService: HostelService,
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
            this.hostelService.getHostel(value)
                .then((data: any) => {
                    this.hostels = data.hostels;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'hostel')
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
