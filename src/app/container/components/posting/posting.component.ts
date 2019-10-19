import { ApiCallService } from './../../../core/api-call.service';
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})
export class PostingComponent implements OnInit {
  postDetails:any = [];
  modalRef: BsModalRef;
  imageModalRef: BsModalRef;
  selectedItem = {};
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  inputObj = {
    JobTitle: '',
    CompanyName: '',
    JobLocation: '',
    Experience: '',
    Criteria: '',
    Description: '',
    ContactDetails: '',
    CreatedDate: '',
    PostImage: '',
  }
  constructor(private apiCallService: ApiCallService, private modalService: BsModalService) { }

  ngOnInit() {
    this.fetchPosting();
  }
  fetchPosting() {
   this.apiCallService.getPostings().subscribe(data => {
     console.log('Data', data)
     this.postDetails = data;
   })
  }
  addNewPost(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  getImagePath(item){
    return 'data:image/gif;base64,' + item.PostImage;
  }
  showPopUp(template, item){
    this.selectedItem = item;
    this.imageModalRef = this.modalService.show(template, this.config);

  }
  getSelectedImage() {
    return 'data:image/gif;base64,' + this.selectedItem['PostImage'];
  }
}
