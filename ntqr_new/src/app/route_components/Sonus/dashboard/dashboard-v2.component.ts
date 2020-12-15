import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { DashboardService } from 'src/app/services/sonus/dashboard.service';
import { DeviceKpiService } from 'src/app/services/sonus/devicekpi.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser';

export class ObjKpi {
  constructor(
    public selectedStatisticsGroup: string,
    public note: any
  ) {  }
}

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.scss']
})
export class DashboardV2Component implements OnInit {

  public from_date: string = "";
  public to_date: string = "";
  public dataSbc = [];
  public dataPsx = [];
  public dataTrunk = [];
  public dataGsx = [];
  public data: any;
  public results = [];
  public loader = true;
  public kpiDashboard = '';
  public note_content = "Dashboard custom content";
  public read_state = true;
  public show_edit = true;
  public userPermission: boolean = false;
  public thresholdUtilization: any;

  constructor(private api: DashboardService,private api1: DeviceKpiService, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sonus Dashboard');
    this.from_date = moment().set({hour:0, minute:0, second:0 }).format("ddd, YYYY-MM-DD HH:mm");
    this.to_date = moment().set({hour: 23, minute: 59, second: 59 }).format("ddd, YYYY-MM-DD HH:mm");    
        
    this.getAll();
    this.getKpis();
    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    } 
  }

  getAll() {    
    this.global.show_loader();
    this.api.getAll().subscribe((results) =>  {
      this.data = results.responseResult.result;
      console.log(this.data)
      this.thresholdUtilization = results.responseResult.result.thresholdUtilisation;
      console.log(this.thresholdUtilization)
      this.dataSbc = results.responseResult.result.systemSbcList;
      this.dataPsx = results.responseResult.result.systemPsxList;
      this.dataTrunk = results.responseResult.result.systemTrunkgroupList;
      this.dataGsx = results.responseResult.result.systemGsxNbsList; 
      this.from_date =results.responseResult.result.fromDate;
      this.to_date =results.responseResult.result.toDate;
      this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    });
  }

  getKpis() {
    this.api1.getKpis().subscribe((results) =>  {
      this.note_content = results.responseResult.result.dashboardNote;
    }, (err) => {
      this.global.hide_loader();
    });

  }

  save(id){
    let note = (<HTMLInputElement>document.getElementById(id)).value;
    let obj = new ObjKpi('Dashboard', note);
    this.global.show_loader();
    this.api1.saveKpi(obj).subscribe((results) =>  {
      this.note_content = results.responseResult.result.dashboardNote;
      this.show_edit = true;
      this.read_state = true;
      this.global.hide_loader();
      let mess = "The <span class='color-red'>KPI Notes </span> has been updated successfully";  
      let modal_obj = {
        title: 'KPI <span>Note </span> update',
        size: "sm",
        color: "green",                
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };
      this.global.open_alert_message(modal_obj);
    }, (err) => {
      this.global.hide_loader();
    });
  }
  
  downloadCsv(){
    this. global.show_loader();
    this.api.downloadCsv().subscribe((results) =>  {
      let psxCsvList = results.responseResult.result.psxCsvList;
      let sbcCsvList = results.responseResult.result.sbcCsvList;
      let gsxCsvList = results.responseResult.result.gsxCsvList;
      let tgCsvList = results.responseResult.result.tgCsvList;
      let headerLine = results.responseResult.result.headerLine; 
      let columnLine1 = results.responseResult.result.columnLine1; 
      let columnLine2 = results.responseResult.result.columnLine2; 
      let columnLine3 = results.responseResult.result.columnLine3; 
      let columnLine4 = results.responseResult.result.columnLine4; 
      let fileName = results.responseResult.result.fileName; 
      
      let csvdata = this.ConvertToCSV(psxCsvList,sbcCsvList,gsxCsvList,tgCsvList,headerLine,columnLine1,columnLine2,columnLine3,columnLine4);
       let blob = new Blob(['\ufeff' + csvdata], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) { 
        dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", fileName);
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
      this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    }); 
  }
  
  ConvertToCSV(psxCsvList,sbcCsvList,gsxCsvList,tgCsvList,headerLine,columnLine1,columnLine2,columnLine3,columnLine4) {
    var psxarray = typeof psxCsvList != 'object' ? JSON.parse(psxCsvList) : psxCsvList;
    var sbcarray = typeof sbcCsvList != 'object' ? JSON.parse(sbcCsvList) : sbcCsvList;
    var gsxarray = typeof gsxCsvList != 'object' ? JSON.parse(gsxCsvList) : gsxCsvList;
    var tgarray = typeof tgCsvList != 'object' ? JSON.parse(tgCsvList) : tgCsvList;
    var str = '';
    str+=headerLine;
    str += '\r\n';
    str += '\r\n';
    str+=columnLine1;
    str += '\r\n';
  
    if(psxarray!=null){
      for (var i = 0; i < psxarray.length; i++) {
        var line = '';
        for (var index in psxarray[i]) {
            if (line != '') line += ','
  
            line += psxarray[i][index];
        }
  
        str += line + '\r\n';
      }
    }
     
    str += '\r\n';
    str += '\r\n';
    str+=columnLine2;
    str += '\r\n';
    if(sbcarray!=null){
      for (var i = 0; i < sbcarray.length; i++) {
        var line = '';
        for (var index in sbcarray[i]) {
            if (line != '') line += ','
  
            line += sbcarray[i][index];
        }
  
        str += line + '\r\n';
      }
    }
    
    str += '\r\n';
    str += '\r\n';
    str+=columnLine3;
    str += '\r\n';
    if(gsxarray!=null){
      for (var i = 0; i < gsxarray.length; i++) {
        var line = '';
        for (var index in gsxarray[i]) {
            if (line != '') line += ','
  
            line += gsxarray[i][index];
        }
  
        str += line + '\r\n';
      }
     }
     str += '\r\n';
    str += '\r\n';
    str+=columnLine4;
    str += '\r\n';
    if(tgarray!=null){
      for (var i = 0; i < tgarray.length; i++) {
        var line = '';
        for (var index in tgarray[i]) {
            if (line != '') line += ','
  
            line += tgarray[i][index];
        }
  
        str += line + '\r\n';
      }
     }
    return str;
  }

  edit_note(){
    this.read_state = false;
    this.show_edit = false;
  }

  save_note() {
    let submit_obj = { selectedStatisticsGroup: "Dashboard", note: this.note_content };

    this.api1.saveKpi(submit_obj).subscribe((results) =>  {
      this.note_content = results.responseResult.result.dashboardNote;
      this.show_edit = true;
      this.read_state = true;
      let mess = "The <span class='color-red'>KPI Notes </span> has been updated successfully";        

      let modal_obj = {
        title: 'KPI <span>Note </span> update',
        size: "sm",
        color: "green",                
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

        this.global.open_alert_message(modal_obj);
    })
  }

  cps_utilisation(cps){
    if( cps >= this.thresholdUtilization){
      return "red";
    } else if(this.thresholdUtilization == null || this.thresholdUtilization > cps){
      return "green";
    }
    return "green";
  }

  cpu_usage(usage){
    if( usage >= this.data.thresholdCpu){
      return "red";
    } else if(this.data.thresholdCpu == null || this.data.thresholdCpu > usage){
      return "green";
    }
    return "green";
  }

  memory_usage(usage){
    if( usage >= this.data.thresholdMemory){
      return "red";
    } else if(this.data.thresholdMemory == null || this.data.thresholdMemory > usage){
      return "green";
    }
    return "green";
  }

  session_usage(usage){
    if( usage >= this.data.peakSbcLicenceUtilization){
      return "red";
    } else if(this.data.peakSbcLicenceUtilization == null || this.data.peakSbcLicenceUtilization > usage){
      return "green";
    }
    return "green";
  }

  dsp_usage(usage){
    if( usage >= this.data.thresholdSbcDsp){
      return "red";
    } else if(this.data.thresholdSbcDsp == null || this.data.thresholdSbcDsp > usage){
      return "green";
    }
    return "green";
  }

  psx_errors(){
    if(this.data.higherTableValues[6] > 0){
      return true;
    } 
    return false;
  }

}
