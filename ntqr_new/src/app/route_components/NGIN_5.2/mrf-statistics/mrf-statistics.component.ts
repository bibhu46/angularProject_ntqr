import { Component, OnInit } from '@angular/core';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { MatInputModule } from '@angular/material/input';
import { appConfig } from 'src/app/app.config';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-mrf-statistics',
  templateUrl: './mrf-statistics.component.html',
  styleUrls: ['./mrf-statistics.component.css']
})
export class MrfStatisticsComponent implements OnInit {

  public response: any;
  public mrfStatsModelList = [];
  public date: string;
  public loadTable: boolean;
  public loader: boolean;
  toDate: any;
  fromDate: any;
  fileName: string;
  mrfCsvList: [];
  columnsNameLine: [];
  date_unit: string;
  date_from: string;
  threshold: any;

  constructor(private nginService: NginInstNumberService, private global: GlobalService,private titleService: Title) { }
  
  ngOnInit(): void {
    this.titleService.setTitle('NGIN 5.2 MRF Statistics'); 
    this.fromDate = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.toDate = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
  }
  onSubmit(values) {
    this.global.show_loader();
    this.fromDate = values.fromDate;
    this.toDate = values.toDate;
    this.loader = true;
    let resp = this.nginService.getMrfStatistics(values);
    
    resp.subscribe(
      data => {
        this.response = data
        this.mrfStatsModelList = this.response.responseResult.result.mrfStatsModelList;
        this.threshold = this.response.responseResult.result.thresholdMemoryPercentage;
        this.loader = false;
        this.loadTable = true;
        this.global.hide_loader();
      }
    )
 
  }
 
  showPopUpHistory(date, host) {
    console.log(date,host);
    this.date = date.substring(0, 10);
    let url = appConfig.hostUrl + "ngin5.2/mrfStatisticsPopup/" + this.date + "/" + host;
    var x = screen.width / 2 - 700 / 2;
    var y = screen.height / 2 - 450 / 2;
    window.open(url, "NGIN MRF Stats-" + date, 'height=785,width=800,left=' + x + ',top=' + y)
  }
 
  onClickdwnldcsv() {
    console.log('csv');
    let resp = this.nginService.getMrfStatisticsCSV(this.fromDate, this.toDate);
    resp.subscribe(
      data => {
        this.response = data
        this.columnsNameLine = this.response.responseResult.result.columnsNameLine
        this.mrfCsvList = this.response.responseResult.result.mrfCsvList
        this.fileName = this.response.responseResult.result.fileName
        let csvdata = this.ConvertToCSV(this.mrfCsvList, this.columnsNameLine);
 
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

  myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  getBarColor(percentage:any) {    
    if (percentage > this.threshold) {
      return 'red';
    }
    else {
      return 'green';
    }
  }

}
