import { Component, OnInit } from '@angular/core';
import { ServiceKey, ServiceKeyFlatNode } from 'src/app/models/interfaces';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global-service.service';
import { ServiceKeyService } from 'src/app/services/ngin/service-key.service';
import { Title } from '@angular/platform-browser'; 


@Component({
  selector: 'app-service-keys',
  templateUrl: './service-keys.component.html',
  styleUrls: ['./service-keys.component.css']
})
export class ServiceKeysComponent implements OnInit {

  serviceTypeList: any;
  country: any;
  numberRange: any;
  serviceKey: any;
  public userPermission: boolean = false;

  constructor(private ServiceKeyService: ServiceKeyService, private route: Router, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 5.2 Service Keys');
    this.get_service_key_list();
    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    }
  }

  get_service_key_list() {
    this.global.show_loader();
    this.ServiceKeyService.getAll().subscribe((results) => {
      this.serviceTypeList = results.responseResult.result.serviceTypeList;
      // this.country = results.responseResult.result.serviceTypeList.countryName;
      // this.numberRange = results.responseResult.result.serviceTypeList.numberRanges;
      //  this.serviceKey = results.responseResult.result.serviceTypeList.serviceKeys;
      console.log(this.serviceTypeList)
      this.global.hide_loader();
    })
  }

  onEdit(event: MouseEvent, countryId: number) {
    this.route.navigateByUrl('ngin5.2/countryGroupEdit/' + countryId);
  }

  onDelete(event: MouseEvent, countryId: number) {
    this.global.show_loader();
     this.ServiceKeyService.removeCountryGroup(countryId).subscribe((results) => {
      this.global.hide_loader();
      this.global.hide_loader();
      let mess = "The <span>Country Group</span> has been removed successfully";
      let modal_obj = {
        title: '<span>Country Group </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);
     })
  }

  add_serviceKey() {
    this.route.navigateByUrl('/ngin5.2/addServiceKey');
  }

  serviceKeyDetails(event: MouseEvent, countryId: number) {
    console.log('called', countryId);
    this.route.navigateByUrl('ngin5.2/viewServiceKey/' + countryId);
  }
  array_toString(arr) {
    return arr.join(', ');
  }
}