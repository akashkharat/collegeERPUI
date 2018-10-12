import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class RestService{
    baseUrl:string="http://localhost:8080"
    constructor(private _http:HttpClient){

    }
    
    public getStandardHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
    public adminLogin(loginObj): Observable<any> {
        let header = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let url = this.baseUrl + '/login';
        let body = "username=" + loginObj.username + "&password=" + loginObj.password + "&submit=" + loginObj.submit;
        return this._http.post(url, body, { headers : header });
    }

}