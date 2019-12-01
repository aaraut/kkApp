import { ApiCallService } from './../../../core/api-call.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  query = '';
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  modalRef: BsModalRef;
  newContact = {
    name: '',
    companyName: '',
    phoneNumber: '',
    emailId:''    
  }
  listItems:any = []
  constructor(private modalService: BsModalService, private apiCallService: ApiCallService) { }

  ngOnInit() {
    this.getReferanceList();
  }

  addNewContact(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
  }

  getReferanceList() {
    const url = 'http://kolhapuritians.com/api/references';
    this.apiCallService.callGetApi(url).subscribe(data => {
      console.log('data', data);
      this.listItems = data;
    })
  }

}
