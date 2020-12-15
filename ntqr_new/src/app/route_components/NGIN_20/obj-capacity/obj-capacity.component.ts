import { Component, OnInit } from '@angular/core';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { appConfig } from 'src/app/app.config';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-obj-capacity',
  templateUrl: './obj-capacity.component.html',
  styleUrls: ['./obj-capacity.component.css']
})
export class ObjCapacityComponentV20 implements OnInit {

  public response: any;
  public results = [];
  public ntsList = [];
  public deCnpList = [];
  public frCnpList = [];
  public nlCnpList=[];
  public objectModelList=[]
  public displayTable:boolean
  public loader:boolean
  date: any;
  descTrim:string
  servNamen: string;
  csvResponse:any
  filename: any;
  csvList:[]
  columnsLine: any;
  date_unit: string;
  date_from: string;

  constructor(private nginService: NginInstNumberService, private global: GlobalService,private titleService: Title) { }


  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Object Capacity'); 
    this.date_unit = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.onSubmit({date: this.date_unit});
  }
  onSubmit(values){
    this.global.show_loader();
    this.loader=true;
    let resp = this.nginService.getObjectCapacity(values);
    resp.subscribe(
      data=>{
          this.response=data;
          this.objectModelList=this.response.responseResult.result.serviceTypeObjectCapacityModelList;
          this.ntsList=this.response.responseResult.result.serviceTypeObjectCapacityModelList[0];
          this.deCnpList=this.response.responseResult.result.serviceTypeObjectCapacityModelList[1];
          this.frCnpList=this.response.responseResult.result.serviceTypeObjectCapacityModelList[2];
          this.nlCnpList=this.response.responseResult.result.serviceTypeObjectCapacityModelList[3];
          this.date=this.response.responseResult.result.date;
          this.loader=false
          this.displayTable=true;
          this.global.hide_loader();
      }
    )
  }
  
  showPopUpHistory(serviceId:string, desc:string, servName:string){
    
    //console.log(this.date+""+serviceId+""+this.descTrim+""+servName);
    this.descTrim=desc.replace(/\s/g, "")
    let descNew = "";
    let splitted = this.descTrim.split("(");
    descNew=splitted[0]+splitted[1];
    let splittedNew = descNew.split(")");
    let descNeww = splittedNew[0];
    //console.log(descNeww)
    //this.servNamen=servName.substring(2,servName.length)
    
     let url = appConfig.hostUrl+"ngin20/objectCapacityPopup/"+serviceId+"/"+descNeww+"/"+servName+"/"+this.date;
     var x = screen.width / 2 - 700 / 2;
    var y = screen.height / 2 - 450 / 2;
    window.open(url, "Object Capacity -", 'height=785,width=800,left=' + x + ',top=' + y);
     
  }

  onClickdwnldcsv(){
    let resp = this.nginService.getObjCapCSV(this.date)
    resp.subscribe(
      data=>{
        console.log(data)
        this.csvResponse=data
        this.filename = this.csvResponse.responseResult.result.fileName;
        this.csvList=this.csvResponse.responseResult.result.csvList;
        console.log(this.csvList)
        this.columnsLine=this.csvResponse.responseResult.result.columnsLine;
        let csvdata = this.ConvertToCSV(this.csvList, this.columnsLine);
        
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

}
