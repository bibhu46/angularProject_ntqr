import { Component, OnInit } from '@angular/core';
import { DeviceKpiService } from 'src/app/services/sonus/devicekpi.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { FormControl, FormGroup, FormControlName, Validators, FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as _ from "underscore";
import * as moment from "moment";
declare var jQuery: any;
import { appConfig } from 'src/app/app.config';
import { Title } from '@angular/platform-browser';

export class Obj {
  constructor(
    public fromDate: string,
    public toDate: string,
    public selectedStatisticsGroup: string,
    public selectedDeviceTypes: any,
    public selectedDevices: any,
    public selectedSlot: any,
    public type: any
  ) {  }
}

export class Obj1 {
  constructor(
    public selectedStatisticsGroup: string,
    public selectedDeviceTypes: any
  ) {  }
}

export class ObjKpi {
  constructor(
    public selectedStatisticsGroup: string,
    public note: any
  ) {  }
}

export class PopupObj {
  constructor(
    public fromDate: string,
    public toDate: string,
    public statGroup: string,
    public deviceType: any,
    public deviceName: any,
    public slot: any,
    public shelf: any,
    public path: any,
    public cpuCount: any,
    public cpuName: any,
    public descr: any,
    public codecName: any,
    public resourceReport: any,
    public resourcesbcdcuReport: any,
    public nifPort: any,
    public ethernetReport: any
  ) {  }
}

@Component({
  selector: 'app-sonus-device-stats-v2',
  templateUrl: './sonus-device-stats-v2.component.html',
  styleUrls: ['./sonus-device-stats-v2.component.scss']
})
export class SonusDeviceStatsV2Component implements OnInit {

  filter_form = new FormGroup({
    trunk_description: new FormControl({ value: "", disabled: false}),
    trunk_group_name: new FormControl({ value: "", disabled: false}),
    service_type: new FormControl({ value: "", disabled: false}),
    search_type: new FormControl({ value: "", disabled: false}, [Validators.required]),
    gateway: new FormControl({ value: "", disabled: false}),
    time_range: new FormControl({ value: "", disabled: false}, [Validators.required]),
    time_range_to: new FormControl({ value: "", disabled: false}),
  });

  filterTypeSettings:IDropdownSettings = {};
  devicesSettings: IDropdownSettings = {};
  slotSettings: IDropdownSettings = {};

  constructor(private api: DeviceKpiService, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sonus Device Statistics');
    this.filterTypeSettings = {
      singleSelection: true,      
      selectAllText: 'Select All',      
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'value',
      idField: 'value',
    }

    this.devicesSettings = {
      singleSelection: false,      
      selectAllText: 'Select All',      
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'value',
      idField: 'value',
    }

    this.slotSettings = {
      singleSelection: true,      
      selectAllText: 'Select All',      
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'value',
      idField: 'label',
    }

    this.fromDate = moment().subtract(1, "d").format("YYYY-MM-DD");
    this.toDate = moment().subtract(1, "d").format("YYYY-MM-DD");

    this.getAll('System Health Stats');
    this.getKpis();
    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    }
  }

  public gsxCheck=false;  
  public nbsCheck=false;
  public sbcCheck=false;
  public resultCheck=false; 
  public statGrp: any;
  public statGroup: [];
  public devType: [];
  public selDevType: [];
  public selDevType_temp: any[];
  public dev: [];
  public selDev: [];
  public selDevTp: [];
  public slot: any[] = [{value: "", label: ""}];
  public slotSel: any;
  public slotSel1: any[];
  public data: any;
  public fromDate: any; 
  public toDate: any;
  public systemGsxList:[];
  public systemNbsList:[];
  public systemPsxList:[];
  public systemEmsList:[];
  public systemSbcCpuList:[];
  public systemSbcMemList:[];
  public diskDsiList:[];
  public diskEmsList:[];
  public kpiListGsx=[];
  public kpiListNbs=[];
  public kpiListPsx=[];
  public kpiListEms=[];
  public kpiListDsi=[];
  public kpiListSbcCpu=[];
  public kpiListSbcMem=[];
  public systemSbcList=[];
  public date1:any;
  public date2:any;
  public selectedValues=[];
  public dspDeviceModelPerformanceList=[];
  public dspDeviceModelCardResourceList=[];  
  public dspDeviceModelCardStatList=[];
  public dspDeviceModelCardsbcslotList=[]; 
  public systemPsxDeviceList=[]; 
  public systemGsxChassisList=[]; 
  public systemNbsChassisList=[]; 
  public systemSbcChassisList=[];
  public ethernetDeviceModelList=[];
  public systemSbcLicenseList=[];
  public psxcpsLicencesList=[];
  public dspDeviceModelsbcdcuCardResourceList=[];
  public dspDeviceModelsbcdcuPerformanceList=[]; 
  public thresholdRes:any;
  public dt1:any;
  public dt2:any;
  public higherTableValues=[];
  public higherValuesDspList=[];
  public kpiSysHeaStat='';
  public kpiCalCnt='';
  public kpiPsxTd='';
  public kpiCongRejDips='';
  public kpiDspCard='';
  public kpiCapStats='';
  public kpiPsxIn='';
  public kpiCaAttChaWise='';
  public kpiCaAttSlWise='';
  public kpiCaAttPeSbc='';
  public kpiEtPackPort='';
  public kpiSbcLicInfo='';
  public kpiPsxCpsLic='';
  public kpiEtStatSlWise='';
  public kpiMcConStats='';
  public sbcCon=false;
  public filter_form_value = {
    dev_types: []
  };
  public show_slot: boolean = false;
  public dev_type_sel = [];
  public show_edit = true;
  public userPermission: boolean = false;
  public selectedStatGroup='';
  
  remove() {
    (function ($) {
        return !$('#select2 option:selected').remove().appendTo('#select1');  
    })(jQuery);
    this.getDevices();
  } 
  copy() {
    (function ($) {
        return !$('#select1 option:selected').remove().appendTo('#select2');  
    })(jQuery);
    this.getDevices();
  }
  copyAll() {
    (function ($) {
        return !$('#select1  option').remove().appendTo('#select2');  
    })(jQuery);
    this.getDevices();
  }
  removeAll() {
    (function ($) {
        return !$('#select2  option').remove().appendTo('#select1');  
    })(jQuery);
    this.getDevices();
  }

  remove1() {
    (function ($) {
        return !$('#sct2 option:selected').remove().appendTo('#sct1');  
    })(jQuery);
  } 
  copy1() {
    (function ($) {
        return !$('#sct1 option:selected').remove().appendTo('#sct2');  
    })(jQuery);
  }
  copyAll1() {
    (function ($) {
        return !$('#sct1  option').remove().appendTo('#sct2');  
    })(jQuery);
  }
  removeAll1() {
    (function ($) {
        return !$('#sct2  option').remove().appendTo('#sct1');  
    })(jQuery);
  }
  getAll(newVal) {
    this.global.show_loader();
    this.api.getAll(newVal).subscribe((results) =>  {
      this.statGroup = results.responseResult.result.statisticsGroupList;
      this.devType = results.responseResult.result.deviceTypesList;
      this.selDevType = results.responseResult.result.selectedDeviceTypes;
      this.selDevType_temp = this.selDevType;
      this.dev = results.responseResult.result.devicesList;
      
      this.data = results.responseResult.result;    
       
      this.statGrp = [results.responseResult.result.selectedStatisticsGroup];     

      this.filter_form_value.dev_types.length = 0;

      if(this.statGrp[0] == "DSP Card Usage"){
        this.slot = results.responseResult.result.slotList;
        this.slotSel1 = [this.slot[0]];
        this.selDevTp = [];
        this.selDev = [];
        this.dev = results.responseResult.result.devicesList;
        this.selDevType.forEach(item => {
          this.filter_form_value.dev_types.push(true);
        });
        this.show_slot = true;
      } else {
        this.slot = [];
        this.selDev = results.responseResult.result.selectedDevices;
        this.dev = [];
        this.selDevTp = this.selDev;
        this.selDevType.forEach(item => {
          this.filter_form_value.dev_types.push(true);
        });
        this.show_slot = false;
      }
      this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    });  
  }
  
  public onChange(event): void {
    const newVal = event.value;
    this.getAll(newVal);
  }

  getDevices() {
    let obj=null;
    (function ($) {
      var deviceTypes=[];
      var dt= $("#select2 option").map(function () {
        return $(this).text();
      }).get().join(',');
      var str=dt.split(",");
      for (let i = 0; i < str.length; i++) {
        deviceTypes.push(str[i]);
      }
     
      var sg= $('#st1 option:selected').text();
      obj=new Obj1(sg,deviceTypes);
    })(jQuery);
    this.global.show_loader();
    this.api.getDevicesByType(obj).subscribe((results) =>  {
      this.selDev = results.responseResult.result.selectedDevices;
      this.dev = results.responseResult.result.devicesList;
      this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    }); 
  }

  onSubmit(userForm) {
    let fromDate=userForm.fromDate.replaceAll("-","/");
    let toDate = userForm.toDate.replaceAll("-","/");
    this.dt1 = fromDate;
    this.dt2 = toDate;
    this.statGrp = userForm.statGrp;
    let obj=null;
    let sbcCon=false;
    var sl =_.pluck(userForm.slotSel1,'label');
    this.slotSel = sl[0];
    var deviceTypes=[];
    var devices=[];
    (function ($) {
      //var dt= $('#select2').text();
      var dt= $("#select2 option").map(function () {
        return $(this).text();
      }).get().join(',');
      //var d= $('#sct2').text();
      var d= $("#sct2 option").map(function () {
        return $(this).text();
      }).get().join(',');
      var str=dt.split(",");
      var str1=d.split(",");
      for (let i = 0; i < str.length; i++) {
        deviceTypes.push(str[i]);
      }
      for (let i = 0; i < str1.length; i++) {
        devices.push(str1[i]);
      }
      if(userForm.statGrp=='System Health Stats'&& (deviceTypes.includes('SBC') || deviceTypes.includes('DSI')) && deviceTypes.length==1){
        sbcCon=true;
      }      
      var slot =_.pluck(userForm.slotSel1,'label');
      obj=new Obj(fromDate,toDate,userForm.statGrp[0],deviceTypes,devices,slot[0],'');
    })(jQuery);    
    if((userForm.statGrp=='DSP Card Usage' && !deviceTypes.includes('SBC')) &&
         devices.length>1){
      let mess = "Only one <span class='color-red'>Device </span> must be selected!";  
      let modal_obj = {
        title: 'DSP Card <span>Device </span> Status',
        size: "sm",
        color: "green",                
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };
      this.global.open_alert_message(modal_obj);  
    }
    this.sbcCon=sbcCon;

    this.global.show_loader();

    this.api.searchDevice(obj).subscribe((results) =>  {
      this.date1 = results.responseResult.result.fromDate;
      this.date2 = results.responseResult.result.toDate;
      this.systemGsxList=results.responseResult.result.systemGsxList;
      this.systemNbsList=results.responseResult.result.systemNbsList;
      this.systemPsxList=results.responseResult.result.systemPsxList;
      this.systemEmsList=results.responseResult.result.systemEmsList;
      this.diskDsiList=results.responseResult.result.diskDsiList;
      this.diskEmsList=results.responseResult.result.diskEmsList;
      this.systemSbcList=results.responseResult.result.systemSbcList;
      this.systemSbcCpuList=results.responseResult.result.systemSbcCpuList;
      this.systemSbcMemList=results.responseResult.result.systemSbcMemList;
      this.dspDeviceModelPerformanceList=results.responseResult.result.dspDeviceModelPerformanceList;
      this.dspDeviceModelCardResourceList=results.responseResult.result.dspDeviceModelCardResourceList;
      this.dspDeviceModelCardStatList=results.responseResult.result.dspDeviceModelCardStatList;
      this.dspDeviceModelCardsbcslotList=results.responseResult.result.dspDeviceModelCardsbcslotList;
      this.dspDeviceModelsbcdcuCardResourceList=results.responseResult.result.dspDeviceModelsbcdcuCardResourceList;
      this.dspDeviceModelsbcdcuPerformanceList=results.responseResult.result.dspDeviceModelsbcdcuPerformanceList;
      if(this.dspDeviceModelCardResourceList!=null && this.dspDeviceModelCardResourceList.length>0){
        let name=results.responseResult.result.dspDeviceModelCardResourceList[0].name;
        if(name.includes('GSX')){
          this.gsxCheck=true;
          this.nbsCheck=false;
          this.sbcCheck=false;
        }else if(name.includes('NBS')){
          this.gsxCheck=false;
          this.nbsCheck=true;
          this.sbcCheck=false;
        }else if(name.includes('SBC')){
          this.gsxCheck=false;
          this.nbsCheck=false;
          this.sbcCheck=true;        
        }
      }else if(this.dspDeviceModelsbcdcuCardResourceList!=null && this.dspDeviceModelsbcdcuCardResourceList.length>0){
        let name=results.responseResult.result.dspDeviceModelsbcdcuCardResourceList[0].name;
        if(name.includes('GSX')){
          this.gsxCheck=true;
          this.nbsCheck=false;
          this.sbcCheck=false;
        }else if(name.includes('NBS')){
          this.gsxCheck=false;
          this.nbsCheck=true;
          this.sbcCheck=false;
        }else if(name.includes('SBC')){
          this.gsxCheck=false;
          this.nbsCheck=false;
          this.sbcCheck=true;        
        }
      }
      this.systemPsxDeviceList=results.responseResult.result.systemPsxDeviceList;
      this.systemGsxChassisList=results.responseResult.result.systemGsxChassisList;
      this.systemNbsChassisList=results.responseResult.result.systemNbsChassisList;
      this.systemSbcChassisList=results.responseResult.result.systemSbcChassisList;  
      this.ethernetDeviceModelList=results.responseResult.result.ethernetDeviceModelList;  
      this.systemSbcLicenseList=results.responseResult.result.systemSbcLicenseList;   
      this.psxcpsLicencesList=results.responseResult.result.psxcpsLicencesList;  
      this.thresholdRes=results.responseResult.result.thresholdRes;         
      this.higherTableValues=results.responseResult.result.higherTableValues;  
      this.higherValuesDspList=results.responseResult.result.higherValuesDspList; 
      
      if(this.systemGsxList!=null || this.systemNbsList!=null || this.systemPsxList!=null || 
         this.systemEmsList!=null || this.diskDsiList!=null || this.diskEmsList!=null || 
         this.systemSbcList!=null || this.systemSbcCpuList!=null || this.systemSbcMemList!=null ||
         this.dspDeviceModelPerformanceList!=null || this.dspDeviceModelCardResourceList!=null ||
         this.dspDeviceModelCardStatList!=null || this.dspDeviceModelCardsbcslotList!=null ||
         this.systemPsxDeviceList!=null || this.systemGsxChassisList!=null || this.systemNbsChassisList!=null ||
         this.systemSbcChassisList!=null || this.ethernetDeviceModelList!=null ||this.systemSbcLicenseList!=null ||
         this.psxcpsLicencesList!=null){
        this.resultCheck=true;
      }
      this.selectedStatGroup=this.statGrp;
      this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    });    
}

getKpis() {
  this.api.getKpis().subscribe((results) =>  {
    this.kpiSysHeaStat = results.responseResult.result.systemHealthStats;
    this.kpiCalCnt = results.responseResult.result.callCountStats;
    this.kpiPsxTd = results.responseResult.result.psxTimeoutAndDips;
    this.kpiCongRejDips = results.responseResult.result.congestionRejectsAndDips;
    this.kpiDspCard = results.responseResult.result.dspCardUsage;
    this.kpiPsxIn = results.responseResult.result.psxInSIPRequestResponse;
    this.kpiCaAttChaWise = results.responseResult.result.callAttemptsChassisWise;
    this.kpiCaAttSlWise = results.responseResult.result.callAttemptsSlotWise;
    this.kpiCaAttPeSbc = results.responseResult.result.callAttemptsPerSbc;
    this.kpiEtPackPort = results.responseResult.result.ethernetPacketPortStatus;
    this.kpiSbcLicInfo = results.responseResult.result.sbcLicenseInfo;
    this.kpiPsxCpsLic = results.responseResult.result.psxCPSLicenses;
    this.kpiEtStatSlWise = results.responseResult.result.ethernetStatsSlotwise;
    this.kpiMcConStats = results.responseResult.result.machineCongestionStats;
  }, (err) => {
    this.global.hide_loader();
  });
}

onClickKpi() {
  this.show_edit=false;  
}
save(id){
  let note=(<HTMLInputElement>document.getElementById(id)).value;
  let obj = new ObjKpi(this.statGrp[0],note);
  this.global.show_loader();
  this.api.saveKpi(obj).subscribe((results) =>  {
    this.kpiSysHeaStat = results.responseResult.result.systemHealthStats;
    this.kpiCalCnt = results.responseResult.result.callCountStats;
    this.kpiPsxTd = results.responseResult.result.psxTimeoutAndDips;
    this.kpiCongRejDips = results.responseResult.result.congestionRejectsAndDips;
    this.kpiDspCard = results.responseResult.result.dspCardUsage;
    this.kpiPsxIn = results.responseResult.result.psxInSIPRequestResponse;
    this.kpiCaAttChaWise = results.responseResult.result.callAttemptsChassisWise;
    this.kpiCaAttSlWise = results.responseResult.result.callAttemptsSlotWise;
    this.kpiCaAttPeSbc = results.responseResult.result.callAttemptsPerSbc;
    this.kpiEtPackPort = results.responseResult.result.ethernetPacketPortStatus;
    this.kpiSbcLicInfo = results.responseResult.result.sbcLicenseInfo;
    this.kpiPsxCpsLic = results.responseResult.result.psxCPSLicenses;
    this.kpiEtStatSlWise = results.responseResult.result.ethernetStatsSlotwise;
    this.kpiMcConStats = results.responseResult.result.machineCongestionStats;
    this.global.hide_loader();
    this.show_edit=true;
    let mess = "The <span class='color-red'>KPI Notes </span> has been updated successfully";  
      let modal_obj = {
        title: 'KPI <span>Note </span> update',
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

onClickdwnldcsv() {
    this.global.show_loader();
    let obj=null;
    let fromDate=this.dt1;
    let toDate=this.dt2;
    let stGrp=this.statGrp[0];
    let slot=this.slotSel;
    (function ($) {
      var deviceTypes=[];
      var devices=[];
      //var dt= $('#select2').text();
      var dt= $("#select2 option").map(function () {
        return $(this).text();
      }).get().join(',');
      //var d= $('#sct2').text();
      var d= $("#sct2 option").map(function () {
        return $(this).text();
      }).get().join(',');
      var str=dt.split(",");
      var str1=d.split(",");
      for (let i = 0; i < str.length; i++) {
        deviceTypes.push(str[i]);
      }
      for (let i = 0; i < str1.length; i++) {
        devices.push(str1[i]);
      }
      obj=new Obj(fromDate,toDate,stGrp,deviceTypes,devices,slot,'');
    })(jQuery);
  this.api.onClickdwnldcsv(obj).subscribe((results) =>  {
    let headerNames = results.responseResult.result.headerNames;
    let headerDesc = results.responseResult.result.headerDesc;
    let gsxList = results.responseResult.result.gsxList;
    let nbsList = results.responseResult.result.nbsList;
    let psxList = results.responseResult.result.psxList;
    let gsxMcList = results.responseResult.result.gsxMcList;
    let nbsMcList = results.responseResult.result.nbsMcList;
    let sbcMcList = results.responseResult.result.sbcMcList;
    let gsxDspList = results.responseResult.result.gsxDspList;
    let psxInList = results.responseResult.result.psxInList;
    let psxliList = results.responseResult.result.psxliList;
    let emsList = results.responseResult.result.emsList;
    let dsiList = results.responseResult.result.dsiList;
    let gsxCcList = results.responseResult.result.gsxCcList;
    let nbsCcList = results.responseResult.result.nbsCcList;
    let sbcCcList = results.responseResult.result.sbcCcList;
    let gsxSlotList = results.responseResult.result.gsxSlotList;
    let nbsSlotList = results.responseResult.result.nbsSlotList;
    let sbcCList = results.responseResult.result.sbcCList;
    let sbclList = results.responseResult.result.sbclList;
    let filename = results.responseResult.result.filename;
    let headerLine = results.responseResult.result.headerLine;

    let csvdata = this.ConvertToCSV(gsxList,nbsList,psxList,gsxMcList ,nbsMcList ,sbcMcList ,gsxDspList ,psxInList ,psxliList 
      ,emsList ,dsiList ,gsxCcList ,nbsCcList ,sbcCcList ,gsxSlotList ,nbsSlotList ,sbcCList ,sbclList, headerNames,headerLine,headerDesc);
   
    let blob = new Blob(['\ufeff' + csvdata], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) { 
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
    this.global.hide_loader();
  }, (err) => {
    this.global.hide_loader();
  }); 
}

dwnldcsv(cond,sbcmem) {
  this.global.show_loader();
  let obj=null;
  let fromDate=this.dt1;
  let toDate=this.dt2;
  let stGrp=this.statGrp[0];
  let slot=this.slotSel;
  let dtype=[];
  dtype.push(cond);
  (function ($) {
    var deviceTypes=[];
    var devices=[];
    var sbcdevices=[];
    var dsidevices=[];
    //var dt= $('#select2').text();
    var dt= $("#select2 option").map(function () {
      return $(this).text();
    }).get().join(',');
    //var d= $('#sct2').text();
    var d= $("#sct2 option").map(function () {
      return $(this).text();
    }).get().join(',');
    var str=dt.split(",");
    var str1=d.split(",");
    for (let i = 0; i < str.length; i++) {
      deviceTypes.push(str[i]);
    }
    for (let i = 0; i < str1.length; i++) {
      if(str1[i].includes('SBC')){
        sbcdevices.push(str1[i]);
      }else if(str1[i].includes('DSI')){
        dsidevices.push(str1[i]);
      }else{
        devices.push(str1[i]);
      }
    }
    let dev=[];
    dev.push('LOCALHOST');
    if(cond=='EMS'){
      obj=new Obj(fromDate,toDate,stGrp,dtype,dev,slot,sbcmem);
    }else if(cond=='SBC'){
      obj=new Obj(fromDate,toDate,stGrp,dtype,sbcdevices,slot,sbcmem);
    }else if(cond=='DSI'){
      obj=new Obj(fromDate,toDate,stGrp,dtype,dsidevices,slot,sbcmem);
    }else{
      obj=new Obj(fromDate,toDate,stGrp,dtype,devices,slot,sbcmem);
    }
  })(jQuery);
this.api.onClickdwnldcsv(obj).subscribe((results) =>  {
  let sbcHeaderNames = results.responseResult.result.sbcHeaderNames;
  let headerNames = results.responseResult.result.headerNames;
  let emsHeaderNames = results.responseResult.result.emsHeaderNames;
  let sbcList = results.responseResult.result.sbcList;
  let sbcMemList = results.responseResult.result.sbcMemList;
  let dsiList = results.responseResult.result.dsiList;
  let diskEmsList = results.responseResult.result.diskEmsList;
  let filename = results.responseResult.result.filename;
  let headerLine = results.responseResult.result.headerLine;
  let csvdata;
  if(sbcmem=='sbcmem'){
   csvdata = this.ConvertToCSVSbc(sbcMemList,sbcHeaderNames,headerLine);
  }else if(sbcList!=null){
   csvdata = this.ConvertToCSVSbc(sbcList,sbcHeaderNames,headerLine);
  }else if(dsiList!=null){
    csvdata = this.ConvertToCSVSbc(dsiList,headerNames,headerLine);
   }else if(diskEmsList!=null){
     csvdata = this.ConvertToCSVSbc(diskEmsList,emsHeaderNames,headerLine);
    }
  let blob = new Blob(['\ufeff' + csvdata], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) { 
    dwldLink.setAttribute("target", "_blank");
  }
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", filename + ".csv");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
  this.global.hide_loader();
}, (err) => {
  this.global.hide_loader();
}); 
}

ConvertToCSV(gsxList,nbsList,psxList,gsxMcList ,nbsMcList ,sbcMcList ,gsxDspList ,psxInList ,psxliList ,
    emsList ,dsiList ,gsxCcList ,nbsCcList ,sbcCcList ,gsxSlotList ,nbsSlotList ,sbcCList ,sbclList, headerList,headerLine,headerDesc) {
  
  var gsxarray = typeof gsxList != 'object' ? JSON.parse(gsxList) : gsxList;
  var nbsarray = typeof nbsList != 'object' ? JSON.parse(nbsList) : nbsList;
  var psxarray = typeof psxList != 'object' ? JSON.parse(psxList) : psxList;
  var gsxMcarray = typeof gsxMcList != 'object' ? JSON.parse(gsxMcList) : gsxMcList;
  var nbsMcarray = typeof nbsMcList != 'object' ? JSON.parse(nbsMcList) : nbsMcList;
  var sbcMcarray = typeof sbcMcList != 'object' ? JSON.parse(sbcMcList) : sbcMcList;
  var gsxDsparray = typeof gsxDspList != 'object' ? JSON.parse(gsxDspList) : gsxDspList;
  var psxInarray = typeof psxInList != 'object' ? JSON.parse(psxInList) : psxInList;
  var psxliarray = typeof psxliList != 'object' ? JSON.parse(psxliList) : psxliList;
  var emsarray = typeof emsList != 'object' ? JSON.parse(emsList) : emsList;
  var dsiarray = typeof dsiList != 'object' ? JSON.parse(dsiList) : dsiList;
  var gsxCcarray = typeof gsxCcList != 'object' ? JSON.parse(gsxCcList) : gsxCcList;
  var nbsCcarray = typeof nbsCcList != 'object' ? JSON.parse(nbsCcList) : nbsCcList;
  var sbcCcarray = typeof sbcCcList != 'object' ? JSON.parse(sbcCcList) : sbcCcList;
  var gsxSlotarray = typeof gsxSlotList != 'object' ? JSON.parse(gsxSlotList) : gsxSlotList;
  var nbsSlotarray = typeof nbsSlotList != 'object' ? JSON.parse(nbsSlotList) : nbsSlotList;
  var sbcCarray = typeof sbcCList != 'object' ? JSON.parse(sbcCList) : sbcCList;
  var sbclarray = typeof sbclList != 'object' ? JSON.parse(sbclList) : sbclList;
  var str = '';
  str += '\r\n';
  str+=headerLine;
  if(null!=headerDesc){
    str += '\r\n';
    str+=headerDesc;
  }
  str += '\r\n';
  str+=headerList;
  str += '\r\n';

  if(gsxarray!=null){
    for (var i = 0; i < gsxarray.length; i++) {
        var line = '';
        for (var index in gsxarray[i]) {
            if (line != '') line += ','

            line += gsxarray[i][index];
        }

        str += line + '\r\n';
    }
  }
  if(nbsarray!=null){
     for (var i = 0; i < nbsarray.length; i++) {
      var line = '';
      for (var index in nbsarray[i]) {
          if (line != '') line += ','

          line += nbsarray[i][index];
        }

       str += line + '\r\n';
     }
  }
  if(psxarray!=null){
    for (var i = 0; i < psxarray.length; i++) {
      var line = '';
      for (var index in psxarray[i]) {
          if (line != '') line += ','

          line += psxarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(gsxMcarray!=null){
    for (var i = 0; i < gsxMcarray.length; i++) {
      var line = '';
      for (var index in gsxMcarray[i]) {
          if (line != '') line += ','

          line += gsxMcarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(nbsMcarray!=null){
    for (var i = 0; i < nbsMcarray.length; i++) {
      var line = '';
      for (var index in nbsMcarray[i]) {
          if (line != '') line += ','

          line += nbsMcarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(sbcMcarray!=null){
    for (var i = 0; i < sbcMcarray.length; i++) {
      var line = '';
      for (var index in sbcMcarray[i]) {
          if (line != '') line += ','

          line += sbcMcarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(gsxDsparray!=null){
    for (var i = 0; i < gsxDsparray.length; i++) {
      var line = '';
      for (var index in gsxDsparray[i]) {
          if (line != '') line += ','

          line += gsxDsparray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(psxInarray!=null){
    for (var i = 0; i < psxInarray.length; i++) {
      var line = '';
      for (var index in psxInarray[i]) {
          if (line != '') line += ','

          line += psxInarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(psxliarray!=null){
    for (var i = 0; i < psxliarray.length; i++) {
      var line = '';
      for (var index in psxliarray[i]) {
          if (line != '') line += ','

          line += psxliarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(emsarray!=null){
    for (var i = 0; i < emsarray.length; i++) {
      var line = '';
      for (var index in emsarray[i]) {
          if (line != '') line += ','

          line += emsarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(dsiarray!=null){
    for (var i = 0; i < dsiarray.length; i++) {
      var line = '';
      for (var index in dsiarray[i]) {
          if (line != '') line += ','

          line += dsiarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(gsxCcarray!=null){
    for (var i = 0; i < gsxCcarray.length; i++) {
      var line = '';
      for (var index in gsxCcarray[i]) {
          if (line != '') line += ','

          line += gsxCcarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(nbsCcarray!=null){
    for (var i = 0; i < nbsCcarray.length; i++) {
      var line = '';
      for (var index in nbsCcarray[i]) {
          if (line != '') line += ','

          line += nbsCcarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(sbcCcarray!=null){
    for (var i = 0; i < sbcCcarray.length; i++) {
      var line = '';
      for (var index in sbcCcarray[i]) {
          if (line != '') line += ','

          line += sbcCcarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(gsxSlotarray!=null){
    for (var i = 0; i < gsxSlotarray.length; i++) {
      var line = '';
      for (var index in gsxSlotarray[i]) {
          if (line != '') line += ','

          line += gsxSlotarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(nbsSlotarray!=null){
    for (var i = 0; i < nbsSlotarray.length; i++) {
      var line = '';
      for (var index in nbsSlotarray[i]) {
          if (line != '') line += ','

          line += nbsSlotarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(sbcCarray!=null){
    for (var i = 0; i < sbcCarray.length; i++) {
      var line = '';
      for (var index in sbcCarray[i]) {
          if (line != '') line += ','

          line += sbcCarray[i][index];
      }

      str += line + '\r\n';
    }
   }
   if(sbclarray!=null){
    for (var i = 0; i < sbclarray.length; i++) {
      var line = '';
      for (var index in sbclarray[i]) {
          if (line != '') line += ','

          line += sbclarray[i][index];
      }

      str += line + '\r\n';
    }
   }
  return str;
}


ConvertToCSVSbc(sbcList,headerList,headerLine) {
  var sbcarray = typeof sbcList != 'object' ? JSON.parse(sbcList) : sbcList;
  var str = '';
  str += '\r\n';
  str+=headerLine;
  str += '\r\n';
  str+=headerList;
  str += '\r\n';

   if(sbcarray!=null){
    for (var i = 0; i < sbcarray.length; i++) {
      var line = '';
      for (var index in sbcarray[i]) {
          if (line != '') line += ','

          line += sbcarray[i][index];
      }

      str += line + '\r\n';
    }
   }
  return str;
}


showPopUpHistory(deviceName,deviceType,shelf,slot,path,cpuCount,cpuName,descr,codecName,resourceReport,nifPort) {
  let obj=null;
  let resourcesbcdcuReport='';
  let ethernetReport=false;
  if(this.statGrp[0] == 'Ethernet Packet Port Status'){
     ethernetReport=true;
  }
  if(this.statGrp[0] =='DSP Card Usage'){
    if(deviceName.includes('GSX')){
      deviceType='GSX';
    }else if(deviceName.includes('NBS')){
      deviceType='NBS';
    }else if(deviceName.includes('SBC')){
      deviceType='SBC';
      if(nifPort=='sbcdcustat'){
        resourcesbcdcuReport='sbcdcustat';
      }else if(nifPort=='sbcdcuslot'){
        resourcesbcdcuReport='sbcdcuslot';
      }else if(!resourceReport && nifPort=='sbcdcuperformance' && deviceType!='GSX'){
        resourcesbcdcuReport='sbcdcuperformance';
      }else if(!resourceReport){
        resourcesbcdcuReport='';
      }else{
        resourcesbcdcuReport='sbcdcuresource';
      }
    }
    obj=new PopupObj(this.dt1,this.dt2,this.statGrp[0],deviceType,deviceName,this.slotSel,shelf,path,cpuCount,cpuName,descr,codecName,resourceReport,resourcesbcdcuReport,nifPort,ethernetReport);
  } else{
    obj=new PopupObj(this.dt1,this.dt2, this.statGrp[0], deviceType, deviceName, slot, shelf,path,cpuCount,cpuName,descr,codecName,resourceReport,resourcesbcdcuReport,nifPort,ethernetReport);
  }
  let url =  appConfig.hostUrl+"sonus/devicestats/popup";
  var x = screen.width/2 - 700/2;
  var y = screen.height/2 - 450/2;
  var win=window.open(url,"System Statistics Search - Daily History-",'height=785,width=800,left='+x+',top='+y);
  win.window['dataPopup']=obj;
}

filter_form_search(){}

on_statistics_deselect(ev){}

filter_form_reset(){}

on_devices_select(ev){

}

on_devices_deselect(ev){}

device_type_change(ev){
  let temp = [];

  this.filter_form_value['dev_types'].forEach((item, index) => {
    if(item){
      temp.push(this.selDevType[index]['value']);
    }
  });
  this.dev_type_sel = temp;

  let submit_obj = new Obj1(this.statGrp[0], temp);
  this.global.show_loader();

  this.api.getDevicesByType(submit_obj).subscribe((results) =>  {

    if(this.statGrp[0] == "DSP Card Usage"){
      this.selDev = results.responseResult.result.devicesList;
      this.selDevTp = [];
    } else {
      this.selDev = results.responseResult.result.selectedDevices;
      this.selDevTp = this.selDev;
    }   

    this.global.hide_loader();
  }, (err) => {
    this.global.hide_loader();
  });
  
}

on_slot_select(ev){}

on_slot_deselect(ev){}

cpu_usage(usage, threshold){
  if(threshold == null || threshold > usage){
    return "green";
  } else if(usage >= threshold){
    return "red";
  }
}

call_counts(table,usage, threshold){
  if(table>0 && threshold == null || threshold > usage){
    return "green";
  } else if(table>0 && usage >= threshold){
    return "red";
  }
}

psx_in(table){
  if(table>0){
    return "green";
  }
}

psx_red(table){
  if(table>0){
    return "red";
  }
}

}

