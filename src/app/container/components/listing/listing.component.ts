import { ApiCallService } from './../../../core/api-call.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

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
  constructor(private modalService: BsModalService, private apiCallService: ApiCallService, private _snackBar: MatSnackBar) { }

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
    }, error => {
      this.openSnackBar('Something went wrong!', 'OK');
    })
  }
  saveData() {
    const obj = {
      name: this.newContact['name'],
      companyName: this.newContact['companyName'],
      phoneNumber: this.newContact['phoneNumber'],
      emailId:this.newContact['emailId']  
    }
    const url = 'http://www.kolhapuritians.com/api/references';
    this.apiCallService.callPostApi(url, obj).subscribe(data => {
      this.modalRef.hide();
      this.getReferanceList();
      this.openSnackBar('Referance Added Successfully!', 'OK');
    }, error => {
      this.openSnackBar('Something went wrong!', 'OK');
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
