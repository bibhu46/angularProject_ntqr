import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NTQR_Web_v2';
  navEnd: Observable<NavigationEnd>;
  current_address: string;
  show_header: boolean = false;  

  constructor(private router: Router, private activatedRoute:ActivatedRoute, locate:Location,){
    router.events.subscribe((val) => {        
      this.current_address = this.router.url;
      //Sonus
      let dailyBusyHourPattern = new RegExp('^/sonus/trunkGroupStatisticsPopup/.*');
      let devicestats = new RegExp('^/sonus/devicestats/.*');  
      //NGIN-5.2
      let insalledNumPopup = new RegExp('^/ngin5.2/installedNumbersPopup/.*');
      let imgPopupObjCapPopup = new RegExp('^/ngin5.2/objectCapacityPopup/.*');
      let callatmptpop = new RegExp('^/ngin5.2/callAttemptsPopup/.*');
      let sysStatsImgHis = new RegExp('^/ngin5.2/systemStatisticsPopup/.*');
      let mrfstats = new RegExp('^/ngin5.2/mrfStatisticsPopup/.*');     

      if(this.current_address === "/login"  || dailyBusyHourPattern.test(this.current_address) ||   insalledNumPopup.test(this.current_address)   || imgPopupObjCapPopup.test(this.current_address) || callatmptpop.test(this.current_address) || sysStatsImgHis.test(this.current_address) || mrfstats.test(this.current_address) ||  devicestats.test(this.current_address)){
        this.show_header = false;        
      } else { 
        this.show_header = true;        
      }
            
    });
          
    this.navEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  
}
