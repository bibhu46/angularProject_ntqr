import { Component, OnInit } from '@angular/core';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global-service.service';
import { appConfig } from 'src/app/app.config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-call-attempts-v2',
  templateUrl: './call-attempts-v2.component.html',
  styleUrls: ['./call-attempts-v2.component.css']
})
export class CallAttemptsV2Component implements OnInit {

  public response:any
  public callAttemptsAluModelList=[]
  public loadTable:boolean
  public loader:boolean
  public headerList: {}
  public csvList: []
  public filename: string;
  public fromdate: string
  public todate:string
  date_from: string;

  constructor(private nginInstNumService: NginInstNumberService, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 5.2 Call Attempts'); 
    this.fromdate = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.todate = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
  }
  onSubmit(values){
    this.loader=true;
    let resp=this.nginInstNumService.getCallAttempts(values);
    this.global.show_loader();
    resp.subscribe(
      data=>{
        this.response=data
        this.callAttemptsAluModelList=this.response.responseResult.result.callAttemptsAluModelList
        this.fromdate=this.response.responseResult.result.fromDate;
        this.todate=this.response.responseResult.result.toDate;
        this.loader=false
        this.loadTable=true;

        this.global.hide_loader();
      }
    )
    
  }

  onClickdwnldcsv() {
    let resp = this.nginInstNumService.getCSVdataCallAttempts(this.fromdate, this.todate)
    console.log(this.fromdate+" "+this.todate);

    this.global.show_loader();
    
    resp.subscribe(
      data => {
        this.response = data;
        this.headerList = this.response.responseResult.result.columnsNameLine;
        this.filename = "ntqr_callAttemptsAlu";
        this.csvList = this.response.responseResult.result.csvList;
        let csvdata = this.ConvertToCSV(this.csvList, this.headerList);
        // console.log(csvdata)
        let blob = new Blob(['\ufeff' + csvdata], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {
          dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", this.filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);

        this.global.hide_loader();

      }

    );

  }

  ConvertToCSV(objArray, headerList) {
    if (headerList) {
      objArray.unshift(headerList)
    }
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
  showPopUpHistory(date: string) {
    let url = appConfig.hostUrl+"ngin5.2/callAttemptsPopup/"+date;
    var x = screen.width / 2 - 700 / 2;
    var y = screen.height / 2 - 450 / 2;
    window.open(url,"NGIN Call Attempts-"+date,'height=700,width=1100,left=' + x + ',top=' + y)
   
  }

}
