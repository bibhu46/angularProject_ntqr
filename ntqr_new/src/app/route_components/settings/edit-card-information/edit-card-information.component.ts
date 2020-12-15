import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsService } from 'src/app/services/options.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-card-information',
  templateUrl: './edit-card-information.component.html',
  styleUrls: ['./edit-card-information.component.scss']
})
export class EditCardInformationComponent implements OnInit {
  callPerSecond: any;
  description: any;
  peakCallAttempts: any;
  deviceName: any;
  id: any;
  type: any;
  deviceDescription: any;
  ip: any;
  deviceId: string;
  shelf: string;
  slot: string;
  userPermission: boolean;
  name: any;
  activeCallCounts: any;
  callAttempts: any;
  callCompletion: any;
  deviceNameOnCard: any;

  constructor(private OptionsService: OptionsService, private aRoute: ActivatedRoute, private router: Router, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Edit Card Information');
    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    }

    this.deviceId = this.aRoute.snapshot.paramMap.get('deviceId');
    this.shelf = this.aRoute.snapshot.paramMap.get('shelf');
    this.slot = this.aRoute.snapshot.paramMap.get('slot');
    this.view_data(this.deviceId, this.shelf, this.slot);
  }
  view_data(deviceId, shelf, slot) {
    this.OptionsService.getCardInfoEdit(deviceId, shelf, slot).subscribe((results) => {
      this.id = results.responseResult.result.cardInfo.id;
      this.shelf = results.responseResult.result.cardInfo.shelf;
      this.slot = results.responseResult.result.cardInfo.slot;
      this.name = results.responseResult.result.cardInfo.name;
      this.activeCallCounts = results.responseResult.result.cardInfo.activeCallCounts;
      this.callAttempts = results.responseResult.result.cardInfo.callAttempts;
      this.callCompletion = results.responseResult.result.cardInfo.callCompletion;
      this.callPerSecond = results.responseResult.result.cardInfo.callPerSecond;
      this.description = results.responseResult.result.cardInfo.description;
      this.peakCallAttempts = results.responseResult.result.cardInfo.peakCallAttempts;
      this.deviceName = results.responseResult.result.cardInfo.device.name;
      this.deviceNameOnCard = this.deviceName;
      this.deviceId = results.responseResult.result.cardInfo.device.id;
      this.ip = results.responseResult.result.cardInfo.device.ip;
      this.deviceDescription = results.responseResult.result.cardInfo.device.descr;
      this.type = results.responseResult.result.cardInfo.device.deviceType.type;

    })
  }
  Submit(value) {
    let submit_obj =
    {
      "cardInfo": {
        "id": this.id,
        "device": {
          "id": this.deviceId,
          "descr": this.deviceDescription,
          "ip": this.ip,
          "name": this.deviceNameOnCard,
          "deviceType": {
            "type": this.type
          }
        },
        "shelf": this.shelf,
        "slot": this.slot,
        "name": value.name,
        "description": value.description,
        "callPerSecond": value.callPerSecond,
        "activeCallCounts": value.activeCallCounts,
        "callCompletion": value.callCompletion,
        "callAttempts": value.callAttempts,
        "peakCallAttempts": value.peakCallAttempts,
      }
    }
    this.global.show_loader();
    this.OptionsService.updateCardInfo(submit_obj).subscribe((results) => {
      this.global.hide_loader();
      let mess = "The <span class='color-red'>Card Information</span> has been edited successfully";
      let modal_obj = {
        title: '<span>Card Information </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };
      this.global.open_alert_message(modal_obj);
    });
    this.router.navigate(['/options/sonusThreshold']);
  }

  cancel() {
    this.router.navigate(['/options/sonusThreshold']);
  }
}
