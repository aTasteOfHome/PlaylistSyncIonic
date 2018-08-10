import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import accountInfo from './accountInfo.json';

@Component({
    selector: 'page-accounts',
    templateUrl: 'accounts.html'
})
export class AccountsPage {
    accountTypes: Array<{
        title: string,
        icon: string
    }>;
    accountsPage: AccountsPage
    constructor(public navCtrl: NavController, private platform: Platform, private http: HTTP, private browser: InAppBrowser) {
        //get this info from server if a website, store here if an app; 
        //we'll worry about it later
        this.accountTypes = accountInfo.accountTypes;
    }

    accountSelected(event, accountType) {
        this.platform.ready()
            .then(() => this.loginWithBrowser(accountType))
            .then(resp => console.log(resp))
            .catch(error => console.log(error));
    }
    
    public login(accountType): Promise<any> {
        console.log(`Login start for ${accountType.title}`);
        return this.http.get(`${accountInfo.apiUrl}/${accountType.title.toLocaleLowerCase()}/api/auth`, {}, {})
            .then(resp => {
                alert('Got spotify response');
                console.log('Got spotify response');
                console.log(JSON.stringify(Object.keys(resp)));
                console.log(JSON.stringify(resp));
            })
            .catch(err => {
                alert('Failed to authenticate with Spotify');
                console.log('Failed to authenticate with Spotify')
                console.log(JSON.stringify(Object.keys(err)));
                console.log(JSON.stringify(err));
            });
    }

    public loginWithBrowser(accountType): Promise<any> {
        console.log(`Login start for ${accountType.title}`);
        const host = `${accountInfo.apiUrl}/${accountType.title.toLocaleLowerCase()}/api`;
        return new Promise((resolve, reject) => {
            let browserRef = this.browser.create(
                `${host}/auth`,
                '_blank', 
                {
                    location: 'no',
                    clearsessioncache: 'yes',
                    clearcache: 'yes'
                }
            );
            browserRef.on('loadstart').subscribe(event => {
                console.log('Got loadstart event');
                console.log(Object.keys(event));
                console.log(event);

                if (event.url.indexOf(`${host}/authCb`) !==0) return;

                browserRef.on('exit').subscribe(event => {});
                browserRef.close();
                resolve(event);
            });
            browserRef.on('exit').subscribe(event => {
                console.log(`${accountType.title} sign in flow was canceled`);
                console.log(Object.keys(event));
                console.log(event);
                reject(`${accountType.title} sign in flow was canceled`);
            });
        })
    }
}