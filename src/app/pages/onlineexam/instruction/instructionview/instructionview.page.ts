import { Component, OnInit } from '@angular/core';
import {OnlineexamserviceService} from '../../../../service/onlineexam/onlineexamservice.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {LangandparmisionService} from '../../../../service/langandparmision.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-instructionview',
  templateUrl: './instructionview.page.html',
  styleUrls: ['./instructionview.page.scss'],
})
export class InstructionviewPage implements OnInit {

    public instructionID: any;
    public instruction: any;
    permission: any;
    language: any;

    constructor(
        public onlineexamserviceService: OnlineexamserviceService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute
    ) {
        this.instructionID = this.route.snapshot.paramMap.get('instructionID');
        this.doRefresh(false, false, this.instructionID);
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

    doRefresh(event, value, instructionID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.onlineexamserviceService.getInstructionview(value, instructionID)
            .then((data: any) => {
                this.instruction = data.instruction;
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
