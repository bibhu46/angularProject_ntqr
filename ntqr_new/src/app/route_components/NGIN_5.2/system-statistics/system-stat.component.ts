import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { appConfig } from 'src/app/app.config';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-system-stat',
  templateUrl: './system-stat.component.html',
  styleUrls: ['./system-stat.component.css']
})
export class SystemStatComponent implements OnInit {

  public systemStatisticsModelList=[]
public systemStatsList=[]
public response:any
public date:string
public loadTable:boolean
public loader:boolean
  fromDate: any;
  toDate: any;
  columnsNameLine: any;
  fileName: any;
  csvList: any;
  date_from: string;
  date_unit: string;

  constructor(private nginService: NginInstNumberService, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 5.2 System Statistics');
    this.fromDate = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.toDate = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
      // let resp=this.nginService.getSystemStatitics()
      // resp.subscribe(
      //   data=>{
      //     this.response=data
      //     this.systemStatisticsList=this.response.responseResult.result.systemStatsModelList[0].systemStatsList
      //     this.date=this.response.responseResult.result.systemStatsModelList[0].systemStatsList[0].dateFormated
      //   }
      // )
  }
  onSubmit(values){
    this.global.show_loader();
    this.loader=true
    this.fromDate = values.fromDate;
    this.toDate = values.toDate;
    let resp=this.nginService.getSystemStatitics(values)
    resp.subscribe(
      data=>{
        this.response=data
        this.systemStatisticsModelList=this.response.responseResult.result.systemStatsModelList
        this.systemStatsList=this.response.responseResult.result.systemStatsModelList.systemStatsList
        //this.date=this.response.responseResult.result.systemStatsModelList[0].systemStatsList[0].dateFormated
       this.loader=false
        this.loadTable=true;
        this.global.hide_loader();
      }
    )
    
  }
  showPopUpHistory(date:string, host:string){
    this.date=date.substring(0,10);
    let url = appConfig.hostUrl+"ngin5.2/systemStatisticsPopup/"+this.date+"/"+host;
    var x = screen.width / 2 - 700 / 2;
    var y = screen.height / 2 - 450 / 2;
    window.open(url,"NGIN Call Attempts-"+date,'height=785,width=800,left=' + x + ',top=' + y)
  }
  
  onClickdwnldcsv(){
    this.global.show_loader();
    let resp = this.nginService.getSystemStatiticsCSV(this.fromDate,this.toDate)
    resp.subscribe(
      data=>{
        this.response=data
        this.columnsNameLine= this.response.responseResult.result.columnsNameLine;
        this.fileName= this.response.responseResult.result.fileName;
        this.csvList = this.response.responseResult.result.csvList;
        let csvdata = this.ConvertToCSV(this.csvList, this.columnsNameLine);
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
        this.global.hide_loader();
      }
    )
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
