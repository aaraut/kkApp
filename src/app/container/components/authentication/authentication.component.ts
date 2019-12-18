import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { LocalStorageService } from 'angular-web-storage';
import { ApiCallService } from './../../../core/api-call.service';
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"]
})
export class AuthenticationComponent implements OnInit {
  formView = "login";
  loginAttr = {
    email: "",
    pwd: "",
    error: false
  };
  signupAttr = {
    name: "",
    mob: "",
    email: "",
    org: "",
    loc: "",
    desc: "",
    area: "",
    pwd: "",
    rpwd: ""
  };
  signUpError = {
    mandate: false,
    mismatchpwd: false,
    errorPresent: false,
    something:false,
    server:false
  };
  constructor(private apiCallService: ApiCallService, public router: Router,
              public local: LocalStorageService, public session: SessionStorageService) {}

  ngOnInit() {}

  login(message: string, action: string) {
    // tslint:disable-next-line:no-string-literal
    const url = 'http://www.kolhapuritians.com/api/UserLogin?uName='+ this.loginAttr['email'] + 
    // tslint:disable-next-line:no-string-literal
    '&password=' + this.loginAttr['pwd'];
    this.apiCallService.callGetApi(url).subscribe(data => {
      console.log('data', data);
      if(data["ReturnResult"]!== 'fail'){
        this.local.set('token', { isValidUser: 1 }, 1000, 's');
        console.log('dsdsdsd',this.local.get('redirectTo'))
        this.local.set('admin', { isAdmin: data['IsAdmin'] }, 1000, 's')
        const tempVar = this.local.get('redirectTo');
        console.log('tempVar', tempVar)
        if(tempVar != undefined && tempVar != null && 
          tempVar.url !== "/login"){
          const temp = this.local.get('redirectTo');
          this.local.remove('redirectTo');
          this.router.navigate([temp.url])
          console.log(this.local.get('redirectTo'), 'dsds')
        } else {
          this.router.navigate(['/home'])
        }
      } else {
        this.local.remove('token');
        this.local.remove('admin');
        this.loginAttr.error = true;
      }
    }, error => {
      this.loginAttr.error = true;
    })
   // 
  }

  signup() {
    if(this.signupAttr.email!= ''){
      const tempUrl = 'http://www.kolhapuritians.com/api/Register?value=valid&emailId=' + this.signupAttr.email;
      this.apiCallService.callGetApi(tempUrl).subscribe(data => {
        console.log('success', data)
        if(data['ReturnResult'] == 'Success'){
          this.callRegisterApi();
        }
      }, error => {
        this.signUpError.server = true;
      })
    }
    
  }

  callRegisterApi() {
    this.signUpError = {
      mandate: false,
      mismatchpwd: false,
      errorPresent: false,
      something:false,
      server: false
    };
    Object.keys(this.signupAttr).map(
      k => (this.signupAttr[k] = this.signupAttr[k].trim())
    );
    if (this.signupAttr.name == "" ||
      this.signupAttr.mob == "" ||
      this.signupAttr.email == "" ||
      this.signupAttr.org == "" ||
      this.signupAttr.pwd == "" ||
      this.signupAttr.rpwd == ''
    ) {
      this.signUpError.mandate = true;
      this.signUpError.errorPresent = true;
    } else if(this.signupAttr.pwd !== this.signupAttr.rpwd) {
      this.signUpError.mismatchpwd = true;
      this.signUpError.errorPresent = true;
    } else {
      const url = 'http://www.kolhapuritians.com/api/register';
      const param = {
        Name: this.signupAttr.name,
        Email: this.signupAttr.email,
        MobileNumber: this.signupAttr.mob,
        JobPost: this.signupAttr.desc,
        Location: this.signupAttr.loc,
        TechnicalSkill: this.signupAttr.area,
        Organisation: this.signupAttr.org,
        Password: this.signupAttr.pwd,
        ApprovalStatus: false
      };
      this.apiCallService.callPostApi(url, param).subscribe(data => {
        console.log('user registered');
        this.signupAttr = {
          name: '',
          mob: '',
          email: '',
          org: '',
          loc: '',
          desc: '',
          area: '',
          pwd: '',
          rpwd: ''
        };
        this.formView = 'login';
        this.router.navigate(['/home']);
      }, error => {
        this.signUpError.something = true;
        this.signUpError.errorPresent = true;
      });
      console.log('success');

    }
  }
  resetFlag() {
    this.signUpError = {
      mandate: false,
      mismatchpwd: false,
      errorPresent: false,
      something: false,
      server:false
    };
  }
}
