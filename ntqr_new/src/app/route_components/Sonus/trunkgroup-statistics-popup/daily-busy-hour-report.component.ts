import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from "moment";
import { HourReport } from 'src/app/models/interfaces';
import { GlobalService } from 'src/app/services/global-service.service';
import { TgStatsService } from 'src/app/services/sonus/trunkgroup-statistics.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-daily-busy-hour-report',
  templateUrl: './daily-busy-hour-report.component.html',
  styleUrls: ['./daily-busy-hour-report.component.scss']
})
export class DailyBusyHourReportComponent implements OnInit {

  trunk_id: string;
  tg_name: string;
  tg_desc: string;
  gateway_tg: string;
  gateway_includes_sbc: boolean = false;
  service_type_tg: string;
  date_from: string = "";
  date_from_bck: string = "";
  date_to: string = "";
  date_to_bck: string = "";
  report_date: string;
  type_list: any[];
  search_type: string = "";
  sample_request = {};
  show_back_btn:  boolean = false;
  search_text: string = "";
  threshold_tg_utilisation: number;
  

  /* For mat data tables ---------------------------------- */

  displayedColumns: string[] = ['timestampDateFormatted', 'circuitsAvailable', 'tgUtilisation', "tgInCallAtempts", 'maxInCpsProcessed', "maxInCpsAttempted"];  
  dataSource: MatTableDataSource<HourReport>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public kpiList: any[] = [];
  public higher_in_bandwidth = 0;
  public higher_out_bandwidth = 0;

  constructor(private aRoute: ActivatedRoute, private router: Router, private tgStatsService: TgStatsService, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sonus Trunkgroup Statistics Popup');
    this.trunk_id = this.aRoute.snapshot.paramMap.get('trunk_id');
    this.tg_name = this.aRoute.snapshot.paramMap.get('tgName');
    this.tg_desc = this.aRoute.snapshot.paramMap.get('tgDesc');
    this.gateway_tg = this.aRoute.snapshot.paramMap.get('gateway');
    this.service_type_tg = this.aRoute.snapshot.paramMap.get('serviceType');
    this.search_type = this.aRoute.snapshot.paramMap.get('searchType');

    if(this.aRoute.snapshot.paramMap.get('date')){
      this.date_from = this.aRoute.snapshot.paramMap.get('date');
    }

    if(this.aRoute.snapshot.paramMap.get('date_from')){
      this.date_from = this.aRoute.snapshot.paramMap.get('date_from');
      this.report_date = this.date_from;
    }

    if(this.aRoute.snapshot.paramMap.get('date_to')){
      this.date_to = this.aRoute.snapshot.paramMap.get('date_to');
    }

    if(this.date_to !== ""){
      this.displayedColumns = ['timestampDateFormatted', 'circuitsAvailable', 'tgUtilisation', 'busiestHour', "tgInCallAtempts", 'maxInCpsProcessed', "maxInCpsProcessed"];      
    }

    if(this.gateway_tg.includes("SBC")){
      this.gateway_includes_sbc = true;
    } else {
      this.gateway_includes_sbc = false;
    }

    console.log("Search type in popup");
    console.log(this.search_type);
    
    this.get_tg_details();   
  }

  applyFilter(ev: Event) {
    const filterValue = this.search_text;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get_tg_details(){   
    this.global.show_loader();
    this.sample_request = {
      "busiestBusyHourParameter": "",
      "date": "",
      "fromDate": "",
      "orderBy": 0,
      "searchType": "",
      "selectedCategories": [],
      "selectedCategory": 0,
      "selectedGateway": this.gateway_tg,
      "selectedServiceType": "",
      "selectedTags": [],
      "sortType": "asc",
      "tgDescr": this.tg_desc,
      "tgName": this.tg_name,
      "toDate": "",
      "trunkGroupId": Number(this.trunk_id)
    };    
    
    if(this.date_to !== ""){      
      this.sample_request['fromDate'] = this.date_from;
      this.sample_request['toDate'] = this.date_to;
      this.sample_request['searchType'] = this.search_type;
    }
    else {
      this.sample_request['fromDate'] = this.date_from;
      this.sample_request['searchType'] = this.search_type;
    }

    this.tgStatsService.getTgDetails(this.sample_request).subscribe((results) =>  { 
      
      if(this.date_to !== ""){
        this.displayedColumns = ['timestampDateFormatted', 'circuitsAvailable', 'tgUtilisation', 'busiestHour', "tgInCallAtempts", 'maxInCpsProcessed', "maxInCpsAttempted"];
      }
      let temp = [];
      if(this.gateway_tg.includes('SBC')){
        temp = results['responseResult'].result.sbcKpiList;
        
      } else {
        temp = results['responseResult'].result.kpiList;
      }
      this.threshold_tg_utilisation = results['responseResult'].result.thresholdTrunkgroupUtilisation;
      this.higher_in_bandwidth = results['responseResult'].result.higherInBandwidth;
      this.higher_out_bandwidth = results['responseResult'].result.higherOutBandwidth;
      
      temp.forEach((item, index, arr) => {
        if(item['inBandwidth'] == null){
          temp[index]['inBandwidth'] = 0;
        }

        if(item['outBandwidth'] == null){
          temp[index]['outBandwidth'] = 0;
        }
      });

      this.kpiList = temp;

       this.dataSource = new MatTableDataSource(this.kpiList);

       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;    
       this.global.hide_loader(); 
    }, (err) => {
      this.global.hide_loader();
    }); 
    
  }

  next_date(){    
    
    let date_value = this.date_from;
    let new_date = "";    

    if(this.date_to == ""){
      new_date = moment(date_value).add(1, 'd').format('YYYY-MM-DD');
      this.date_from = new_date;    
      
    } else if(this.date_to !== ""){
        date_value = this.date_to;
        new_date = moment(date_value).add(1, 'd').format('YYYY-MM-DD');
        
        this.date_to = new_date;
    }

    this.get_tg_details();

  }

  prev_date(){
    let date_value = this.date_from;
    let new_date = "";    
    
    new_date = moment(date_value).subtract(1, 'd').format('YYYY-MM-DD');
    this.date_from = new_date;

    this.get_tg_details();
    
  }

  downloadCsv(){
    let obj = this.sample_request;
    this.global.show_loader();
    this.tgStatsService.downloadCsvPopup(obj).subscribe((results) =>{
    let csvList = results.responseResult.result.csvPopList; 
    let headerLine = results.responseResult.result.headerLine; 
    let headerNames = results.responseResult.result.columnLine; 
    let fileName = results.responseResult.result.fileName; 
    let tgDescrLine = results.responseResult.result.tgDescrLine; 
    let csvdata = this.ConvertToCSV(csvList,headerLine,headerNames,tgDescrLine);
  
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
  
  ConvertToCSV(kpiList,headerLine,headerNames,tgDescrLine) {
    var tgarray = typeof kpiList != 'object' ? JSON.parse(kpiList) : kpiList;
    var str = '';
    str+=headerLine;
    str += '\r\n';
    str+=tgDescrLine;
    str += '\r\n';
    str += '\r\n';
    str+=headerNames;
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

  get_day_data(date_stamp){
    this.global.show_loader();
    let req = this.sample_request;
    let dateFrom = moment(date_stamp, "YYYYMMDD").format("YYYY-MM-DD");
    this.date_to_bck = this.date_to;
    this.date_to = "";
    this.date_from_bck = this.date_from;
    this.date_from = dateFrom;
    this.show_back_btn = true;

    req['toDate'] = "";
    req['fromDate'] = dateFrom;
    req['searchType'] = 'Daily Busy Hour';    

    this.tgStatsService.getTgDetails(req).subscribe((results) =>  {     
      let temp = [];
      
      if(this.gateway_tg.includes('SBC')){
        temp = results['responseResult'].result.sbcKpiList;
      } else {
        temp = results['responseResult'].result.kpiList;
      }

      temp.forEach((item, index, arr) => {
        if(item['inBandwidth'] == null){
          temp[index]['inBandwidth'] = 0;
        }

        if(item['outBandwidth'] == null){
          temp[index]['outBandwidth'] = 0;
        }
      });

      this.kpiList = temp;

      this.displayedColumns = ['timestampDateFormatted', 'circuitsAvailable', 'tgUtilisation', "tgInCallAtempts", 'maxInCpsProcessed', "maxInCpsAttempted"];      

      this.dataSource = new MatTableDataSource(this.kpiList);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
      this.global.hide_loader();    
   }, (err) => {
    this.global.hide_loader();
  });
  }
  
  back_to_busy_hour() {
    this.date_to = this.date_to_bck;
    this.date_to_bck = "";
    this.date_from = this.date_from_bck;
    this.date_from_bck = "";

    this.show_back_btn = false;

    this.displayedColumns = ['timestampDateFormatted', 'circuitsAvailable', 'tgUtilisation', "tgInCallAtempts", 'maxInCpsProcessed', "maxInCpsAttempted"];

    this.get_tg_details();
  }

}
