import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { appConfig } from 'src/app/app.config';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-installed-numb',
  templateUrl: './installed-numb.component.html',
  styleUrls: ['./installed-numb.component.css']
})
export class InstalledNumbComponentV20 implements OnInit {

  public numPortList = [];
  public displayTable: boolean
  public response: any;
  public results = [];
  public loader: boolean
  public date: string
  public headerList: {}
  public countList: []
  public filename: string;
  public test: string
  totalValue: any;
  date_unit: string;
  date_from: string;
  date_array: string[];

  constructor(private nginInstNumService: NginInstNumberService, private global: GlobalService, private route: Router, private dataService: DataServiceService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Installed Numbers'); 
    this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD")
    this.date_unit = this.date_from;

    this.onSubmit();
  }

  onSubmit() {
    this.global.show_loader();
    this.loader = true
    this.date = this.date_unit;
    let resp = this.nginInstNumService.getNginInstNumbers({ date: this.date });
    resp.subscribe(

      data => {
        this.response = data;
        this.totalValue = this.response.responseResult.result.total;
        this.numPortList = this.response.responseResult.result.numberPortabilityModelList;
        console.log(this.numPortList)
        this.loader = false
        this.displayTable = true;
        this.global.hide_loader();
      }
    )
  }

  onClickdwnldcsv() {
    let resp = this.nginInstNumService.getCSVdataInstalledNumbers(this.date)
    resp.subscribe(
      data => {
        this.response = data;
        this.headerList = this.response.responseResult.result.headerNames;
        this.filename = this.response.responseResult.result.filename;
        this.countList = this.response.responseResult.result.countList;
        let csvdata = this.ConvertToCSV(this.countList, this.headerList);
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

  showPopUpHistory(countryId: string, desc: string, name: string) {
    
    let url = appConfig.hostUrl + "ngin20/installedNumbersPopup/" + countryId + "/" + desc + "/" + name + "/" + this.date;
    var x = screen.width / 2 - 700 / 2;
    var y = screen.height / 2 - 450 / 2;
    window.open(url,"NGIN Installed Number statistics-"+countryId,'height=785,width=800,left=' + x + ',top=' + y)  
  }

  showDetails(countryId: string, desc: string, name: string) {
    let date_new = this.date;
    this.date_array = this.date_from.split('-');
    date_new = this.date_array[0] + this.date_array[1] + this.date_array[2];
    console.log(date_new)
    let url = "ngin20/openServiceKey/" + countryId + "/" + desc + "/" + name + "/" + date_new;
    console.log(url)
    this.route.navigateByUrl(url);
  }
}
