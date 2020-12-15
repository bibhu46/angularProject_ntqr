import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-expand-installednumber-country',
  templateUrl: './expand-installednumber-country.component.html',
  styleUrls: ['./expand-installednumber-country.component.css']
})
export class ExpandInstallednumberCountryComponent implements OnInit {
  public response: any
  public countryId: string;
  public monthHistoryList: []
  desc: string;
  name: string;
  date:string
  date_unit: string;
  date_from: string;
  loader: boolean;
  public serviceKeysList:[]
  displayTable: boolean;
  total: any;

  constructor(private nginService: NginInstNumberService, private aRoute: ActivatedRoute, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 5.2 View Service Key'); 
    this.date_unit = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.countryId=this.aRoute.snapshot.paramMap.get('countryId'); 
    this.desc=this.aRoute.snapshot.paramMap.get('desc');
    this.name=this.aRoute.snapshot.paramMap.get('name');
    this.date=this.aRoute.snapshot.paramMap.get('date');
    this.getServiceKeyInstalledNumbers(this.date);   
  }

  getServiceKeyInstalledNumbers(values: any) {
    console.log(values)
    this.global.show_loader();    
    let resp = this.nginService.getServiceKeyInstalledNumbers(this.countryId,values);
    resp.subscribe(

      data => {
        this.response = data;
        console.log(this.response)
        this.serviceKeysList = this.response.responseResult.result.serviceKeyList;
        this.total = this.response.responseResult.result.total
        this.displayTable = true;
        this.global.hide_loader();
      }
    )
  }

  onSubmit(values){
    this.getServiceKeyInstalledNumbers(values.date);
  }

  showPopUpHistory() {
    let url = "http://localhost:4200/"+"ngin5.2/installedNumbersPopup/"+this.countryId+"/"+this.desc+"/"+this.name+"/"+this.date;
    var x = screen.width / 2 - 700 / 2;
    var y = screen.height / 2 - 450 / 2;
    window.open(url, "NGIN Installed Number statistics-", 'height=785,width=800,left=' + x + ',top=' + y);
  }

  onClickdwnldcsv(){}
}
