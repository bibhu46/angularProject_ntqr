import { Component, OnInit } from '@angular/core';
import { SonusdataavailService } from 'src/app/services/sonus/sonusdataavail.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { FormControl, FormGroup, FormControlName, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

export class Obj {
  constructor(
    public deviceName: string,
    public desc: string,
  ) {  }
}
@Component({
  selector: 'app-sonus-data-availability',
  templateUrl: './sonus-data-availability.component.html',
  styleUrls: ['./sonus-data-availability.component.scss']
})
export class SonusDataAvailabilityComponent implements OnInit {

  filter_form = new FormGroup({
    desc: new FormControl({ value: "", disabled: false}),
  });

  availability_form;

  get psx_array() { return this.availability_form.get('psx_arr') as FormArray; }
  get gsx_array() { return this.availability_form.get('gsx_arr') as FormArray; }
  get nbs_array() { return this.availability_form.get('nbs_arr') as FormArray; }
  get ems_array() { return this.availability_form.get('ems_arr') as FormArray; }
  get dsi_array() { return this.availability_form.get('dsi_arr') as FormArray; }

  public gsxList = [];
  public nbsList =[];
  public psxList = [];
  public emsList = [];
  public dsiList = [];
  public response: any;
  public results = [];
  public total_records = 0;
  public check: boolean =true;
  public desc: any;

  constructor(private sonusData: SonusdataavailService, private global: GlobalService,private titleService: Title, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sonus Data Availability');
    this.global.show_loader();   

    this.availability_form = this.fb.group({      
      psx_arr: this.fb.array([]),
      gsx_arr: this.fb.array([]),
      nbs_arr: this.fb.array([]),
      ems_arr: this.fb.array([]),
      dsi_arr: this.fb.array([])
    });

    this.load_data();
  }

  edit(ind){
    this.check = false;
  }

  edit_psx(ind){
    let state = this.psx_array.at(ind)['check_state'];     
    this.psx_array.at(ind).get('device_descr').enable();
    this.psx_array.at(ind).patchValue({ check_state: !state});    
    this.psx_array.updateValueAndValidity();    
  }

  edit_gsx(ind){
    let state = this.gsx_array.at(ind)['check_state'];     
    this.gsx_array.at(ind).get('device_descr').enable();
    this.gsx_array.at(ind).patchValue({ check_state: !state});    
    this.gsx_array.updateValueAndValidity();    
  }

  edit_nbs(ind){
    let state = this.gsx_array.at(ind)['check_state'];     
    this.nbs_array.at(ind).get('device_descr').enable();
    this.nbs_array.at(ind).patchValue({ check_state: !state});    
    this.nbs_array.updateValueAndValidity();    
  }

  edit_ems(ind){
    let state = this.ems_array.at(ind)['check_state'];     
    this.ems_array.at(ind).get('device_descr').enable();
    this.ems_array.at(ind).patchValue({ check_state: !state});    
    this.ems_array.updateValueAndValidity();    
  }

  edit_dsi(ind){
    let state = this.dsi_array.at(ind)['check_state'];     
    this.dsi_array.at(ind).get('device_descr').enable();
    this.dsi_array.at(ind).patchValue({ check_state: !state});    
    this.dsi_array.updateValueAndValidity();    
  }
  

  save_psx(ind){
    let fv = this.psx_array.at(ind).value; 
    let state = this.psx_array.at(ind)['check_state'];
    
    this.global.show_loader();
    this.sonusData.editDeviceDesc(fv.device_name, fv.device_descr).subscribe(data => {
        this.global.hide_loader();
        this.psx_array.at(ind).get('device_descr').disable();
        this.psx_array.at(ind).patchValue({ check_state: !state});

        this.load_data();
        
        let mess = "The Device  <span class='color-red'>"+ fv.device_name +"</span> has been updated successfully with description <span class='color-red'>" + fv.device_descr + "</span>";

        let modal_obj = {
          title: 'Update <span> Description </span> Status',
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

  save_gsx(ind){
    let fv = this.gsx_array.at(ind).value; 
    let state = this.gsx_array.at(ind)['check_state'];
    
    this.global.show_loader();
    this.sonusData.editDeviceDesc(fv.device_name, fv.device_descr).subscribe(data => {
        this.global.hide_loader();
        this.gsx_array.at(ind).get('device_descr').disable();
        this.gsx_array.at(ind).patchValue({ check_state: !state});

        this.load_data();
        
        let mess = "The Device  <span class='color-red'>"+ fv.device_name +"</span> has been updated successfully with description <span class='color-red'>" + fv.device_descr + "</span>";

        let modal_obj = {
          title: 'Update <span> Description </span> Status',
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

  save_nbs(ind){
    let fv = this.nbs_array.at(ind).value; 
    let state = this.nbs_array.at(ind)['check_state'];
    
    this.global.show_loader();
    this.sonusData.editDeviceDesc(fv.device_name, fv.device_descr).subscribe(data => {
        this.global.hide_loader();
        this.nbs_array.at(ind).get('device_descr').disable();
        this.nbs_array.at(ind).patchValue({ check_state: !state});

        this.load_data();
        
        let mess = "The Device  <span class='color-red'>"+ fv.device_name +"</span> has been updated successfully with description <span class='color-red'>" + fv.device_descr + "</span>";

        let modal_obj = {
          title: 'Update <span> Description </span> Status',
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

  save_ems(ind){
    let fv = this.ems_array.at(ind).value; 
    let state = this.ems_array.at(ind)['check_state'];
    
    this.global.show_loader();
    this.sonusData.editDeviceDesc(fv.device_name, fv.device_descr).subscribe(data => {
        this.global.hide_loader();
        this.ems_array.at(ind).get('device_descr').disable();
        this.ems_array.at(ind).patchValue({ check_state: !state});

        this.load_data();
        
        let mess = "The Device  <span class='color-red'>"+ fv.device_name +"</span> has been updated successfully with description <span class='color-red'>" + fv.device_descr + "</span>";

        let modal_obj = {
          title: 'Update <span> Description </span> Status',
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

  save_dsi(ind){
    let fv = this.dsi_array.at(ind).value; 
    let state = this.dsi_array.at(ind)['check_state'];
    
    this.global.show_loader();
    this.sonusData.editDeviceDesc(fv.device_name, fv.device_descr).subscribe(data => {
        this.global.hide_loader();
        this.dsi_array.at(ind).get('device_descr').disable();
        this.dsi_array.at(ind).patchValue({ check_state: !state});

        this.load_data();
        
        let mess = "The Device  <span class='color-red'>"+ fv.device_name +"</span> has been updated successfully with description <span class='color-red'>" + fv.device_descr + "</span>";

        let modal_obj = {
          title: 'Update <span> Description </span> Status',
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

  load_data(){
    let resp = this.sonusData.getSonusDataAvail();
    resp.subscribe(
      data => {
        this.response = data;
        this.gsxList = this.response.responseResult.result.gsxList;
        this.nbsList = this.response.responseResult.result.nbsList;
        this.psxList = this.response.responseResult.result.psxList;
        this.emsList = this.response.responseResult.result.emsList;
        this.dsiList = this.response.responseResult.result.dsiList;

        this.load_all_fields();

        this.total_records = this.gsxList.length + this.nbsList.length + this.psxList.length + this.emsList.length + this.dsiList.length;
        
        this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    });
  }

  load_all_fields(){
    this.psx_array.clear();
    this.gsx_array.clear();
    this.nbs_array.clear();
    this.ems_array.clear();
    this.dsi_array.clear();


    this.psxList.forEach(item => {
      this.add_psx_control(item['deviceName'], item['description'], false)
    });

    this.gsxList.forEach(item => {
      this.add_gsx_control(item['deviceName'], item['description'], false)
    });

    this.nbsList.forEach(item => {
      this.add_nbs_control(item['deviceName'], item['description'], false)
    });

    this.emsList.forEach(item => {
      this.add_ems_control(item['deviceName'], item['description'], false)
    });

    this.dsiList.forEach(item => {
      this.add_dsi_control(item['deviceName'], item['description'], false)
    });
  }

  add_psx_control(deviceName, descr, check_state){
    const opt = this.fb.group({
      device_descr: this.fb.control(descr),
      device_name: this.fb.control(deviceName),
      check_state: this.fb.control(check_state)
    });

    opt.get('device_descr').disable();
    opt.get('device_descr').setValidators([Validators.required]);

    this.psx_array.push(opt);
  }

  add_gsx_control(deviceName, descr, check_state){
    const opt = this.fb.group({
      device_descr: this.fb.control(descr),
      device_name: this.fb.control(deviceName),
      check_state: this.fb.control(check_state)
    });

    opt.get('device_descr').disable();
    opt.get('device_descr').setValidators([Validators.required]);

    this.gsx_array.push(opt);
  }

  add_nbs_control(deviceName, descr, check_state){
    const opt = this.fb.group({
      device_descr: this.fb.control(descr),
      device_name: this.fb.control(deviceName),
      check_state: this.fb.control(check_state)
    });

    opt.get('device_descr').disable();
    opt.get('device_descr').setValidators([Validators.required]);

    this.nbs_array.push(opt);
  }

  add_ems_control(deviceName, descr, check_state){
    const opt = this.fb.group({
      device_descr: this.fb.control(descr),
      device_name: this.fb.control(deviceName),
      check_state: this.fb.control(check_state)
    });

    opt.get('device_descr').disable();
    opt.get('device_descr').setValidators([Validators.required]);

    this.ems_array.push(opt);
  }

  add_dsi_control(deviceName, descr, check_state){
    const opt = this.fb.group({
      device_descr: this.fb.control(descr),
      device_name: this.fb.control(deviceName),
      check_state: this.fb.control(check_state)
    });

    opt.get('device_descr').disable();
    opt.get('device_descr').setValidators([Validators.required]);

    this.dsi_array.push(opt);
  }
}
