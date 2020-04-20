import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {FrontendService} from '../../../service/frontend/frontend.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-postcategorie',
  templateUrl: './postcategorie.page.html',
  styleUrls: ['./postcategorie.page.scss'],
})
export class PostcategoriePage implements OnInit {

     posts_categories: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public frontendService: FrontendService,
        public langandpermissionService: LangandparmisionService
    ) { this.doRefresh(false, false); }

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

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.frontendService.getPostsCategories(value)
            .then((data: any) => {
                this.posts_categories = data.posts_categories;
            });
        this.langandpermissionService.getLangandPermissionCall(value, 'posts_categories')
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
