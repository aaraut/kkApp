import { LocalStorageService } from 'angular-web-storage';
import { TemplateRef } from "@angular/core";
import { ApiCallService } from "./../../../core/api-call.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
@Component({
  selector: "app-traings",
  templateUrl: "./traings.component.html",
  styleUrls: ["./traings.component.scss"]
})
export class TraingsComponent implements OnInit {
  modalRef: BsModalRef;
  trainingDetailsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  selectedItem: any = {};
  itemToDelete = {};
  constructor(
    private modalService: BsModalService,
    private apiCallService: ApiCallService,
    private _snackBar: MatSnackBar,
    public local: LocalStorageService,
  ) {}
  list: any = [];
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  newTraining = {
    Subject: "",
    StartDate: "",
    EndDate: "",
    Duration: "",
    Details: "",
    Venue: "",
    Time: ""
  };
  ngOnInit() {
    this.getAllList();
  }
  getAllList() {
    const url = "http://kolhapuritians.com/api/training";
    this.apiCallService.callGetApi(url).subscribe(
      data => {
        console.log("trainings", data);
        this.list = data;
      },
      error => {
        this.openSnackBar("Something went wrong!", "OK");
      }
    );
  }
  addNewTraining(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  saveData() {
    const obj = {
      Subject: this.newTraining["Subject"],
      StartDate: this.newTraining["StartDate"],
      EndDate: this.newTraining["EndDate"],
      Duration: this.newTraining["Duration"],
      Details: this.newTraining["Details"],
      Venue: this.newTraining["Venue"],
      Time: this.newTraining["Time"]
    };
    const url = "http://www.kolhapuritians.com/api/training";
    this.apiCallService.callPostApi(url, obj).subscribe(
      data => {
        this.modalRef.hide();
        this.getAllList();
        this.newTraining = {
          Subject: "",
          StartDate: "",
          EndDate: "",
          Duration: "",
          Details: "",
          Venue: "",
          Time: ""
        };
        this.openSnackBar("Training Added Successfully!", "OK");
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
  getItemDetails(item) {
    if (item.length > 50) {
      return item.substring(0, 50) + "...";
    }
    return item;
  }
  getDate(dte) {
    if (dte.indexOf("T") === -1) {
      return dte;
    }
    const ind = dte.indexOf("T");
    return dte.substring(0, ind);
  }
  showPopUp(template, item) {
    this.selectedItem = item;
    this.trainingDetailsModalRef = this.modalService.show(
      template,
      this.config
    );
  }
  showDeletePopUp(template, item) {
    this.itemToDelete = item;
    this.deleteModalRef = this.modalService.show(template, this.config);
  }
  deleteTraining() {
    const obj = {
      Operation: "DELETE",
      Id: this.itemToDelete["ID"]
    };
    const url = "http://www.kolhapuritians.com/api/training";
    this.apiCallService.callPostApi(url, obj).subscribe(
      data => {
        if (data["ResultType"] !== "Fail") {
          this.itemToDelete = {};
          this.openSnackBar("Training Deleted Successfully!", "OK");
          this.deleteModalRef.hide();
          this.getAllList();
        } else {
          this.openSnackBar("Something went wrong!", "OK");
        }
      },
      error => {
        this.deleteModalRef.hide();
        this.openSnackBar("Something went wrong!", "OK");
      }
    );
  }

  checkIfUserIsAdmin() {
    if (this.local.get("admin") != undefined) {
      return true;
    }
    return false;
  }
}
