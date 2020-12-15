import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceKeyService } from 'src/app/services/ngin/service-key.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-service-key',
  templateUrl: './view-service-key.component.html',
  styleUrls: ['./view-service-key.component.scss']
})
export class ViewServiceKeyComponentV20 implements OnInit {
  countryId: string;
  range: string;
  key: string;
  type: string;
  countryName: any;

  constructor(private aRoute: ActivatedRoute, private ServiceKeyService: ServiceKeyService, private route: Router, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 View Service Key'); 
    this.countryId = this.aRoute.snapshot.paramMap.get('countryId');
    this.view_data();
  }

  view_data() {
    this.global.show_loader();
    this.ServiceKeyService.viewServiceKey(this.countryId).subscribe((results) => {
      this.type = results.responseResult.result.serviceTypeDesc;
      this.countryName = results.responseResult.result.countryName;
      this.key = results.responseResult.result.serviceKeyDesc;
      this.range = results.responseResult.result.numberRanges;
      this.global.hide_loader();
    })
  }

  onDelete() {
    this.global.show_loader();
    this.ServiceKeyService.removeServiceKey(this.countryId).subscribe((results) => {
      this.global.hide_loader();
      let mess = "The <span>Service Key</span> has been removed successfully";
      let modal_obj = {
        title: '<span>Service Keys </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);
      this.route.navigate(['/ngin20/serviceKeys']);
    })
  }

  onEdit() {
    this.route.navigateByUrl('/ngin20/updateServiceKey/'+ this.countryId);
  }

  onCancel() {
    this.route.navigateByUrl('/ngin20/serviceKeys');
  }

}
