import { Component, OnInit } from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {ToastController, LoadingController, MenuController, AlertController, NavController} from '@ionic/angular';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Events} from '@ionic/angular';
import {Router} from '@angular/router';
import {fileUrl} from '../../../config/config';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    user:any = new Object();
    siteinfo: any;
    private siteUrl: any;
    constructor(
      public events: Events,
      private network: Network,
      private toastCtrl: ToastController,
      private authService: AuthenticationService,
      public  loadingCtrl: LoadingController,
      public  alertCtrl: AlertController,
      public menuCtrl: MenuController,
      private router: Router,
      public navCtrl: NavController,

  ) {
      this.menuCtrl.enable(false, 'menu');
      this.loginForm = new FormGroup({
          username: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
      });
        this.siteUrl = fileUrl;
    }

  ngOnInit() {
      this.siteInfo();
  }

    async presentLoading() {

          const loading = await this.loadingCtrl.create({
              message: 'Please wait...',
              spinner: 'crescent',
          });
          await loading.present();

    }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    async presentAlert(data) {
        const alert = await this.alertCtrl.create({
            header: 'Login',
            message: data.message,
            buttons: ['Dismiss']
        });

        await alert.present();
    }

    async dismiss() {
        return await this.loadingCtrl.dismiss({             'dismissed': true         });
    }

    siteInfo() {

        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.authService.getSiteInfo()
                .then((data: any) => {
                    this.siteinfo = data;
                }).catch(error => {});
        }
    }

    login() {

        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.presentLoading();
            this.authService.login(this.user)
                .then((data: any) => {
                    this.events.publish('user:created', data.profile);
                    this.events.publish('token:created', data.token);
                    if (data) {
                        this.dismiss();
                        this.router.navigate(['dashboard']);
                    }
                }).catch(error => {
                    this.dismiss();
                    this.presentAlert(error);
                });
        }
    }

}
