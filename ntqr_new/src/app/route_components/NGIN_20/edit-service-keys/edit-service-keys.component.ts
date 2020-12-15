import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceKeyService } from 'src/app/services/ngin/service-key.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-edit-service-keys',
  templateUrl: './edit-service-keys.component.html',
  styleUrls: ['./edit-service-keys.component.css']
})
export class EditServiceKeysComponentV20 implements OnInit {
  countryId: string;
  range: string;
  key: string;
  type: string;
  countryName: any;
  code: any;

  constructor(private ServiceKeyService: ServiceKeyService, private aRoute: ActivatedRoute, private router: Router, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Edit Country Group'); 
    this.countryId = this.aRoute.snapshot.paramMap.get('countryId');
    this.view_data();

  }

  view_data() {
    this.global.show_loader();
    this.ServiceKeyService.editServiceKey(this.countryId).subscribe((results) => {
      this.type = results.responseResult.result.serviceTypeDesc;
      this.countryName = results.responseResult.result.countryName;
      this.code = results.responseResult.result.countryCode;
      this.global.hide_loader();
    })
  }
  onSubmit(value) {
    console.log('submit', value)
    let submit_obj = {
      "countryName": value.countryName,
      "countryCode": value.countryCode
    }
    console.log(submit_obj)
    this.global.show_loader();
    this.ServiceKeyService.editServiceKey(this.countryId).subscribe((results) => {
      this.global.hide_loader();
      let mess = "The <span class='color-red'>Service Key </span> has been updated successfully";
      let modal_obj = {
        title: 'Service <span>Key </span> update',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };
      this.global.open_alert_message(modal_obj);
    })
    this.router.navigate(['/ngin20/serviceKeys']);
  }

  onCancel() {
    console.log('cancel')
    this.router.navigate(['/ngin20/serviceKeys']);
  }
}
