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
  selectedItem:any = {};
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
  base64textString = [];
  constructor(private apiCallService: ApiCallService, private modalService: BsModalService) { }

  ngOnInit() {
    this.fetchPosting();
  }

  
  onUploadChange(evt: any) {
    const file = evt.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.base64textString.push(btoa(e.target.result));
  }
  fetchPosting() {
   this.apiCallService.getPostings().subscribe(data => {
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

  saveDetails() {
    const url = 'http://www.kolhapuritians.com/api/values';
    let obj = {};
    if(this.inputObj['type'] == 'upload'){
      obj = { 
        "JobTitle": this.inputObj.JobTitle,
      "Description":'',
      "Experince":'',
      "Criteria":'',
      "CompanyName":'',
      "JobLocation":'',
      "ContactDetails":'',
      "PostImage": this.base64textString[0]
    };
    }else {
      obj = { 
        "JobTitle": this.inputObj.JobTitle,
      "Description":this.inputObj.Description,
      "Experince":this.inputObj.Experience,
      "Criteria":this.inputObj.Criteria,
      "CompanyName":this.inputObj.CompanyName,
      "JobLocation":this.inputObj.JobLocation,
      "ContactDetails":this.inputObj.ContactDetails,
      "PostImage": ''
    };
    }
    
    this.apiCallService.callPostApi(url, obj).subscribe(data => {
      this.modalRef.hide();
      this.fetchPosting();
    })
  }
}
