import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sonus-help',
  templateUrl: './sonus-help.component.html',
  styleUrls: ['./sonus-help.component.scss']
})
export class SonusHelpComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sonus Help');  
  }

}
