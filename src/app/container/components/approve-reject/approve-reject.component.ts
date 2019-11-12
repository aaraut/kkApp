import { ApiCallService } from './../../../core/api-call.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.scss']
})
export class ApproveRejectComponent implements OnInit {
  tableData: any = [];
  constructor(private apiCallService: ApiCallService) { }

  ngOnInit() {
    this.getPendingRecords();
    
  }
  getPendingRecords() {
    const url = 'http://www.kolhapuritians.com/api/register?value=0';
    this.apiCallService.callGetApi(url).subscribe(data => {
      this.tableData = data;
      this.getApprovedRecords();
    })
  }
  getApprovedRecords() {
    const url = 'http://www.kolhapuritians.com/api/register?value=1';
    this.apiCallService.callGetApi(url).subscribe(data => {
      const tempdata:any = data;
      if(tempdata.length > 0){
        tempdata.map(item => {
          this.tableData.push(item)
        })
      }
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
      ApprovalStatus: 1
    };
    this.apiCallService.callPutApi(url, param).subscribe(data => {
      this.getPendingRecords();
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
      ApprovalStatus: 2
    };
    this.apiCallService.callPutApi(url, param).subscribe(data => {
      this.getPendingRecords();
    })
  }
}
