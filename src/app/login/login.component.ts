import { Component, OnInit } from '@angular/core';
import {FormBuilder ,FormGroup,FormControl} from '@angular/forms'
import { formControlBinding } from '../../../node_modules/@angular/forms/src/directives/ng_model';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
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
    let obj={
      username :this.loginForm.get('username').value,
      password :this.loginForm.get('password').value,
      submit : 'Login'
    }
    this._restService.adminLogin(obj)
    .subscribe(res=>{
      if(res)
      alert("loggedIn")
      else
      alert('failed')
    },error=>{
      alert("failed")
    }
  )

  }
}