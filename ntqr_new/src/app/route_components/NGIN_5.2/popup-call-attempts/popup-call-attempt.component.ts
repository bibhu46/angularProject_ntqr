import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-popup-call-attempt',
  templateUrl: './popup-call-attempt.component.html',
  styleUrls: ['./popup-call-attempt.component.css']
})
export class PopupCallAttemptComponent implements OnInit {
  response: any;
  data: string;
  historyList: []
  date: string
  dateNew: string
  loadTable: boolean
  loader: boolean
  columnsNameLine: []
  csvHistoryList: []
  fileName: string
  date_unit: string;
  date_from: string;

  constructor(private nginService: NginInstNumberService, private aRoute: ActivatedRoute, private global: GlobalService,private titleService: Title) { }


  ngOnInit(): void {
    this.titleService.setTitle('NGIN 5.2 Call Attempts Popup'); 
    this.date_unit = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    
    this.date = this.aRoute.snapshot.paramMap.get('date')
    console.log(this.date)
    this.dateNew = this.date.substring(4, this.date.length)
    this.showPopUpHistory(this.dateNew)

  }
  showPopUpHistory(value) {
    this.loader = true;
    console.log(value)
    let resp = this.nginService.getCallAtmptImgHistory(value);
    this.global.show_loader();
    resp.subscribe(
      data => {
        this.response = data
        this.historyList = this.response.responseResult.result.historyListFromGUI
        this.loader = false;
        this.loadTable = true;
        this.global.hide_loader();
      }
    )
  }

  onClickdwnldcsv() {
    console.log("downloaded")
    let resp = this.nginService.getcallatmptHistCsv(this.dateNew)
    this.global.show_loader();
    resp.subscribe(
      data => {
        this.response = data
        this.fileName=this.response.responseResult.result.fileName
        this.columnsNameLine = this.response.responseResult.result.columnsNameLine
        this.csvHistoryList = this.response.responseResult.result.csvHistoryList
        let csvdata = this.ConvertToCSV(this.csvHistoryList, this.columnsNameLine);
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
  onSubmit(value) {
    this.showPopUpHistory(value.fromDate)
    console.log(value.fromDate)
  }

}
