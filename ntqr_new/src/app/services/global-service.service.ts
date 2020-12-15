import { Injectable, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  constructor(private modalService: NgbModal) { }

  @Output()
  modal_trigger: EventEmitter<Object> = new EventEmitter<Object>();

  @Output() 
  preloader:EventEmitter<Object> = new EventEmitter<Object>();

  show_loader(){
    this.preloader.emit(true);
  }

  hide_loader(){
    this.preloader.emit(false);
  }

  open_alert_message(obj){    
    this.modal_trigger.emit(obj);
  }

  close_alert_message() {
    this.modal_trigger.emit({ close: true });
  }

  close_all_modals() {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
  }

  to_datepicker_format(str){
    let date_arr = str.split('-');
    let picker_obj = { year: Number(date_arr[0]), month: Number(date_arr[1]), day: Number(date_arr[2]) };

    return picker_obj;
  }

  to_date_format(obj){

    if(obj['month'].length < 2){
      let temp = '0' + obj['month'];
      obj['month'] = temp;
    }

    if(obj['day'].length < 2){
      let temp2 = '0' + obj['day'];
      obj['day'] = temp2;
    }

    let str_date = obj['year'] + '-' + obj['month'] + '-' + obj['day'];

    return str_date;
  }

}
