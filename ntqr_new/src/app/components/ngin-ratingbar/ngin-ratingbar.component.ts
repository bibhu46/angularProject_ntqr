import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngin-ratingbar',
  templateUrl: './ngin-ratingbar.component.html',
  styleUrls: ['./ngin-ratingbar.component.css']
})
export class NginRatingbarComponent implements OnInit {

  @Input() max_value?: number = undefined;
  @Input() current_value?: number = undefined;
  @Input() min_value?: number = this.max_value / 2;
  @Input() bar_color?: string = "green";
  @Input() tooltip_desc?: string = "";
  @Input() higher_in_bandwidth?: number;
  @Input() higher_out_bandwidth?: number;
  @Input() column_name?: string = "";
  @Input() row_object?: Object;
  @Input() percentage?: number;
  @Input() show_max?: boolean;
  @Input() show_current?: boolean = true;
  @Input() show_percent?: boolean = false;
  @Input() show_percentage?: boolean = false;
  @Input() gateway?: string = "";
  @Input() threshold_trunkgroup_utilisation?: number;

  style_generated: object;
  status_green: boolean = false;
  status_red: boolean = false;
  show_sbc: boolean = false;
  sbc_bar: boolean;
  sbc_text: any;
  //show_current_value: boolean;

  constructor() { }

  ngOnInit(): void {
    /* assigning default values in case of null or no value ------------------------------- */
    
    if(this.current_value == null || this.current_value == undefined){
      this.current_value = 0;
    }

    if(this.max_value == null || this.max_value == undefined){
      this.max_value = 0;
    } 

    // if(this.percentage == undefined) {
    //   this.show_current = true;
    // } else {
    //     this.show_current = false;
    // }
    
    var percent;
    if(this.current_value == 0){
      percent = 0;
    } else if (this.max_value == 0 && this.current_value !== 0){
        percent = this.current_value;
     } else if(this.percentage == null || this.percentage == undefined) {        
        percent = (this.current_value / this.max_value ) * 100;
        if(this.current_value == this.max_value && this.current_value < 100){
          percent = this.current_value;
        }
                             
    } else {
        percent = this.percentage;
    }    

    /* assigning the bar color with this value bar_color ------------------------------- */

    if(this.bar_color !== undefined || this.bar_color !== ''){
      if(this.bar_color == 'green'){
        this.status_green = true;
        this.status_red = false;
      }
      else if(this.bar_color == 'red'){        
        this.status_red = true;
        this.status_green = false;
      }
    } 

    /* deciding red or green horizontal bar  to use based on higher_in_bandwidth value ------------------------------- */

    if(this.higher_in_bandwidth !== undefined && this.higher_in_bandwidth !== null){
      if(this.higher_in_bandwidth > 0 ){
        this.status_green = true;
        this.status_red = false;
      } else {
        
          this.status_green = false;
          this.status_red = true;          
      }
    } 
    else if(this.higher_out_bandwidth !== undefined && this.higher_out_bandwidth !== null){        
        if(this.higher_out_bandwidth > 0){
          this.status_green = true;
          this.status_red = false;
        } else {
          
            this.status_green = false;
            this.status_red = true;            
        }
    } 

    /* checking gateway field value is provided ------------------------------- */
    
    if(this.gateway !== ""){
      this.row_object['gateway'] = this.gateway;
      if(this.row_object.hasOwnProperty('gateway')){       
        if(this.row_object['gateway'].includes("SBC")){
          this.show_sbc = true;
          switch(this.column_name){
            case 'InCpsProcessed':
              this.sbc_text = this.row_object['maxInCpsProcessedSbc'];
              
              if(this.sbc_text == null || typeof(this.sbc_text) == "number"){
                if(this.sbc_text == null){ this.sbc_text = 0;}
                this.current_value = this.sbc_text;
                this.max_value = this.sbc_text;
                percent = (this.current_value / this.max_value) * 100;
                if(this.current_value == this.max_value && this.current_value < 100){
                  percent = this.current_value;
                  this.max_value = 100;
                }
                this.sbc_bar = true;
              } else {
                  this.sbc_bar = false;
              }
              break;
            case 'OutCpsProcessed':
              this.sbc_text = this.row_object['maxOutCpsProcessedSbc'];
              if(this.sbc_text == null || typeof(this.sbc_text) == "number"){
                if(this.sbc_text == null){ this.sbc_text = 0;}
                this.current_value = this.sbc_text;
                this.max_value = this.sbc_text;
                percent = (this.current_value / this.max_value) * 100;
                if(this.current_value == this.max_value && this.current_value < 100){
                  percent = this.current_value;
                  this.max_value = 100;
                }
                this.sbc_bar = true;
              }
              break;
            case 'InCpsAttempted':
              this.sbc_text = this.row_object['maxInCpsAttemptedSbc'];
              if(this.sbc_text == null || typeof(this.sbc_text) == "number"){
                if(this.sbc_text == null){ this.sbc_text = 0;}
                this.current_value = this.sbc_text;
                this.max_value = this.sbc_text;
                percent = (this.current_value / this.max_value) * 100;
                if(this.current_value == this.max_value && this.current_value < 100){
                  percent = this.current_value;
                  this.max_value = 100;
                }
                this.sbc_bar = true;
              } else {
                this.sbc_bar = false;
              }            
              break;
            case 'OutCpsAttempted':
              this.sbc_text = this.row_object['maxOutCpsAttemptedSbc'];
              if(this.sbc_text == null ||  typeof(this.sbc_text) == "number"){
                if(this.sbc_text == null){ this.sbc_text = 0;}
                this.current_value = this.sbc_text;
                this.max_value = this.sbc_text;
                percent = (this.current_value / this.max_value) * 100;
                if(this.current_value == this.max_value && this.current_value < 100){
                  percent = this.current_value;
                  this.max_value = 100;
                }
                this.sbc_bar = true;
              } else {
                this.sbc_bar = false;
              }
              break;
            default: 
              this.sbc_bar = true;
          }
          
        } else {
          this.show_sbc = false;
        }
      }      
    } 

    /* letting the bar to have a minimal width ------------------------------- */
    if(percent > 0 && percent < 6){
      percent = 6;
    }

    this.style_generated = { width: percent + "%" };    

    if(this.percentage !== undefined && this.percentage !== null){      
      this.style_generated = { width: this.percentage + "%" };      
    }

    if(this.threshold_trunkgroup_utilisation !== undefined) {
      if(this.current_value > this.threshold_trunkgroup_utilisation){
        this.status_red = true;
        this.status_green = false;
      } else if (this.threshold_trunkgroup_utilisation == null || this.threshold_trunkgroup_utilisation > this.current_value) {
        this.status_red = false;
        this.status_green = true;
      }
    }
    
  }

}