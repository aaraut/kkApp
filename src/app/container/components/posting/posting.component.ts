import { LocalStorageService } from 'angular-web-storage';
import { ApiCallService } from "./../../../core/api-call.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { MatSnackBar } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-posting",
  templateUrl: "./posting.component.html",
  styleUrls: ["./posting.component.scss"]
})
export class PostingComponent implements OnInit {
  postDetails: any = [];

  modalRef: BsModalRef;
  imageModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  selectedItem: any = {};
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  inputObj = {
    JobTitle: "",
    CompanyName: "",
    JobLocation: "",
    Experience: "",
    Criteria: "",
    Description: "",
    ContactDetails: "",
    CreatedDate: "",
    PostImage: "",
    type: "upload"
  };
  base64textString = [];
  jobItemToDelete = {};
  constructor(
    private apiCallService: ApiCallService,
    private _sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private _snackBar: MatSnackBar,
    public local: LocalStorageService,
  ) {}

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
    this.apiCallService.getPostings().subscribe(
      data => {
        this.postDetails = data;

        this.postDetails.map(elem => {
          const tempItem = elem;
          elem["displayImg"] = this.getNewImagePath(tempItem);
        });
      },
      error => {
        this.openSnackBar("Something went wrong!", "OK");
      }
    );
  }

  getJobTitle(item) {
    if (item.length > 50) {
      return item.substring(0, 50) + "...";
    }
    return item;
  }
  addNewPost(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, this.config);
  // }
  getImagePath(item) {
    return "data:image/gif;base64," + item.PostImage;
  }

  getNewImagePath(item) {
    if (item.PostImage) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(item.PostImage);
    }
    const num = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    const imgName = "icon" + num + ".jpg";

    return "/assets/img/v2/" + imgName;
  }
  showPopUp(template, item) {
    this.selectedItem = item;
    this.imageModalRef = this.modalService.show(template, this.config);
  }
  getSelectedImage() {
    return this.selectedItem["PostImage"];
  }

  saveDetails() {
    const url = "http://www.kolhapuritians.com/api/jobposting";
    let obj = {};
    if (this.inputObj["type"] == "upload") {
      obj = {
        JobTitle: this.inputObj.JobTitle,
        Description: "",
        Experince: "",
        Criteria: "",
        CompanyName: "",
        JobLocation: "",
        ContactDetails: "",
        PostImage: this.base64textString[0]
      };
    } else {
      obj = {
        JobTitle: this.inputObj.JobTitle,
        Description: this.inputObj.Description,
        Experince: this.inputObj.Experience,
        Criteria: this.inputObj.Criteria,
        CompanyName: this.inputObj.CompanyName,
        JobLocation: this.inputObj.JobLocation,
        ContactDetails: this.inputObj.ContactDetails,
        PostImage: ""
      };
    }

    this.apiCallService.callPostApi(url, obj).subscribe(
      data => {
        this.modalRef.hide();
        this.fetchPosting();
        this.inputObj = {
          JobTitle: "",
          CompanyName: "",
          JobLocation: "",
          Experience: "",
          Criteria: "",
          Description: "",
          ContactDetails: "",
          CreatedDate: "",
          PostImage: "",
          type: "upload"
        };
        this.base64textString = [];
        this.openSnackBar("Job Post Added Successfully!", "OK");
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

  deletePost(template: TemplateRef<any>, item) {
    this.jobItemToDelete = item;
    this.deleteModalRef = this.modalService.show(template, this.config);
  }
  deleteJobPost() {
    const obj = {
      Operation: 'DELETE',
      Id: this.jobItemToDelete['ID']
    };
    const url = "http://www.kolhapuritians.com/api/jobposting";
    this.apiCallService.callPostApi(url, obj).subscribe(data => {
      if(data['ResultType'] !=='Fail'){
        this.jobItemToDelete = {};
        this.openSnackBar("Job Post Deleted Successfully!", "OK");
        this.deleteModalRef.hide();
        this.fetchPosting();
      } else {
        this.openSnackBar("Something went wrong!", "OK");
      }
      
    },
    error => {
      this.deleteModalRef.hide();
      this.openSnackBar("Something went wrong!", "OK");
    })
  }

  checkIfUserIsAdmin() {
    if (this.local.get("admin") != undefined) {
      return true;
    }
    return false;
  }
}
