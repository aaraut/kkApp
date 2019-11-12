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
    something:false
  };
  constructor(private apiCallService: ApiCallService) {}

  ngOnInit() {}

  login(message: string, action: string) {
    this.loginAttr.error = true;
  }

  signup() {
    this.signUpError = {
      mandate: false,
      mismatchpwd: false,
      errorPresent: false,
      something:false
    };
    Object.keys(this.signupAttr).map(
      k => (this.signupAttr[k] = this.signupAttr[k].trim())
    );
    if (this.signupAttr.name == "" ||
      this.signupAttr.mob == "" ||
      this.signupAttr.email == "" ||
      this.signupAttr.org == "" ||
      this.signupAttr.pwd == "" ||
      this.signupAttr.rpwd == ""
    ) {
      this.signUpError.mandate = true;
      this.signUpError.errorPresent = true;
    } else if(this.signupAttr.pwd !== this.signupAttr.rpwd){
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
        this.formView = "login";
      }, error => {
        this.signUpError.something = true;
        this.signUpError.errorPresent = true;
      })
      console.log('success')

    }
  }
  resetFlag() {
    this.signUpError = {
      mandate: false,
      mismatchpwd: false,
      errorPresent: false,
      something: false
    };
  }
}
