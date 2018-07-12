import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import * as _ from 'lodash';
import * as clientInfo from './client_info.json';
// import { Http, Headers, RequestOptions } from '@angular/http';

// import { LoginPage } from '../login/login'

declare let window: any;

@Component({
    selector: 'page-login-home',
    templateUrl: 'loginHome.html'
})
export class LoginHomePage {
    accountTypes: Array<{
        title: string,
        icon: string
    }>;
    loginHomePage: LoginHomePage
    constructor(public navCtrl: NavController, private platform: Platform, private http: HTTP) {
        //get this info from server if a website, store here if an app; 
        //we'll worry about it later
        this.accountTypes = [{
            title: 'Spotify',
            icon: 'flask'
        }, {
            title: 'Youtube',
            icon: 'build'
        }];
    }

    accountSelected(event, accountType) {
        this.platform.ready()
            .then(() => this.login(accountType))
            .then(
                resp => console.log(resp)
            )
            .catch(error => console.log(error));
        // this.navCtrl.push(LoginPage, {
        //     accountType
        // });
    }
    
    public login(accountType): Promise<any> {
        return new Promise(this.httpLogin.bind(this));
    }

    private httpLogin(resolve, reject): any {
        const loginInfo = {
            Spotify: {
                redirect_uri: 'PlaylistSync-login://returnAfterLogin',
                client_id: '',
                client_secret: ''
            }
        };
        let accountInfo = loginInfo['Spotify'];
        console.log('Login start');

        this.http.post('https://accounts.spotify.com/api/token', {
            grant_type: 'client_credentials'
        }, {
            Authorization: `Basic ${btoa(`${accountInfo.client_id}:${accountInfo.client_secret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .then(resp => {
            console.log('Got response from Spotify!');
            console.log('%j', Object.keys(resp));
            console.log(resp.status)
            console.log(resp.data)
            console.log(resp.headers)
            console.log(resp.url)
            if (resp.status !== 200) {
                return reject('Failed to authenticate with Spotify');
            }
            return resolve(_.get(resp, 'data.access_token'));
        })
        .catch(err => {
            console.log('Failed to authenticate with Spotify')
            console.log(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))));
            reject(err);
        });
    }
}