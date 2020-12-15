import { Component, OnInit } from '@angular/core';
import { NgindatadashboardService } from 'src/app/services/ngin/ngindatadashboard.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-data-availability',
  templateUrl: './data-availability.component.html',
  styleUrls: ['./data-availability.component.css']
})
export class DataAvailabilityComponentV20 implements OnInit {

  public installedNumbersList = [];
  public objectCapacityList = [];
  public callAttemptsALUList = [];
  public systemStatisticsList = [];
  public callAttemptsList: [];
  public mrfStatisticsList = [];
  public response: any;
  public results = [];
  public loadtable:boolean
  public loader:boolean

  constructor(private ngin: NgindatadashboardService, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Data Availability'); 
    this.loader=true
    let resp=this.ngin.getNginDataDashboard();
   resp.subscribe(
      data=>{
        this.response=data;
        this.installedNumbersList=this.response.responseResult.result.installedNumbersList;
        this.objectCapacityList=this.response.responseResult.result.objectCapacityList;
        this.callAttemptsALUList=this.response.responseResult.result.callAttemptsALUList;
        this.systemStatisticsList=this.response.responseResult.result.systemStatisticsList;
        this.callAttemptsList=this.response.responseResult.result.callAttemptsList;
        this.mrfStatisticsList=this.response.responseResult.result.mrfStatisticsList;
        console.log(data);
        this.loader=false
        this.loadtable=true
 
      })
  }

}
