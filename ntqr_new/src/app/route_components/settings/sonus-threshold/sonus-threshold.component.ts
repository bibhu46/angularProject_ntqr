import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global-service.service';
import { OptionsService } from 'src/app/services/options.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sonus-threshold',
  templateUrl: './sonus-threshold.component.html',
  styleUrls: ['./sonus-threshold.component.scss']
})
export class SonusThresholdComponent implements OnInit {
  hashDevice: any;
  formattedArray: any;
  public userPermission: boolean = false;

  constructor(private OptionsService: OptionsService, private global: GlobalService, private router: Router,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Card Information');   
    this.get_values();
    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    }     
  }
  get_values() {
    this.global.show_loader();
    this.OptionsService.getCardInfoDetails().subscribe((results) => {
      //console.log(results);
      this.hashDevice = results.responseResult.result.hashDevice;
      this.formattedArray = this.formatData(this.hashDevice);
      this.global.hide_loader();
    })
  }

  formatData(arr) {
    let result_array = [];
    let temp_obj = {};
    for (const [key, value] of Object.entries(arr)) {
      temp_obj['device_name'] = key;
      temp_obj['devices'] = value;
      result_array.push(temp_obj);
      temp_obj={};
    }
    return result_array;
  }

  editData(deviceId,shelf,slot){    
    let url = "/editCard/" + deviceId + "/" + shelf + "/" + slot;
    this.router.navigateByUrl(url);
    }
}
