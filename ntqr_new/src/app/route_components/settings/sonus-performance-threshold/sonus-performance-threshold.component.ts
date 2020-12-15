import { Component, OnInit } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sonus-performance-threshold',
  templateUrl: './sonus-performance-threshold.component.html',
  styleUrls: ['./sonus-performance-threshold.component.scss']
})
export class SonusPerformanceThresholdComponent implements OnInit {
  cpu: any;
  memory: any;
  disk: any;
  externalTimetout: any;
  internalServiceTime: any;
  machineCongestion: any;
  psxCongestionRejects: any;
  psxDipRetries: any;
  psxDipFailures: any;
  vlanNumbers: any;
  trunkgroupUtilisation: any;
  trunkgroupCPS: any;
  utilisation: any;
  allocationFailure: any;
  totalCompression: any;
  peakUsed: any;
  averageUsed: any;
  averageAvailable: any;
  callCounts: any;
  callsPerSecond: any;
  callAttempts: any;
  callCompletions: any;
  callAttemptRate: any;
  totalCallAttempts: any;
  peakSbcLicenceUtilization: any;
  busyHourCallAttempts: any;
  sbcCallAttemptsRate: any;
  thresholdSbcDsp: any;
  actiiveCall: any;
  public userPermission: boolean = false;
  constructor(private OptionsService: OptionsService, private global: GlobalService, private router: Router,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sonus Performance Threshold');
    this.get_values();
    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    }
  }

  get_values() {
    this.global.show_loader();
    this.OptionsService.getAllThreshold().subscribe((results) => {
      this.cpu = results.responseResult.result.cpu;
      this.memory = results.responseResult.result.memory;
      this.disk = results.responseResult.result.disk;
      this.externalTimetout = results.responseResult.result.externalTimetout;
      this.internalServiceTime = results.responseResult.result.internalServiceTime;
      this.machineCongestion = results.responseResult.result.machineCongestion;
      this.psxCongestionRejects = results.responseResult.result.psxCongestionRejects;
      this.psxDipRetries = results.responseResult.result.psxDipRetries;
      this.psxDipFailures = results.responseResult.result.psxDipFailures;
      this.vlanNumbers = results.responseResult.result.vlanNumbers;
      this.trunkgroupUtilisation = results.responseResult.result.trunkgroupUtilisation;
      this.trunkgroupCPS = results.responseResult.result.trunkgroupCPS;
      this.utilisation = results.responseResult.result.utilisation;
      this.allocationFailure = results.responseResult.result.allocationFailure;
      this.totalCompression = results.responseResult.result.totalCompression;
      this.peakUsed = results.responseResult.result.peakUsed;
      this.averageUsed = results.responseResult.result.averageUsed;
      this.averageAvailable = results.responseResult.result.averageAvailable;
      this.callCounts = results.responseResult.result.callCounts;
      this.callsPerSecond = results.responseResult.result.callsPerSecond;
      this.callAttempts = results.responseResult.result.callAttempts;
      this.callCompletions = results.responseResult.result.callCompletions;
      this.callAttemptRate = results.responseResult.result.callAttemptRate;
      this.totalCallAttempts = results.responseResult.result.totalCallAttempts;
      this.peakSbcLicenceUtilization = results.responseResult.result.peakSbcLicenceUtilization;
      this.busyHourCallAttempts = results.responseResult.result.busyHourCallAttempts;
      this.sbcCallAttemptsRate = results.responseResult.result.sbcCallAttemptsRate;
      this.thresholdSbcDsp = results.responseResult.result.thresholdSbcDsp;
      this.global.hide_loader();
    })
  }

  threshold_set(value) {
    let submit_obj =
    {
      "cpu": value.cpu,
      "memory": value.memory,
      "disk": value.disk,
      "externalTimetout": value.externalTimetout,
      "internalServiceTime": value.internalServiceTime,
      "machineCongestion": value.machineCongestion,
      "psxCongestionRejects": value.psxCongestionRejects,
      "psxDipRetries": value.psxDipRetries,
      "psxDipFailures": value.psxDipFailures,
      "vlanNumbers": value.vlanNumbers,
      "trunkgroupUtilisation": value.trunkgroupUtilisation,
      "trunkgroupCPS": value.trunkgroupCPS,
      "utilisation": value.utilisation,
      "allocationFailure": value.allocationFailure,
      "peakUsed": value.peakUsed,
      "averageUsed": value.averageUsed,
      "averageAvailable": value.averageAvailable,
      "callCounts": value.callCounts,
      "callsPerSecond": value.callsPerSecond,
      "callAttempts": value.callAttempts,
      "callCompletions": value.callCompletions,
      "callAttemptRate": value.callAttemptRate,
      "totalCallAttempts": value.totalCallAttempts,
      "peakSbcLicenceUtilization": value.peakSbcLicenceUtilization,
      "busyHourCallAttempts": value.busyHourCallAttempts,
      "sbcCallAttemptsRate": value.sbcCallAttemptsRate,
      "thresholdSbcDsp": value.thresholdSbcDsp

    };
    this.global.show_loader();
    this.OptionsService.updateSonusThreshold(submit_obj).subscribe((results) => {
      this.global.hide_loader();
      let mess = "The <span class='color-red'>Sonus Performance Threshold</span> has been updated successfully";
      let modal_obj = {
        title: '<span>Sonus performance threshold </span> Status',
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
