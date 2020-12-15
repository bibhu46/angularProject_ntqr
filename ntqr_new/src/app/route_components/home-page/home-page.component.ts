import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  show_welcome: boolean = false; 

  constructor(private titleService: Title,private global: GlobalService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Home'); 
    if(localStorage.getItem('logged')=='true'){
      this.show_welcome=true;
    }
    if(this.show_welcome){
      let mess = "Welcome <span class='color-red'>"+ localStorage.getItem('username') + "</span>";        

      let modal_obj = {
        title: 'Welcome <span>Greet</span>',
        size: "sm",
        color: "green",                
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);

      setTimeout(() => {
        this.global.close_all_modals();
      }, 3000)
      localStorage.setItem('logged',"false");
      this.show_welcome = false;
    }
  }

}
