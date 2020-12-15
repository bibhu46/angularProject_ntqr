import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NginInstNumberService } from 'src/app/services/ngin/ngin-inst-number.service';
import { GlobalService } from 'src/app/services/global-service.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-popup-installed-num',
  templateUrl: './popup-installed-num.component.html',
  styleUrls: ['./popup-installed-num.component.css']
})
export class PopupInstalledNumComponentV20 implements OnInit {

 
  public response: any
  public countryId: string;
  public monthHistoryList: any[] = [];
  desc: string;
  name: string;  
  date_unit: string;
  date_from: string;
  sel_month: string;
  
  constructor(private nginService: NginInstNumberService, private aRoute: ActivatedRoute, private global: GlobalService,private titleService: Title) { }


  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Installed Numbers Popup'); 
    this.date_unit = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.countryId=this.aRoute.snapshot.paramMap.get('countryId'); 
    this.desc=this.aRoute.snapshot.paramMap.get('desc');
    this.name=this.aRoute.snapshot.paramMap.get('name');
    this.sel_month = this.aRoute.snapshot.paramMap.get('date');    
   
    this.getInstNumImgHistory(this.countryId, this.sel_month)
  }
  // public ngOnDestroy(): void {
  //   this.contryResp.unsubscribe();
  // }

  public getInstNumImgHistory(countryId, date) {
    console.log("date from the box");
    console.log(this.sel_month); 
    let date_format = moment(date).format('MM/YYYY');
     //console.log(value)
    let resp = this.nginService.getImgPopDetails(countryId, date_format);
    this.global.show_loader();
    
    resp.subscribe(
      data => {
        this.response = data
        this.monthHistoryList = this.response.responseResult.result.monthList;
        console.log(this.monthHistoryList);
        this.global.hide_loader();
      }
    )
  }
 
  onSubmit(value){
    this.getInstNumImgHistory(this.countryId, value.sel_month);
  }

}
