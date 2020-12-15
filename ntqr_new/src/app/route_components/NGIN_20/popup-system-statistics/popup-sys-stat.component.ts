import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-popup-sys-stat',
  templateUrl: './popup-sys-stat.component.html',
  styleUrls: ['./popup-sys-stat.component.css']
})
export class PopupSysStatComponentV20 implements OnInit {

  date:string
  host:string
  response:any
  historyList:[]
  loader:boolean
  loadTable:boolean
  date_unit: string;
  date_from: string;
  columnsNameLine: any;
  csvHisList: any;
  fileName: any;

  constructor(private nginService: NginInstNumberService, private aRoute: ActivatedRoute, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 System Statistics Popup');
    this.date_unit = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.date=this.aRoute.snapshot.paramMap.get('date')
    this.host=this.aRoute.snapshot.paramMap.get('host')
    this.showPopUpHistory(this.date, this.host)
  }
  showPopUpHistory(date: string, host: string) {
    this.global.show_loader();
    let resp = this.nginService.getSysStatsImgHistory(date,host);
    resp.subscribe(
      data=>{
        this.response=data;
        this.historyList=this.response.responseResult.result.systemStatsList;
        this.loader=false;
        this.loadTable=true;
        this.global.hide_loader();
      }
    )
  }

  onClickdwnldcsv(){
    console.log("downloaded")
    let resp = this.nginService.getSystemStatiticsCSVHistory(this.date,this.host)
    resp.subscribe(
      data=>{
        this.response=data
        this.columnsNameLine=this.response.responseResult.result.columnsNameLine;
        this.csvHisList=this.response.responseResult.result.csvHisList
        this.fileName=this.response.responseResult.result.fileName
        let csvdata = this.ConvertToCSV(this.csvHisList, this.columnsNameLine);
        // console.log(csvdata)
        let blob = new Blob(['\ufeff' + csvdata], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {
          dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", this.fileName + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
      }
    )
  }

 

  onSubmit(value){
    console.log(value)
    this.showPopUpHistory(value.fromDate,this.host);
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

}
