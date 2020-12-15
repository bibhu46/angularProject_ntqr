import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-popup-obj-cap',
  templateUrl: './popup-obj-cap.component.html',
  styleUrls: ['./popup-obj-cap.component.css']
})
export class PopupObjCapComponentV20 implements OnInit {

  public response: any
  public serviceId: string;
  public monthHistoryList: []
  desc: string;
  name: string;
  startDate = new Date(1990, 0, 1);
  date: string;
  date_unit: string;
  date_from: string;  
  host:string; 
  historyList:[]
  loader:boolean
  loadTable:boolean
  mrfCsvHisList:[]
  columnsNameLine:[]
  fileName:string
  headerList: any;
  csvHistoryList: any;
  headerLine: any;
  filename: any;
  sel_month: string;

  constructor(private nginService: NginInstNumberService, private aRoute: ActivatedRoute, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Object Capacity Popup');
    this.date_unit = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.serviceId=this.aRoute.snapshot.paramMap.get('serviceId'); 
    this.desc=this.aRoute.snapshot.paramMap.get('desc');
    this.name=this.aRoute.snapshot.paramMap.get('servName');
    this.date=this.aRoute.snapshot.paramMap.get('date')
    console.log(this.serviceId,this.desc,this.name,this.date);
    this.sel_month = this.aRoute.snapshot.paramMap.get('date');
    this.getObjCapHistory(this.serviceId,this.desc,this.name,this.sel_month)
  }

  getObjCapHistory(serviceId,desc,name,date){
    let date_format = moment(date).format('YYYY-MM');
    let resp =this.nginService.getObjCapHistory(serviceId,desc,name,date_format);
    this.global.show_loader();
    resp.subscribe(data=>{
      this.response=data;
      console.log('--',this.response)
      this.monthHistoryList=this.response.responseResult.result.monthHistoryList;
      console.log(this.monthHistoryList);
      this.global.hide_loader();
    })
  }

  onClickdwnldcsv(){
    
    let resp =this.nginService.getObCapPopUpCSVdownload(this.serviceId,this.desc, this.name,this.date);
    this.global.show_loader();
    resp.subscribe(
      data=>{
        this.response=data;
        this.headerList=this.response.responseResult.result.columnsLine;
        this.csvHistoryList = this.response.responseResult.result.csvHistoryList;
        this.headerLine= this.response.responseResult.result.headerLine;
        this.filename=this.response.responseResult.result.fileName;
        let csvdata = this.ConvertToCSV(this.csvHistoryList, this.headerList);
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
    )

 

  }
  ConvertToCSV(objArray: any, headerList: {}) {
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

  onSubmit(value){
    console.log(value)
    
    this.getObjCapHistory(this.serviceId,this.desc,this.name,value.sel_month);
  }

}
