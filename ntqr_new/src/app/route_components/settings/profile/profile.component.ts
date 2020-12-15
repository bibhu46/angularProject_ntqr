import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { AuthorizeService } from 'src/app/services/authorization/authorize.service';
import { GlobalService } from 'src/app/services/global-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  show_errors: boolean = false;
  show_errors_profile: boolean = false;
  userId: any;

  profile_form = new FormGroup({
    login_id: new FormControl({ value: "", disabled: false }, [Validators.required]),
    full_Name: new FormControl({ value: "", disabled: false }, [Validators.required]),
    email_id: new FormControl({ value: "", disabled: false }, [Validators.required]),
    notification_id: new FormControl({ value: "", disabled: false }, [Validators.required]),
  });


  change_password_form = new FormGroup({
    new_pass: new FormControl({ value: "", disabled: false }, [Validators.required]),
    retype_pass: new FormControl({ value: "", disabled: false }, [Validators.required]),
    current_pass: new FormControl({ value: "", disabled: false }, [Validators.required]),

  });

  get profile_form_controls() { return this.profile_form.controls; }
  get change_password_form_controls() { return this.change_password_form.controls; }

  constructor(private modalService: NgbModal, private titleService: Title, private api: AuthorizeService, private global: GlobalService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Manage Profile');
    this.getUser();
  }

  getUser() {
    this.global.show_loader();
    this.api.getUser().subscribe((results) => {
      this.userId = results.responseResult.result.id;
      this.profile_form.patchValue({
        login_id: results.responseResult.result.username,
        full_Name: results.responseResult.result.fullname,
        email_id: results.responseResult.result.email,
        notification_id: results.responseResult.result.email
      });
      this.global.hide_loader();
    })
  }

  profile_form_submit() {
    if (this.profile_form.valid) {
      let profile_form_value = this.profile_form.value;
      let obj = {
        "email": profile_form_value.email_id,
        "fullname": profile_form_value.full_Name,
        "id": this.userId,
        "oldUsername": profile_form_value.login_id,
        "username": profile_form_value.login_id
      }
      this.global.show_loader();
      this.api.updateUser(obj).subscribe((results) => {
        this.global.hide_loader();
        if (results.isError) {
          let modal_obj = {
            title: "<span class='color-red'>Error </span>",
            size: "sm",
            color: "green",
            auto_close: false,
            content: '<p class="text-center my-3 color-red">' + results.message + '</p>'
          };
          this.global.open_alert_message(modal_obj);
        } else {
          let mess = "The <span class='color-red'>User Profile</span> has been updated successfully";
          let modal_obj = {
            title: '<span>User Profile </span> Status',
            size: "sm",
            color: "green",
            auto_close: false,
            content: '<p class="text-center my-3">' + mess + '</p>'
          };
          this.global.open_alert_message(modal_obj);
        }
        this.getUser();
      });
    } else {
      this.show_errors_profile = true;
    }
  }

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });

    // this.editProfileForm.patchValue({
    //  firstname: user.firstname,
    //  lastname: user.lastname,
    //  username: user.username,
    //  email: user.email
    // });
  }



  changePassword() {
    if (this.change_password_form.valid) {
      let change_password_form_value = this.change_password_form.value;
    }
    else {
      this.show_errors = true;
    }
  }

}
