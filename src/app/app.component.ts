import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Events, ModalController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthenticationService} from './service/authentication/authentication.service';
import { Storage } from '@ionic/storage';
import {LangandparmisionService} from './service/langandparmision.service';
import {fileUrl} from '../config/config';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {


 loginprofile: any;
 menus:        any;
 permission:   any;
 language:   any;
 siteUrl:      any;
  constructor(
    public events: Events,
    public platform: Platform,
    public splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private authenticationService: AuthenticationService,
    private langandparmisionService: LangandparmisionService,
    private router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,

  ) {
      events.subscribe('user:created', (user) => {
          this.loginprofile = user;
          this.Backendmenucall();
          this.permissioncall();
          this.siteUrl = fileUrl;
      });

    this.initializeApp();
    this.Backendmenucall();
    this.Profile();
    this.permissioncall();
    this.siteUrl = fileUrl;
  }
    Backendmenucall() {
        const menuID = [];
        this.authenticationService.Backendmenucall()
            .then((data: any) => {
                this.menus = data.menus;
                Object.keys(data.menus).forEach(function(key) {
                    menuID.push(data.menus[key]);
                });
                this.menus = menuID;
            }).catch(error => {
            console.log(error);

        });
    }

    permissioncall() {
        this.langandparmisionService.getLangandPermissionCall(false, '')
            .then((data: any) => {
                this.permission = data.permission;
                this.language = data.language;
            }).catch(error => {
                console.log(error);
        });
    }

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginprofile = response;
        });
    }

    Logout() {
        this.authenticationService.logout();

    }

  initializeApp() {
    this.platform.ready().then(() => {
        this.statusBar.backgroundColorByHexString('#dc143c');
        this.splashScreen.hide();
        this.authenticationService.authState.subscribe(state => {
            if (state) {
                this.navCtrl.navigateRoot('/dashboard');

            } else {
                this.router.navigate(['login']);
            }
        });
    });
  }
}
