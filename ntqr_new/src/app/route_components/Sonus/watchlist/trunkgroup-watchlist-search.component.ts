import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormControlName, Validators, FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from "moment";

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WatchlistService } from 'src/app/services/sonus/watchlist.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { WatchlistTrunkGroup } from 'src/app/models/interfaces';
import { appConfig } from 'src/app/app.config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trunkgroup-watchlist-search',
  templateUrl: './trunkgroup-watchlist-search.component.html',
  styleUrls: ['./trunkgroup-watchlist-search.component.scss']
})
export class TrunkgroupWatchlistSearchComponent implements OnInit {

  filter_form = new FormGroup({
    service_type: new FormControl({ value: "", disabled: false }),
    search_type: new FormControl({ value: "", disabled: false }, [Validators.required]),
    time_range: new FormControl({ value: "", disabled: false }, [Validators.required]),
    time_range_to: new FormControl({ value: "", disabled: false }),
  });

  get filter_form_controls() { return this.filter_form.controls; }

  filterTypeSettings: IDropdownSettings = {};
  public type_list = [];
  date_unit: any;
  public date_from = "";
  public date_to = "";
  public searchTypeList = [];
  public searchType = 'Daily Busy Hour';
  public result = [];
  public sample_request = {};
  public search_text: string = "";
  public date: any;
  public fromDate: any;
  public toDate: any;
  public serviceType = "";
  public userPermission: boolean = false;

  displayedColumns: string[] = ['actions', 'tgName', 'gateway', 'tgDescr', "category", "circuitsAvailable", "totalMinutes", "tgUtilisation", "thresholdUtilisation"];
  dataSource: MatTableDataSource<WatchlistTrunkGroup>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: WatchlistService, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sonus Watchlist');
    this.filterTypeSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'value',
      idField: 'label'
    }
    this.getAll();

    this.date_unit = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");

    this.filter_form.patchValue({
      search_type: "Daily Busy Hour",
      time_range: this.date_unit
    });

    this.filter_form.controls.search_type.valueChanges.subscribe((val) => {

      if (val.search_type == "Busiest Busy Hour") {
        this.filter_form.controls.time_range_to.setValidators([Validators.required]);

      } else {
        this.filter_form.controls.time_range_to.patchValue("");
        this.filter_form.controls.time_range_to.setValidators(null);
      }

    });

    this.filter_form.valueChanges.subscribe((val) => {
      if (val.time_range !== "") {
        this.date_from = moment(val.time_range).format('ddd, YY-MM-DD');
      }

      if (val.time_range_to !== "") {
        console.log("To date is changed - " + val.time_range_to);
        this.date_to = moment(val.time_range_to).format('ddd, YY-MM-DD');
      }
    });

    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    }
  }

  on_type_select(ev) { }

  on_type_deselect(ev) {

  }

  on_gateway_select(ev) { }

  on_gateway_deselect(ev) { }

  applyFilter(event: Event) {
    const filterValue = this.search_text;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open_new_window(trunk_id, tg_name, tgDesc, gateway_tg, serviceType, search_type) {
    let url;

    console.log("search type");
    console.log(search_type);

    if (this.filter_form.value.search_type == "Daily Busy Hour") {
      url = appConfig.hostUrl + "sonus/trunkGroupStatisticsPopup/" + trunk_id + "/" + tg_name + '/' + tgDesc + '/' + gateway_tg + '/' + serviceType + '/' + search_type + '/' + this.filter_form.value.time_range;
    } else if (this.filter_form.value.search_type == "Busiest Busy Hour") {
      url = appConfig.hostUrl + "sonus/trunkGroupStatisticsPopup/" + trunk_id + "/" + tg_name + '/' + tgDesc + '/' + gateway_tg + '/' + serviceType + '/' + search_type + '/' + this.filter_form.value.time_range + "/" + this.filter_form.value.time_range_to;
    }

    window.open(url, "Daily Busy Hour Report - " + trunk_id, "resizable,scrollbars,status,width=1200,height=550");
  }

  getAll() {
    this.global.show_loader();
    this.api.getAll().subscribe((results) => {
      this.type_list = results.responseResult.result.foldersListComboBox;
      this.searchTypeList = results.responseResult.result.searchTypeList;
      this.filter_form.patchValue({
        service_type: [this.type_list[0]]
      });
      this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    });
  }

  search_type_change(ev) {
    console.log("Search type Changed");
    if (ev.target.value = "Busiest Busy Hour") {
      let yesterday_date = moment().subtract(1, "d").format("YYYY-MM-DD");
      this.filter_form.patchValue({
        time_range: yesterday_date,
        time_range_to: yesterday_date
      });
    }
  }

  filter_form_search() {
    let filter_form_value = this.filter_form.value;
    this.global.show_loader();

    let serviceType;

    if (filter_form_value.service_type instanceof String) {
      serviceType = filter_form_value.service_type !== "" || filter_form_value.service_type !== null ? filter_form_value.service_type : "";
    } else {
      serviceType = filter_form_value.service_type.length > 0 ? filter_form_value.service_type[0].label : "";
    }

    if (filter_form_value.time_range_to !== "") {
      this.date = "";
      this.fromDate = filter_form_value.time_range;
      this.toDate = filter_form_value.time_range_to;
    } else {
      this.date = filter_form_value.time_range;
      this.fromDate = "";
      this.toDate = "";
    }

    this.serviceType = serviceType;
    if (this.filter_form.valid) {
      this.api.searchTrunkgroups(filter_form_value.search_type, serviceType, this.fromDate, this.toDate, this.date).subscribe((results) => {
        this.result = results.responseResult.result.watchlist;
        if (this.result.length > 0) {
          this.dataSource = new MatTableDataSource(this.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.global.hide_loader();
      }, (err) => {
        this.global.hide_loader();
      });
    }
    else {

      this.filter_form.controls.search_type.markAsDirty();
      this.filter_form.controls.time_range.markAsDirty();
      this.filter_form.controls.time_range_to.markAsDirty();
    }

  }

  next_date() {

    let search_type_value = this.filter_form.value.search_type;
    let date_value = this.filter_form.value.time_range;
    let new_date = "";

    if (search_type_value == "Daily Busy Hour") {
      new_date = moment(date_value).add(1, 'd').format('YYYY-MM-DD');

      this.filter_form.patchValue({
        time_range: new_date
      });
    } else if (search_type_value == "Busiest Busy Hour") {
      date_value = this.filter_form.value.time_range_to;
      new_date = moment(date_value).add(1, 'd').format('YYYY-MM-DD');

      this.filter_form.patchValue({
        time_range_to: new_date
      });
    }

    this.filter_form_search();
  }

  prev_date() {
    let date_value = this.filter_form.value.time_range;
    let new_date = "";

    new_date = moment(date_value).subtract(1, 'd').format('YYYY-MM-DD');

    this.filter_form.patchValue({
      time_range: new_date
    });

    this.filter_form_search();
  }

  downloadCsv() {
    let fromDate = this.fromDate;
    let toDate = this.toDate;
    let date = this.date;
    this.global.show_loader();
    this.api.downloadCsv(this.filter_form.value.search_type, this.serviceType, fromDate, toDate, date).subscribe((results) => {
      let csvList = results.responseResult.result.csvList;
      let headerLine = results.responseResult.result.headerLine;
      let headerNames = results.responseResult.result.columnsNameLine;
      let fileName = results.responseResult.result.fileName;
      let csvdata = this.ConvertToCSV(csvList, headerLine, headerNames);

      let blob = new Blob(['\ufeff' + csvdata], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {
        dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", fileName);
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
      this.global.hide_loader();
    }, (err) => {
      this.global.hide_loader();
    });
  }

  ConvertToCSV(csvList, headerLine, headerNames) {
    var csvarray = typeof csvList != 'object' ? JSON.parse(csvList) : csvList;
    var str = '';
    str += headerLine;
    str += '\r\n';
    str += headerNames;
    str += '\r\n';

    if (csvarray != null) {
      for (var i = 0; i < csvarray.length; i++) {
        var line = '';
        for (var index in csvarray[i]) {
          if (line != '') line += ','

          line += csvarray[i][index];
        }

        str += line + '\r\n';
      }
    }
    return str;
  }

  removeFromWatchlist(tgId, tgName) {
    if (window.confirm('Do you want to remove the trunkgroup of watchlist?')) {
      this.global.show_loader();
      this.api.removeTg(tgId, this.serviceType).subscribe((results) => {
        this.global.hide_loader();
        let mess = "The <span class='color-red'>" + tgName + "</span> has been removed from watchlist successfully";
        let modal_obj = {
          title: '<span>Trunkgroup </span> Status',
          size: "sm",
          color: "green",
          auto_close: false,
          content: '<p class="text-center my-3">' + mess + '</p>'
        };
        this.global.open_alert_message(modal_obj);
        this.filter_form_search();
      }, (err) => {
        this.global.hide_loader();
      });
    } else {
    }
  }

  sendMailNotif() {
    this.global.show_loader();
    this.global.hide_loader();
    let mess = "The <span class='color-red'>Mail Notification</span> has been sent successfully";
    let modal_obj = {
      title: '<span>Trunkgroup </span> Status',
      size: "sm",
      color: "green",
      auto_close: false,
      content: '<p class="text-center my-3">' + mess + '</p>'
    };
    this.global.open_alert_message(modal_obj);
  }
  cpu_usage(usage,threshold){
    if(threshold == null || threshold > usage){
      return "green";
    } else if(usage >= threshold){
      return "red";
    }
  }

}
