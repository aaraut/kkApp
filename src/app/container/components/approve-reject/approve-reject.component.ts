import { MatSnackBar } from '@angular/material';
import { ApiCallService } from './../../../core/api-call.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.scss']
})
export class ApproveRejectComponent implements OnInit {
  tableData: any = [];
  allTableData = [];
  isActive = 'p';
  constructor(private apiCallService: ApiCallService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPendingRecords();
    
  }
  getPendingRecords() {
    const url = 'http://www.kolhapuritians.com/api/register?value=P';
    this.apiCallService.callGetApi(url).subscribe(data => {
      this.tableData = data;
      // this.getApprovedRecords();
      // this.getRejectedRecords();
    }, error => {
      this.openSnackBar('Something went wrong!', 'OK');
    })
  }
  getApprovedRecords() {
    const url = 'http://www.kolhapuritians.com/api/register?value=A';
    this.apiCallService.callGetApi(url).subscribe(data => {
      const tempdata:any = data;
      if(tempdata.length > 0){
        tempdata.map(item => {
          this.allTableData.push(item)
        })
      }
    }, error => {
      this.openSnackBar('Something went wrong!', 'OK');
    })
  }

  getRejectedRecords(){
    const url = 'http://www.kolhapuritians.com/api/register?value=R';
    this.apiCallService.callGetApi(url).subscribe(data => {
      const tempdata:any = data;
      if(tempdata.length > 0){
        tempdata.map(item => {
          this.allTableData.push(item)
        })
      }
    }, error => {
      this.openSnackBar('Something went wrong!', 'OK');
    })
  }

  approve(id) {
    const url = 'http://www.kolhapuritians.com/api/register';
    const obj = this.tableData.filter(item =>  {
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
      ApprovalStatus: 'A',
      IsAdmin: obj[0].IsAdmin
    };
    this.apiCallService.callPutApi(url, param).subscribe(data => {
      this.getPendingRecords();
      this.openSnackBar('User Approved Successfully', 'OK');
    }, error => {
      this.openSnackBar('Something went wrong!', 'OK');
    })
  }
  reject(id){
    const url = 'http://www.kolhapuritians.com/api/register';
    const obj = this.tableData.filter(item =>  {
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
      ApprovalStatus: 'R'
    };
    this.apiCallService.callPutApi(url, param).subscribe(data => {
      this.getPendingRecords();
      this.openSnackBar('User Rejected Successfully', 'OK');
    }, error => {
      this.openSnackBar('Something went wrong!', 'OK');
    })
  }
  itemClicked(state){
    console.log('state', state)
    this.isActive = state;
    this.allTableData = [];
    this.tableData = [];

    if(state == 'p'){
      this.getPendingRecords();
    } else {
      this.getApprovedRecords();
      this.getRejectedRecords();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
