import { MatSnackBar } from "@angular/material";
import { ApiCallService } from "./../../../core/api-call.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-approve-reject",
  templateUrl: "./approve-reject.component.html",
  styleUrls: ["./approve-reject.component.scss"]
})
export class ApproveRejectComponent implements OnInit {
  tableData: any = [];
  allTableData = [];
  constructor(
    private apiCallService: ApiCallService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getStatus();
    
  }

  getStatus() {
    const url1 = "http://www.kolhapuritians.com/api/register?value=P";
    const url2 = "http://www.kolhapuritians.com/api/register?value=A";
    const url3 = "http://www.kolhapuritians.com/api/register?value=R";
    this.allTableData=[];
    forkJoin(
      this.apiCallService.callGetApi(url1),
      this.apiCallService.callGetApi(url2),
      this.apiCallService.callGetApi(url3)
    ).subscribe(response => {
      const fobj: any = response[0];
      const fobj1: any = response[1];
      const fobj2: any = response[2];
      if (fobj.length > 0) {
        fobj.map(item => {
          this.allTableData.push(item);
        });
      }
      if (fobj1.length > 0) {
        fobj1.map(item => {
          this.allTableData.push(item);
        });
      }
      if (fobj2.length > 0) {
        fobj2.map(item => {
          this.allTableData.push(item);
        });
      }
    });
  }

  approve(id) {
    const url = "http://www.kolhapuritians.com/api/register";
    const obj = this.allTableData.filter(item => {
      return item.ID == id;
    });
    const param = {
      Name: obj[0].Name,
      Email: obj[0].Email,
      MobileNumber: obj[0].MobileNumber,
      JobPost: obj[0].JobPost,
      Location: obj[0].Location,
      TechnicalSkill: obj[0].TechnicalSkill,
      Organisation: obj[0].Organisation,
      Password: obj[0].Password,
      ApprovalStatus: "A",
      IsAdmin: obj[0].IsAdmin,
      Operation:"PUT",
      RegistrationId:obj[0].ID
    };
    this.apiCallService.callPostApi(url, param).subscribe(
      data => {
        this.getStatus();
        this.openSnackBar("User Approved Successfully", "OK");
      },
      error => {
        this.openSnackBar("Something went wrong!", "OK");
      }
    );
  }
  reject(id) {
    const url = "http://www.kolhapuritians.com/api/register";
    const obj = this.allTableData.filter(item => {
      return item.ID == id;
    });
    const param = {
      Name: obj[0].Name,
      Email: obj[0].Email,
      MobileNumber: obj[0].MobileNumber,
      JobPost: obj[0].JobPost,
      Location: obj[0].Location,
      TechnicalSkill: obj[0].TechnicalSkill,
      Organisation: obj[0].Organisation,
      Password: obj[0].Password,
      ApprovalStatus: "R",
      Operation:"PUT",
      RegistrationId:obj[0].ID
    };
    this.apiCallService.callPostApi(url, param).subscribe(
      data => {
        this.getStatus();
        this.openSnackBar("User Rejected Successfully", "OK");
      },
      error => {
        this.openSnackBar("Something went wrong!", "OK");
      }
    );
  }
  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
  isDisabled(item){
    return item['ApprovalStatus'] == 'P' ? false : true;
  }
}
