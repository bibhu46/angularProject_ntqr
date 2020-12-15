import { Component, OnInit } from '@angular/core';
import { DeviceKpiPopupService } from 'src/app/services/sonus/devicekpi-popup.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-devicestat-popup',
  templateUrl: './devicestat-popup.component.html',
  styleUrls: ['./devicestat-popup.component.css']
})
export class DeviceStatPopupComponent implements OnInit {

  constructor(private service: DeviceKpiPopupService, private global: GlobalService,private titleService: Title) { 
    
  }

  public result:any = {};
  public cardInfo:any;
  public thresholdRes:any;
  public higherTableValues=[];
  public higherValuesDspList=[];
  public obj:any;
  public hour=false;
  public fromDate:any;
  public toDate:any;
  public sbcOverallKpiList:any;
  public overallCheck:boolean =false;

  ngOnInit(): void {  
    this.titleService.setTitle('Sonus Device Statistics Popup');  
    this.obj = window['dataPopup'];
    this.getMonthHistory(this.obj);
  }

  public getMonthHistory(obj) {
    this.global.show_loader();
    this.service.getMonthHistory(obj).subscribe((results) =>{     
     this.result = results.responseResult.result;     
     this.sbcOverallKpiList = results.responseResult.result.sbcOverallKpiList; 
     this.cardInfo = results.responseResult.result.cardInformation;
     this.thresholdRes=results.responseResult.result.thresholdRes;
     this.higherTableValues=results.responseResult.result.higherTableValues; 
     this.higherValuesDspList=results.responseResult.result.higherValuesDspList;  
     this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    });
 }

 public onclickBack(){
  this.global.show_loader();
  this.hour=false;
  let ob=this.obj;
  ob.day='';
  ob.fromDate=this.fromDate;
  ob.toDate=this.toDate;
  this.service.getMonthHistory(ob).subscribe((results) =>{
    this.result = results.responseResult.result; 
    this.cardInfo = results.responseResult.result.cardInformation;
    this.thresholdRes=results.responseResult.result.thresholdRes;
    this.higherTableValues=results.responseResult.result.higherTableValues;   
    this.global.hide_loader();
   }, (err) => {
    this.global.hide_loader();
  });
 }

 public getHourHistory(day) { 
   this.global.show_loader();
   this.hour=true;
   let obj=this.obj;
   this.fromDate=obj.fromDate;
   this.toDate=obj.toDate;
   obj.fromDate='';
   obj.toDate='';
   obj.day=day;   
  this.service.getMonthHistory(obj).subscribe((results) =>{
   this.result = results.responseResult.result; 
   this.cardInfo = results.responseResult.result.cardInformation;
   this.thresholdRes=results.responseResult.result.thresholdRes;
   this.higherTableValues=results.responseResult.result.higherTableValues;   
   this.global.hide_loader();
  }, (err) => {
    this.global.hide_loader();
  });
}

 public downloadCsv() {
   let obj=this.obj;
   this.global.show_loader();
  this.service.downloadCsv(obj).subscribe((results) =>{
   this.result = results.responseResult.result; 
   let gsxList = results.responseResult.result.gsxList;
   let psxList = results.responseResult.result.psxList;
   let ethList = results.responseResult.result.ethList;
   let gsxConList = results.responseResult.result.gsxConList;
   let headerLine = results.responseResult.result.headerLine; 
   let headerNames = results.responseResult.result.headerNames; 
   let tgDescrLine = results.responseResult.result.tgDescrLine;
   let fileName = results.responseResult.result.fileName; 
   let csvdata = this.ConvertToCSV(gsxList,psxList,gsxConList,ethList,headerLine,tgDescrLine,headerNames);
 
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


ConvertToCSV(gsxList,psxList,gsxConList,ethList,headerLine,tgDescrLine,headerNames) {
  var gsxarray = typeof gsxList != 'object' ? JSON.parse(gsxList) : gsxList;
  var psxarray = typeof psxList != 'object' ? JSON.parse(psxList) : psxList;
  var gsxConarray = typeof gsxConList != 'object' ? JSON.parse(gsxConList) : gsxConList;
  var etharray = typeof ethList != 'object' ? JSON.parse(ethList) : ethList;
  var str = '';
  str+=headerLine;
  str += '\r\n';
  str+=tgDescrLine;
  str += '\r\n';
  str += '\r\n';
  str+=headerNames;
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
   if(etharray!=null){
    for (var i = 0; i < etharray.length; i++) {
      var line = '';
      for (var index in etharray[i]) {
          if (line != '') line += ','

          line += etharray[i][index];
      }

      str += line + '\r\n';
    }
   }
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
   if(gsxConarray!=null){
    for (var i = 0; i < gsxConarray.length; i++) {
      var line = '';
      for (var index in gsxConarray[i]) {
          if (line != '') line += ','

          line += gsxConarray[i][index];
      }

      str += line + '\r\n';
    }
   }
  return str;
}

cpu_usage(usage, threshold){
  if(threshold == null || threshold > usage){
    return "green";
  } else if(usage >= threshold){
    return "red";
  }
}

call_counts(table,usage, threshold){
  if(table>0 && threshold == null || threshold > usage){
    return "green";
  } else if(table>0 && usage >= threshold){
    return "red";
  }
}

psx_in(table){
  if(table>0){
    return "green";
  }
}

psx_red(table){
  if(table>0){
    return "red";
  }
}

}
