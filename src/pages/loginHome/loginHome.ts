import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
// import { Http, Headers, RequestOptions } from '@angular/http';

// import { LoginPage } from '../login/login'

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
    }
    
    public login(accountType): Promise<any> {
        return new Promise((resolve, reject) => this.httpLogin.call(this, accountType.title, resolve, reject));
    }

    private httpLogin(accountType, resolve, reject): any {
        console.log(`Login start for ${accountType.title}`);

        this.http.get(`http://localhost:9999/${accountType.title}/auth`, {}, {})
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
            })
    }
}