import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorization/authorize.service';
import { GlobalService } from "../../services/global-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  current_address: string;
  show_logout: boolean;
  current_user: string = "";

  constructor(private service: AuthorizeService, private router: Router, private global: GlobalService) { 
    router.events.subscribe((val) => {        
      this.current_address = this.router.url;

      if(this.current_address == "login"){
        this.show_logout = false;
      } else {
        this.show_logout = true;
      }

    });
  }

  ngOnInit(): void {

    if(localStorage.getItem('username') !== ""){
      this.current_user = localStorage.getItem('username');
    }
  }

  logout(){
    this.service.logOut();
    this.router.navigateByUrl('/login');
  }

}
