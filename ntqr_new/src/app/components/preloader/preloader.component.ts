import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../services/global-service.service";

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  show_preloader:boolean;
  inner_height: number;
  style_prop:any;

  constructor(private global:GlobalService) { }

  ngOnInit(): void {
    this.show_preloader = false;  
    this.style_prop = { height: window.document.documentElement.scrollHeight + "px" };    

    this.global.preloader.subscribe(state => {      
      this.show_preloader = state;      
      this.inner_height = window.outerHeight;
      this.style_prop = { height: window.document.documentElement.scrollHeight + "px" };      
    });
  }

}
