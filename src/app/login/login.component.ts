import { Component, OnInit } from '@angular/core';
import {FormBuilder ,FormGroup,FormControl} from '@angular/forms'
import { formControlBinding } from '../../../node_modules/@angular/forms/src/directives/ng_model';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  geolocationPosition:any;
  private originallatitude: any = 18.574540799999998;
  private originallongitude: any = 73.777152;
  private currentlatitude;
  private currentlongitude;

  constructor(private _formBuilder : FormBuilder,
  private _restService : RestService) {
    this.loginForm = this._formBuilder.group({
      username : [''],
      password : ['']
    })
   }

  ngOnInit() {
    
  }
  login(){
    this.checkLocation();
    let dist;
    if(this.geolocationPosition){
      dist = this.distance(this.currentlatitude,this.currentlongitude,
      this.originallatitude,this.originallongitude,"k");
      console.log(dist);
    }
    if(!dist && dist<400){
    let obj={
      username :this.loginForm.get('username'),
      password :this.loginForm.get('password'),
      submit : 'Login'
    }
    this._restService.adminLogin(obj)
    .subscribe(res=>{
      if(res)
      alert("loggedIn")
      else
      alert('failed')
    })
    }
  }
  checkLocation(){
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.geolocationPosition = position,
                  console.log(position)
                  this.currentlatitude=position.coords.latitude;
                  this.currentlongitude=position.coords.longitude;
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };
  }
  distance(lat1, lon1, lat2, lon2, unit):any {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }
}
