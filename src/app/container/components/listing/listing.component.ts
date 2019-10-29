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
  listItems = [
    {
      name: 'Alekh Raut',
      companyName: 'Lorem Ipsum Pvt Ltd',
      phoneNumber: '91234567890',
      emailId:'abc@outlook.com'
    },
    {
      name: 'Zin Zing',
      companyName: 'Lorem Ipsum Pvt Ltd',
      phoneNumber: '91234567890',
      emailId:'abc@outlook.com'
    }
  ]
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  addNewContact(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
  }

}
