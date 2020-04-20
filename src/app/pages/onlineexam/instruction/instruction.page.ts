import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OnlineexamserviceService} from '../../../service/onlineexam/onlineexamservice.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.page.html',
  styleUrls: ['./instruction.page.scss'],
})
export class InstructionPage implements OnInit {

    public instructions: any;
    permission: any;
    language: any;

    constructor(
        public onlineexamserviceService: OnlineexamserviceService,
        private network: Network,
        private toastCtrl: ToastController,
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
            this.onlineexamserviceService.getInstruction(value)
                .then((data: any) => {
                    this.instructions = data.instructions;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'instruction')
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
