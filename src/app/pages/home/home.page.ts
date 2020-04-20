import { CalendarComponent } from 'ionic2-calendar/calendar';
import {Component, ViewChild, Inject, OnDestroy, AfterViewInit, LOCALE_ID } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {fileUrl} from '../../../config/config';
import {AlertController, Events, LoadingController, MenuController, Platform, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DashboardService} from '../../service/dashboard.service';
import {Network} from '@ionic-native/network/ngx';
import { formatDate } from '@angular/common';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnDestroy, AfterViewInit{

    minDate = new Date().toISOString();
    eventSource = [];
    viewTitle;

    calendar = {
        mode: 'month',
        currentDate: new Date(),
    };

    @ViewChild(CalendarComponent) myCal: CalendarComponent;

     permission: any;
     loginprofile: any;
     language: any;
     notices: any;
     generateBoxs: any;
     profileuser: any;
     usertype: any;
     sitename: any;
     sitephoto: any;
     boxsData: any;
     siteUrl: any;
    backButtonSubscription;
    constructor(private statusBar: StatusBar,
                @Inject(LOCALE_ID) private locale: string,
                private storage: Storage,
                public events: Events,
                private platform: Platform,
                private router: Router,
                private network: Network,
                private toastCtrl: ToastController,
                public  loadingCtrl: LoadingController,
                public  alertCtrl: AlertController,
                public menuCtrl: MenuController,
                private authenticationService: AuthenticationService,
                public dashboardService: DashboardService,
                private langandparmisionService: LangandparmisionService,
                ) { this.siteUrl = fileUrl; }

    isRefresh = true;
    ionViewWillEnter() {
        this.permissioncall();
        this.Profile();
        this.doRefresh(false, false);
    }

    ngAfterViewInit() {
        this.backButtonSubscription =  this.platform.backButton.subscribe(async () => {
            if (this.router.isActive('/dashboard', true) && this.router.url === '/dashboard') {
                navigator['app'].exitApp();
            }
        });
    }

    ngOnDestroy() {
        this.backButtonSubscription.unsubscribe();
    }
    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }


    // Change current month/week/day
    next() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }

    back() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }

// Focus today
    today() {
        this.calendar.currentDate = new Date();
    }

// Selected date reange and hence title changed
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

// Calendar event was clicked
    async onEventSelected(event) {
        // Use Angular date pipe for conversion
        let start = formatDate(event.startTime, 'medium', this.locale);
        let end = formatDate(event.endTime, 'medium', this.locale);

        const alert = await this.alertCtrl.create({
            header: event.title,
            message: 'From: ' + start + '<br><br>To: ' + end + ' <br><br> ' + event.desc.replace(/<[^>]*>/g, ''),
            buttons: ['OK']
        });
        alert.present();
    }

// Time slot was clicked
    onTimeSelected(ev) {
        let selected = new Date(ev.selectedTime);
        selected.setHours(selected.getHours() + 1);
    }


    permissioncall() {
        this.langandparmisionService.getLangandPermissionCall(false, 'dashboard')
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

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.storage.get('Profile').then((response) => {
                this.loginprofile = response;
            });
            const keybox = [];
            const eventData = [];
            const holidayData = [];
            this.dashboardService.getDashboard(value)
                .then((data: any) => {
                    this.sitename = data.sitename;
                    this.sitephoto = data.sitephoto;
                    this.notices = data.notices;
                    const events = data.events;
                    const holidays = data.holidays;
                    this.generateBoxs = data.generateBoxs;
                    this.profileuser = data.user;
                    this.usertype = data.usertype;
                    Object.keys(data.generateBoxs).forEach(function (key) {
                        keybox.push({'boxkey': key});
                    });
                    this.boxsData = keybox;
                    events.forEach((eventDay) => {
                        const eventCopy = {
                            title: eventDay.title,
                            startTime:  new Date(eventDay.fdate),
                            endTime: new Date(eventDay.tdate),
                            allDay: true,
                            desc: eventDay.details
                        };
                        if (eventCopy.allDay) {
                            const start = eventCopy.startTime;
                            const end = eventCopy.endTime;

                            eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
                            eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
                        }
                        eventData.push(eventCopy);
                    });
                    this.eventSource = eventData;
                    holidays.forEach((holiday) => {
                        const eventCopy = {
                            title: holiday.title,
                            startTime:  new Date(holiday.fdate),
                            endTime: new Date(holiday.tdate),
                            allDay: true,
                            desc: holiday.details
                        };
                        if (eventCopy.allDay) {
                            const start = eventCopy.startTime;
                            const end = eventCopy.endTime;

                            eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
                            eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
                        }
                        holidayData.push(eventCopy);
                    });
                    this.eventSource = holidayData;
                    this.myCal.loadEvents();

                });
                if (event) {
            setTimeout(() => {
                event.target.complete();
            }, 2000);
        }
    }
}
