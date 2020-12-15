import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthorizeService } from 'src/app/services/authorization/authorize.service';

export interface PeriodicElement {
  loginid: number;
  fullname: string;
  emailid: string;
  notificationemail: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { loginid: 1, fullname: 'NTQR 2.0', emailid: 'ntqr@colt.net', notificationemail: 'ntqr@colt.net' }
];

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})


export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'loginid', 'fullname', 'emailid', 'notificationemail'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatSort) sort: MatSort;

  public show_errors: boolean = false;
  public user_list = [];
  public userId: any;

  add_user_form = new FormGroup({
    login_id: new FormControl({ value: "", disabled: false }, [Validators.required]),
    full_name: new FormControl({ value: "", disabled: false }, [Validators.required]),
    email_id: new FormControl({ value: "", disabled: false }, [Validators.required]),
    password: new FormControl({ value: "", disabled: false }, [Validators.required]),
    re_pass: new FormControl({ value: "", disabled: false }, [Validators.required]),
  });
  filterTypeSettings: IDropdownSettings = {};
  constructor(private titleService: Title, private modalService: NgbModal, private global: GlobalService, private api: AuthorizeService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Manage Users');
    // this.dataSource.sort = this.sort;
    this.filterTypeSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'name',
      idField: 'name',
    }
  }

  applyFilter() { }
  onClickdwnldcsv() { }
  on_user_select(ev) { }
  on_user_deselect(ev) { }
  add_user() {
    if (this.add_user_form.valid) {
      let add_user_form_value = this.add_user_form.value;
      this.global.show_loader();
      this.global.hide_loader();
      let mess = "The <span class='color-red'>User</span> has been added successfully";
      let modal_obj = {
        title: '<span>User </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };
      this.global.open_alert_message(modal_obj);
    } else {
      this.show_errors = true;
    }
  }
  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
  }

}
