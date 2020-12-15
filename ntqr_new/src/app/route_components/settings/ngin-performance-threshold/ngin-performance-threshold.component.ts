import { Component, OnInit } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/services/global-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ngin-performance-threshold',
  templateUrl: './ngin-performance-threshold.component.html',
  styleUrls: ['./ngin-performance-threshold.component.scss']
})
export class NginPerformanceThresholdComponent implements OnInit {

  cpu: any;
  memory: any;
  port: any;
  maxMemory: any;
  maxPort: any;
  public userPermission: boolean = false;

  constructor(private OptionsService: OptionsService, private global: GlobalService, private router: Router,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 5.2 Performance Threshold'); 
    this.get_values();
    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    }
  }

  get_values() {
    this.global.show_loader();
    this.OptionsService.getnginThreshold().subscribe((results) => {
      this.cpu = results.responseResult.result.cpu;
      this.memory = results.responseResult.result.memory;
      this.port = results.responseResult.result.port;
      this.maxMemory = results.responseResult.result.maxMemory;
      this.maxPort = results.responseResult.result.maxPort;
      this.global.hide_loader();
    })
  }
  threshold_set(value) {
    let submit_obj =
    {
      "cpu": value.cpu,
      "maxMemory": value.max_memory,
      "maxPort": value.max_port,
      "memory": value.memory,
      "port": value.port
    };
    this.global.show_loader();
    this.OptionsService.updateNGINThreshold(submit_obj).subscribe((results) => {
      this.global.hide_loader();
      let mess = "The <span class='color-red'>Customer NGIN threshold</span> has been updated successfully";
  
      let modal_obj = {
        title: '<span>NGIN threshold </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };
  
      this.global.open_alert_message(modal_obj);
    });
    this.get_values();
  }
  cancel() {
    this.router.navigate(['/home']);
  }
}
