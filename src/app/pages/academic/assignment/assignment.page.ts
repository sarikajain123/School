import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassService} from '../../../service/academic/class.service';
import {AssignmentService} from '../../../service/academic/assignment.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {fileUrl} from '../../../../config/config';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {Storage} from '@ionic/storage';




@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {

    public classesData: any;
    public assignments: any;
    public classID: any;
    language: any;
    permission: any;
    loginuser: any;
    classes: any;
    selectedClass: string = '';



    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public classService: ClassService,
        public assignmentService: AssignmentService,
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

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }
    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
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

                        fileTransfer.download(url, this.file.externalRootDirectory + 'Download/' + filename)
                            .then((entry) => {
                                    this.presentAlertConfirm(entry, filename);
                                console.log('download complete: ' + JSON.stringify(entry));
                                this.dismiss();
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
                                fileTransfer.download(url, this.file.externalRootDirectory + 'Download/' + filename)
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
        this.assignmentService.getAssignment(value, classID)
            .then((data: any) => {
                this.classes = data.classes;
                this.assignments = data.assignments;

            });
        this.langandpermissionService.getLangandPermissionCall(value, 'assignment')
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
            this.assignmentService.getAssignment(false, this.classID)
                .then((data: any) => {
                    this.classesData = data.classes;
                    this.assignments = data.assignments;

                });

            this.langandpermissionService.getLangandPermissionCall(false, 'assignment')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                });
        }
    }

}
