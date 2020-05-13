import { ActivatedRoute } from '@angular/router';
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
  formLoginScreen = 'login';
  securityData:any = [];
  loginAttr = {
    email: "",
    pwd: "",
    error: false
  };
  security =  {
    email: '',
    SecurityQuestionId: 0,
    SecurityAnswer: '',
    mandatory: false
  }
  password = {
    confirm: '',
    new: '',
    mismatch: false,
    error: false,
    server: false
  }
  signupAttr = {
    name: "",
    mob: "",
    email: "",
    org: "",
    loc: "",
    desc: "",
    area: "",
    pwd: "",
    rpwd: "",
    SecurityQuestionId: 0,
    SecurityAnswer: ''
  };
  signUpError = {
    mandate: false,
    mismatchpwd: false,
    errorPresent: false,
    something:false,
    server:false
  };
  constructor(private apiCallService: ApiCallService, public router: Router, private route: ActivatedRoute,
              public local: LocalStorageService, public session: SessionStorageService) {}

  ngOnInit() {
    this.fetchSecurityQuestion();
    this.route.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log('params', params);
        if(params.page == 'signup'){
          this.formView = 'signup';
        } else {
          this.formView = 'login';
        }
      });
  }

  login(message: string, action: string) {
    // tslint:disable-next-line:no-string-literal
    const url = 'http://www.kolhapuritians.com/api/UserLogin?uName='+ this.loginAttr['email'] + 
    // tslint:disable-next-line:no-string-literal
    '&password=' + this.loginAttr['pwd'];
    this.apiCallService.callGetApi(url).subscribe(data => {
      if(data["ReturnResult"]!== 'Fail'){
        this.local.set('token', { isValidUser: 1, UserName: data['ReturnResult']['UserName'] }, 5000, 's');
        this.local.set('admin', { isAdmin: data['IsAdmin'] }, 5000, 's')
        const tempVar = this.local.get('redirectTo');
        if(tempVar != undefined && tempVar != null && 
          tempVar.url !== "/login"){
          const temp = this.local.get('redirectTo');
          this.local.remove('redirectTo');
          this.router.navigate([temp.url])
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
      this.signupAttr.rpwd == '' || 
      this.signupAttr.SecurityQuestionId == 0 ||
      this.signupAttr.SecurityAnswer == ''

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
        ApprovalStatus: false,
        SecurityQuestionId: this.signupAttr.SecurityQuestionId,
        SecurityAnswer: this.signupAttr.SecurityAnswer
      };
      this.apiCallService.callPostApi(url, param).subscribe(data => {
        this.signupAttr = {
          name: '',
          mob: '',
          email: '',
          org: '',
          loc: '',
          desc: '',
          area: '',
          pwd: '',
          rpwd: '',
          SecurityQuestionId: 0,
          SecurityAnswer: ''
        };
        this.formView = 'login';
        this.router.navigate(['/home']);
      }, error => {
        this.signUpError.something = true;
        this.signUpError.errorPresent = true;
      });

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

  fetchSecurityQuestion(){
    const url = 'http://kolhapuritians.com/api/security'
    this.apiCallService.callGetApi(url).subscribe(data => {
      this.securityData = data;
    })
  }
  backToLogin() {
    this.formLoginScreen = 'login';
    this.security.email = '';
    this.security.SecurityAnswer = '';
    this.security.SecurityQuestionId = 0;
  }

  resetPassword() {
    if(this.security.email == '' || this.security.SecurityQuestionId == 0 || this.security.SecurityAnswer == ''){
      this.security.mandatory = true;
    } else {
      const url = 'http://kolhapuritians.com/api/security';
      const obj = {
        Email: this.security.email,
        SecurityQuestionId: this.security.SecurityQuestionId,
        Operation: 'IS_QUE_VALID',
        SecurityAnswer: this.security.SecurityAnswer
      };
      this.apiCallService.callPostApi(url, obj).subscribe(data => {
        if(data){
        //  this.security.email = '';
          this.security.SecurityAnswer = '';
          this.security.SecurityQuestionId = 0;
          this.formLoginScreen = 'resetPassword';
        }
      }, error => {
        
      })
   //   this.formLoginScreen = 'resetPassword';
    }
  }
  confirmPassword() {
    this.password.error = false;
    this.password.mismatch = false;
    this.password.server = false;
    if(this.password.confirm !== this.password.new){
      this.password.error = true;
      this.password.mismatch = true;
    } else {
      const url = 'http://kolhapuritians.com/api/security';
      const obj = {
        Email: this.security.email,
        Password: this.password.confirm,
        Operation: 'CHANGE_PWD'
      };

      this.apiCallService.callPostApi(url, obj).subscribe(data => {
        this.password.new = '';
        this.password.confirm = '',
        this.password.error = false;
        this.password.server = false;
        this.formLoginScreen = 'login';
      }, error => {
        this.password.server = true;
      })
    }
  }
}
