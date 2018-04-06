import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    accountType: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.accountType = navParams.get('accountType');
    }
}