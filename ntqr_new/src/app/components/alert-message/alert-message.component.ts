import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild, } from '@angular/core';
import { GlobalService } from "../../services/global-service.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  @ViewChild('alertMessage', {static: false}) alertMessage: TemplateRef<any>;

  modal_obj = {title: "test", content: "test"};

  display_seconds = 5000;
  auto_close_option: boolean;

  constructor(private global:GlobalService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.global.modal_trigger.subscribe((obj) => {      
      this.modal_obj = obj;
      if(this.modal_obj.hasOwnProperty("close")){
        this.close_all_modals();
      }
      else if(this.modal_obj['color'] == undefined || this.modal_obj['color'] == "") {
        
        if(this.modal_obj.hasOwnProperty("display_seconds")){
          this.display_seconds = this.modal_obj["display_seconds"];
        }
        if(this.modal_obj.hasOwnProperty("auto_close")){
          this.auto_close_option = this.modal_obj["auto_close"];
        }        

        this.open_modal(this.alertMessage, "custom_modal");
      } 
      else if(this.modal_obj['color'] == "red"){                
        if(this.modal_obj.hasOwnProperty("display_seconds")){          
          this.display_seconds = this.modal_obj["display_seconds"];          
        }
        if(this.modal_obj.hasOwnProperty("auto_close")){          
          this.auto_close_option = this.modal_obj["auto_close"];          
        }
        this.open_modal_red(this.alertMessage, "custom_modal");
      }
      else if(this.modal_obj['color'] == "green"){
        
        if(this.modal_obj.hasOwnProperty("display_seconds")){
          this.display_seconds = this.modal_obj["display_seconds"];
        }
        if(this.modal_obj.hasOwnProperty("auto_close")){
          this.auto_close_option = this.modal_obj["auto_close"];
        }
        this.open_modal_green(this.alertMessage, "custom_modal");
      }      
    });
  }

  open_modal(template, class_string) {
    this.modalService.open(template, { windowClass: class_string, size: this.modal_obj['size'], centered: true });
    this.auto_close_modals(this.display_seconds, this.auto_close_option);
  }

  open_modal_red(template, class_string) {
    this.modalService.open(template, { windowClass: class_string + " red", size: this.modal_obj['size'], centered: true });
    this.auto_close_modals(this.display_seconds, this.auto_close_option);
  }

  open_modal_green(template, class_string) {
    this.modalService.open(template, { windowClass: class_string + " green", size: this.modal_obj['size'], centered: true });
    this.auto_close_modals(this.display_seconds, this.auto_close_option);
  }

  close_all_modals(){
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll("Alert Overed");
    }
  }

  auto_close_modals(seconds, auto_close?:boolean){   

    if(auto_close != undefined && auto_close == true) {
      setTimeout(() => {
        this.close_all_modals();      
      }, seconds);
    } 
  }

}
