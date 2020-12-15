import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormControlName, Validators, FormArray, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/services/global-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as _ from "underscore";
import * as moment from "moment";
import { WatchlistService } from 'src/app/services/sonus/watchlist.service';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-watchlist',
  templateUrl: './manage-watchlist.component.html',
  styleUrls: ['./manage-watchlist.component.scss']
})
export class ManageWatchlistComponent implements OnInit {
  search_text: string = "";
  watchlist_data: any[] = [];
  selected_folder = {};
  searchTypeList: any;
  type_list: any[] = [];
  from_date: string;
  to_date: string;
  tg_list: any[] = [];
  users_list: any[] = [];  
  alert_period: string[];
  previous_folder_name: string;
  current_folder_opened: number;
  remove_tg_name;
  remove_tg_id;
  remove_tg_from_folder;
  selected_tg_count: number = 0;
  remove_folder_obj = {};
  searchLoader: boolean = false;

  @ViewChild('editWatchlist', { static: false }) editWatchlist: TemplateRef<any>;
  @ViewChild('addWatchlist', { static: false }) addWatchlist: TemplateRef<any>;
  @ViewChild('globalNotification', { static: false }) globalNotification: TemplateRef<any>;
  @ViewChild('moveWatchlist', { static: false }) moveWatchlist: TemplateRef<any>;
  @ViewChild('utilThreshold', { static: false }) utilThreshold: TemplateRef<any>;
  @ViewChild('shareTg', { static: false }) shareTg: TemplateRef<any>;
  @ViewChild('acc') folderListAccordion: NgbAccordion;
  @ViewChild('removeTgPermission', { static: false }) removeTgPermission: TemplateRef<any>;
  @ViewChild('removeFolderPermission', { static: false }) removeFolderPermission: TemplateRef<any>;  

  folder_form;
  threshold_form;

  edit_watchlist_form = new FormGroup({
    folder_name: new FormControl({ value: "", disabled: false}, [Validators.required]),
    email_alert: new FormControl({ value: "", disabled: false}),
    email_address: new FormControl({ value: "", disabled: false}) ,
    notify_period: new FormArray([])   
  });

  add_watchlist_form = new FormGroup({
    folder_name: new FormControl({ value: "", disabled: false}, [Validators.required]),
    email_alert: new FormControl({ value: "", disabled: false}),
    email_address: new FormControl({ value: "", disabled: false}),
    notify_period: new FormArray([])          
  });

  global_watchlist_form = new FormGroup({
    folder_name: new FormControl({ value: "", disabled: false}, [Validators.required]),
    email_alert: new FormControl({ value: "", disabled: false}),
    email_address: new FormControl({ value: "", disabled: false}),
    notify_period: new FormArray([])          
  });

  move_watchlist_form = new FormGroup({
    folder_name: new FormControl({ value: "", disabled: false}, [Validators.required])      
  });  

  share_form = new FormGroup({
    folder_name: new FormControl({ value: "", disabled: false}, [Validators.required]),   
    share_user: new FormControl({ value: "", disabled: false}, [Validators.required])      
  });

  get folder_form_array() { return this.folder_form.get('arr') as FormArray; }
  get threshold_array() { return this.threshold_form.get('arr') as FormArray; } 

  folderSettings:IDropdownSettings = {};
  userSettings: IDropdownSettings = {};

  get alert_notify_arr() { return this.add_watchlist_form.get('notify_period') as FormArray };
  get edit_notify_arr() { return this.edit_watchlist_form.get('notify_period') as FormArray };

  constructor(private global: GlobalService, private modalService: NgbModal, private api: WatchlistService, private fb: FormBuilder, private cd: ChangeDetectorRef, private titleService: Title) { }

  ngOnInit(): void {    
    this.titleService.setTitle('Manage Watchlist');
    this.folderSettings = {
      singleSelection: true,      
      selectAllText: 'Select All',      
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'name',
      idField: 'name',
    }

    this.userSettings = {
      singleSelection: true,      
      selectAllText: 'Select All',      
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'label',
      idField: 'value',
      maxHeight: 80,
      closeDropDownOnSelection: true      
    }

    this.from_date = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.to_date = moment().format("YYYY-MM-DD");

    this.alert_period = ["daily", "weekly", "monthly"];

    this.folder_form = this.fb.group({
      arr: this.fb.array([])
    });

    this.threshold_form = this.fb.group({
      folder_name: this.fb.control(['']),
      arr: this.fb.array([])
    });

    this.getAll(0);   
  
  }

  applyFilter(event: Event) {
    const filterValue = this.search_text;    
  }  

  open_edit_watchlist(obj){
    this.previous_folder_name = obj['name'];
    this.edit_notify_arr.clear();  
    this.edit_watchlist_form.patchValue({
      folder_name: this.previous_folder_name      
    });

    this.alert_period.forEach(item => {
      this.add_edit_period(false);
    });
    this.open_watchlist_modal(this.editWatchlist);
  }

  open_add_watchlist(){
    this.alert_notify_arr.clear();
    this.alert_period.forEach(item => {
      this.add_period(false);
    });
    this.add_watchlist_form.reset();
    this.open_watchlist_modal(this.addWatchlist);
  }

  open_global_notification(){
    this.open_watchlist_modal(this.globalNotification);
  }

  open_move_watchlist(){ 
    this.open_watchlist_modal(this.moveWatchlist);
  }

  open_share_tg(obj){
    
    this.share_form.patchValue({
      folder_name: obj['name']
    });
    this.open_watchlist_modal(this.shareTg);
  }

  open_util_threshold(){
    this.threshold_form.patchValue({
      folder_name: this.selected_folder['name']
    }); 
    this.load_trunks();
    this.open_threshold_modal(this.utilThreshold);
  }

  open_watchlist_modal(template){
    this.modalService.open(template, { centered: true, size: 'md', scrollable: true, windowClass: 'custom-modal', backdropClass: 'backdrop-class' });
  }
  
  open_threshold_modal(template){
    this.modalService.open(template, { centered: true, size: 'xl', scrollable: true, windowClass: 'custom-modal', backdropClass: 'backdrop-class' });
  }

  open_remove_tg_modal(){ 
    this.open_watchlist_modal(this.removeTgPermission);
  }

  open_folder_permission(){ 
    this.open_watchlist_modal(this.removeFolderPermission);
  }
  

  on_folder_select(ev){}

  on_folder_deselect(ev){}

  getAll(num?:number){
    if(num == undefined || num == null){
      num = 0;
    }
    this.global.show_loader();
    this.api.getAll().subscribe((results) =>{
      this.type_list = results.responseResult.result.foldersList;
      this.searchTypeList = results.responseResult.result.searchTypeList;
      this.users_list = results.responseResult.result.usersList;
      
      if(this.selected_folder.hasOwnProperty('name') == false){
        this.selected_folder = this.type_list[0];
      }

      this.load_trunks();

      this.global.hide_loader();
     }, (err) => {
      this.global.hide_loader();
    });
  }
  
  accord_row_click(ev, list){
    this.selected_folder = list;
    this.load_trunks();
  }

  load_trunks(){    
    this.global.show_loader();
    this.api.searchTrunkgroups(this.searchTypeList[0]['label'], this.selected_folder['name'],'', '', this.from_date).subscribe((results) => {      
      this.tg_list = results.responseResult.result.watchlist == null ? [] : results.responseResult.result.watchlist;

      this.selected_tg_count = 0;
      
      //this.folderListAccordion.toggle("ngb-panel-" + ind);

      this.load_form_options();
      this.load_threshold_options();         
      this.global.hide_loader();
    });
  }

  add_folder(){
    let fv = this.add_watchlist_form.value;

    if(this.add_watchlist_form.valid){
      this.global.show_loader();
      this.api.saveFolder(fv.folder_name).subscribe(data => {    
        this.getAll();
        this.global.hide_loader();
        this.global.close_all_modals();
        
        let mess = "The folder <span class='color-red'>"+ fv.folder_name +"</span> has been added successfully";

        let modal_obj = {
          title: 'Add <span> Folder </span> Status',
          size: "sm",
          color: "green",
          auto_close: false,
          content: '<p class="text-center my-3">' + mess + '</p>'
        };

        this.global.open_alert_message(modal_obj);
      }, (err) => {
        this.global.hide_loader();
      });
    } else {

    }
  }

  edit_folder(){
    let fv = this.edit_watchlist_form.value;    
        
    if(this.edit_watchlist_form.valid){
      this.global.show_loader();
      this.api.editFolder(fv.folder_name, this.previous_folder_name).subscribe(data => { 
        this.global.hide_loader();
        this.global.close_all_modals();

        let mess = "The folder <span class='color-red'>"+ this.previous_folder_name +"</span> has been renamed to <span class='color-red'>"+ fv.folder_name +"</span> successfully.";

        let modal_obj = {
          title: 'Edit <span> Folder </span> Status',
          size: "sm",
          color: "green", 
          auto_close: false,
          content: '<p class="text-center my-3">' + mess + '</p>'
        };

        this.global.open_alert_message(modal_obj);
        this.getAll(this.current_folder_opened);        
      }, (err) => {
            this.global.hide_loader();
      });
    } else {

    }
  }

  share_folder(){
    let fv = this.share_form.value;
    if(this.share_form.valid){
      this.global.show_loader();
      this.api.shareFolder(fv.folder_name, fv.share_user['label']).subscribe(data => {
        this.global.hide_loader();
        this.global.close_all_modals();
        let mess = "The folder <span class='color-red'>"+ fv.folder_name +"</span> has been added shared successfully to "+ fv.share_user['label'];

        let modal_obj = {
          title: 'Share <span> Folder </span> Status',
          size: "sm",
          color: "green",
          auto_close: false,
          content: '<p class="text-center my-3">' + mess + '</p>'
        };

        this.global.open_alert_message(modal_obj);
      }, err => {
          this.global.hide_loader();
      });
    }
    
  }

  add_period(val) {
    let period = new FormControl({ value: val, disabled: false });
    this.alert_notify_arr.push(period);
  }

  add_edit_period(val) {
    let period = new FormControl({ value: val, disabled: false });
    this.edit_notify_arr.push(period);
  }

  remove_folder(obj){
    this.remove_folder_obj = obj;
    this.open_folder_permission();
  }

  yes_clicked_folder(){
    this.global.show_loader();
    this.api.removeFolder(this.remove_folder_obj['name']).subscribe(data => {
      this.global.hide_loader();   
      this.getAll(this.current_folder_opened);
      
      this.global.close_all_modals();
      
      let mess = "The <span class='color-red'>"+ this.remove_folder_obj['name'] +"</span> folder removed successfully.";

      let modal_obj = {
        title: 'Remove <span> Folder </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);      

    }, (err) => {
         this.global.hide_loader();
    });
  }

  load_form_options() {
    if(this.folder_form_array !== null && this.folder_form_array.length > 0){
      this.folder_form_array.clear();
    }

    if(this.tg_list.length > 0){
      this.tg_list.forEach((item, index, arr) => {
        this.add_form_option({ select_state: false, notify_state: item['sendEmail'], tg_id: item['tgId']});
      });
    }    
  }

  load_threshold_options() {
    if(this.threshold_array !== null && this.threshold_array.length > 0){
      this.threshold_array.clear();
    }

    if(this.tg_list.length > 0){
      this.tg_list.forEach((item, index, arr) => {
        this.add_threshold_option({ threshold_util: item['thresholdUtilisation'], notify_state: item['sendEmail'], tg_id: item['tgId']});
      });
    }    
  }

  add_form_option(obj){

    const option_group = this.fb.group({
      select_state: [obj['select_state']],
      notify_state: [obj['notify_state']],
      tg_id: [obj['tg_id']]
    }); 
  
    this.folder_form_array.push(option_group);    
  }

  add_threshold_option(obj){

    const option_group = this.fb.group({
      threshold_util: [obj['threshold_util']],
      notify_state: [obj['notify_state']],
      tg_id: [obj['tg_id']]
    }); 
  
    this.threshold_array.push(option_group);    
  }

  move_tg(){  
    let fv = this.folder_form.value.arr;

    let move_form = this.move_watchlist_form.value;
    let tg_selected = [];    

    fv.forEach((item) => {
      if(item['select_state']){
        tg_selected.push(item['tg_id']);
      }
    });

    if(this.move_watchlist_form.valid && tg_selected.length > 0){
      let submit_obj = {
        folderToMove: move_form.folder_name[0]['name'],     
        tgIdList: tg_selected,
        username: localStorage.getItem("username")
      };      
      this.global.show_loader();
      this.api.moveFolder(submit_obj).subscribe(result => {       
        this.global.hide_loader();
        this.global.close_all_modals();
        let mess = "Selected trunks has been moved to folder <span class='color-red'> "+ submit_obj['folderToMove'] + "</span> successfully.";

        let modal_obj = {
          title: 'Move <span> Trunkgroups </span> Status',
          size: "sm",
          color: "green",
          auto_close: false,
          content: '<p class="text-center my-3">' + mess + '</p>'
        };

        this.global.open_alert_message(modal_obj);

        this.getAll(this.current_folder_opened);
      });
    } else {
        
        let mess = "Select atleast one folder and one trunkgroup to perform move operation.";

        let modal_obj = {
          title: 'Move <span> Trunkgroups </span> Status',
          size: "sm",
          color: "red",
          auto_close: false,
          content: '<p class="text-center my-3">' + mess + '</p>'
        };

        this.global.open_alert_message(modal_obj);
        
    }
  }

  remove_tg(tg_name, tg_id, fol_name){
    this.remove_tg_name = tg_name;
    this.remove_tg_id = tg_id;
    this.remove_tg_from_folder = fol_name;

    this.open_remove_tg_modal();
    
  }

  yes_clicked(){
    this.global.show_loader();
    this.api.removeTg(this.remove_tg_id, this.remove_tg_from_folder).subscribe(data => {
      this.global.hide_loader();
      this.global.close_all_modals();
      let mess = "The trunkgroup <span class='color-red'>"+ this.remove_tg_name +"</span> has been removed from the folder "+ this.remove_tg_from_folder + ".";

      let modal_obj = {
        title: 'Remove <span> Trunkgroup </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);

      this.remove_tg_name = "";
      this.remove_tg_id = "";
      this.remove_tg_from_folder = "";

      this.getAll(this.current_folder_opened);

    });
  }

  cpu_usage(usage,threshold){
    if(threshold == null || threshold > usage){
      return "green";
    } else if(usage >= threshold){
      return "red";
    }
  }

  check_all(ev){    
    let arr_temp = this.folder_form.value.arr;        

    arr_temp.forEach((item, index, arr) => {
      if(ev.target.checked){
        arr_temp[index]['select_state'] = true;
      } else {
        arr_temp[index]['select_state'] = false;
      }
      
    }); 

    this.folder_form_array.patchValue(arr_temp);

    this.selected_tg();
   
  }

  enable_notification(str){
    let arr_temp = this.folder_form.value.arr;  
    let tg_ids = [];      

    arr_temp.forEach((item, index, arr) => {
      if(item.select_state){
        tg_ids.push(this.tg_list[index]['tgId']);
      }      
    });

    let submit_obj = {
      notif: str == true ? "Send email" : "Do not send email",
      tgIdList: tg_ids,
      username: localStorage.getItem("username")
    };
    this.global.show_loader();
    this.api.notifyToTg(submit_obj).subscribe(data => {
      this.global.hide_loader();     

      this.getAll(this.current_folder_opened);
      
    }, err => {
        this.global.hide_loader();
    });
  }

  enable_notify(ev, tg_id, tg_name){
    let str = ev.target.checked;
    let tg_ids = [tg_id];
     
    let submit_obj = {
      notif: str == true ? "Send email" : "Do not send email",
      tgIdList: tg_ids,
      username: localStorage.getItem("username")
    };

    this.global.show_loader();
    this.api.notifyToTg(submit_obj).subscribe(data => {
      this.global.hide_loader();
      let mess = "The trunkgroup <span class='color-red'>"+ tg_name +"</span> has been updated with status successfully.";

      let modal_obj = {
        title: 'Notification <span> Status </span> Of Trunkgroup',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);
      this.load_trunks();
      
    }, err => {
        this.global.hide_loader();
    });
  }

  selected_tg(){
    let arr_temp = this.folder_form.value.arr;  
    let count = 0;      

    arr_temp.forEach((item, index, arr) => {
      if(item.select_state){
        count++
      }      
    });

    this.selected_tg_count = count;
  }

  threshold_save(){    

    let fv = this.threshold_form.value;
    let temp = {};
    let watch_arr = [];

    fv.arr.forEach((item) => {
      temp = {};
      temp['tgId'] = item['tg_id'];
      temp['thresholdUtilisation'] = item['threshold_util'];

      watch_arr.push(temp);
    });

    let submit_obj = {      
      watchlistListThreshold: watch_arr
    };    
    this.global.show_loader();
    this.api.updateThreshold(submit_obj).subscribe(data => {
      this.global.hide_loader();
      this.global.close_all_modals();
      let mess = "The threshold <span class='color-red'> values </span> has been updated successfully.";

      let modal_obj = {
        title: 'Threshold <span> Utilisation </span> Update Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);
      this.load_trunks();

    }, (err) => {
      this.global.hide_loader();
    });
  }

  save_global_notification(){
    let fv = this.global_watchlist_form.value;

    let submit_obj = {
      "notif": fv.email_alert == true ? "Send email" : "Do not send email",
      "username": localStorage.getItem("username")
    }
    this.global.show_loader();
    this.api.notifyToAllTg(submit_obj).subscribe(data => {      
      this.global.hide_loader();
      this.global.close_all_modals();
      let mess = "The global <span class='color-red'> notification </span> settings has been updated successfully.";

      let modal_obj = {
        title: 'Global <span> Notification </span> Update Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);
      this.load_trunks();

    }, err => {
        this.global.hide_loader();
    });
  }   

}
