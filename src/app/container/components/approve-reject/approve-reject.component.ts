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
    this.getRecords();
  }
  getRecords() {
    const url = 'http://www.kolhapuritians.com/api/register/1';
    this.apiCallService.callGetApi(url).subscribe(data => {
      console.log('data', data)
      this.tableData = data;
    })
  }
}
