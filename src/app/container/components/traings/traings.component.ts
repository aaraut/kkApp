import { ApiCallService } from './../../../core/api-call.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traings',
  templateUrl: './traings.component.html',
  styleUrls: ['./traings.component.scss']
})
export class TraingsComponent implements OnInit {

  constructor(private modalService: BsModalService, private apiCallService: ApiCallService) { }
  list:any =[];
  ngOnInit() {
    this.getAllList();
  }
  getAllList(){
    const url = 'http://kolhapuritians.com/api/training';
    this.apiCallService.callGetApi(url).subscribe(data => {
      console.log('trainings', data)
      this.list= data;
    })
  }
}
