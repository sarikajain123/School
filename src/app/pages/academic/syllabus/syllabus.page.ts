import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../../service/academic/class.service';
import {SyllabusService} from '../../../service/academic/syllabus.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';
import {Storage} from '@ionic/storage';



@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.page.html',
  styleUrls: ['./syllabus.page.scss'],
})
export class SyllabusPage implements OnInit {

    public classID: any;
    public classesData: any;
    public syllabuss: any;
    language: any;
    loginuser: any;
    permission: any;

    classes: any;
    selectedClass: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public syllabusService: SyllabusService,
        public classService: ClassService,
        public langandpermissionService: LangandparmisionService,
        private transfer: FileTransfer,
        private file: File,
        private fileOpener: FileOpener,
        public androidPermissions: AndroidPermissions,
        private network: Network,
        private storage: Storage,
        private toastCtrl: ToastController,
        public  loadingCtrl: LoadingController,
        public  alertCtrl: AlertController,
        public menuCtrl: MenuController,
    ) {  }

    isRefresh = true;

    ngOnInit() {
        this.Profile();
        this.doRefresh(false, false, '');
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

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }
    async presentAlertConfirm(entry, filename) {
        const alert = await this.alertCtrl.create({
            header: 'File downloaded!',
            message: `${entry.fullPath}`,
            buttons: [
                {
                    text: 'Open',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        const extension = filename.replace(/^.*?\.([a-zA-Z0-9]+)$/, "$1");

                        if (extension ==='pdf') {
                            this.fileOpener.open(`${entry.nativeURL}`, 'application/pdf')
                                .then(() => console.log('File is opened'))
                                .catch(e => console.log('Error opening file', e));
                        } else {
                            this.fileOpener.open(`${entry.nativeURL}`, 'image/' + filename)
                                .then(() => console.log('File is opened'))
                                .catch(e => console.log('Error opening file', e));
                        }
                    }
                }, {
                    text: 'Open',
                    handler: () => {
                        const extension = filename.replace(/^.*?\.([a-zA-Z0-9]+)$/, "$1");
                        if (extension ==='pdf') {
                            this.fileOpener.open(`${entry.nativeURL}`, 'application/pdf')
                                .then(() => console.log('File is opened'))
                                .catch(e => console.log('Error opening file', e));
                        } else {
                            this.fileOpener.open(`${entry.nativeURL}`, 'image/' + filename)
                                .then(() => console.log('File is opened'))
                                .catch(e => console.log('Error opening file', e));
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    async dismiss() {
        return await this.loadingCtrl.dismiss({             'dismissed': true         });
    }

    fileDownload(file, filename) {

        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
                result => {
                    if (result.hasPermission) {
                        // code
                        this.presentLoading();

                        const fileTransfer: FileTransferObject = this.transfer.create();
                        const url = fileUrl + 'uploads/images/' + file;

                        fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + filename)
                            .then((entry) => {
                                this.dismiss();
                                this.presentAlertConfirm(entry, filename);
                            }, (error) => {
                                this.dismiss();
                                // handle error
                                console.log(error);
                            });
                    } else {
                        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(result => {
                            if (result.hasPermission) {
                                // code

                                this.presentLoading();
                                const fileTransfer: FileTransferObject = this.transfer.create();
                                const url = fileUrl + 'uploads/images/' + file;

                                // fileTransfer.download(path, this.file.dataDirectory + 'report.' + extension)
                                fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + filename)
                                    .then((entry) => {
                                        this.dismiss();
                                        this.presentAlertConfirm(entry, filename);
                                        console.log('download complete: ' + JSON.stringify(entry));
                                    }, (error) => {
                                        this.dismiss();
                                        console.log(error);
                                    });
                            }
                        });
                    }
                },
                err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            );
        }
    }

    doRefresh(event, value, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.syllabusService.getSyllabus(value, classID)
                .then((data: any) => {
                    this.classes = data.classes;
                    this.syllabuss = data.syllabuss;

                });
            this.langandpermissionService.getLangandPermissionCall(value, 'syllabus')
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

    selectedClasses() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.classID = this.selectedClass;
            if (this.classID) {

                this.syllabusService.getSyllabus(false, this.classID)
                    .then((data: any) => {
                        this.classesData = data.classes;
                        this.syllabuss = data.syllabuss;
                    });

                this.langandpermissionService.getLangandPermissionCall(false, 'syllabus')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
            }
    }
}
