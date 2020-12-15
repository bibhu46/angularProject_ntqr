import { Component, OnInit, ViewChild, OnDestroy, TemplateRef, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, FormControlName, Validators, FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from "moment";

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import * as _ from "underscore";
import { TgStatsService } from 'src/app/services/sonus/trunkgroup-statistics.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { appConfig } from 'src/app/app.config';
declare var jQuery: any;
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'trunk-group-search',
  templateUrl: './trunk-group-search.component.html',
  styleUrls: ['./trunk-group-search.component.scss']
})
export class TrunkGroupSearchComponent implements OnInit, OnDestroy {

  filter_form = new FormGroup({
    trunk_description: new FormControl({ value: "", disabled: false }),
    trunk_group_name: new FormControl({ value: "", disabled: false }),
    service_type: new FormControl({ value: "", disabled: false }),
    search_type: new FormControl({ value: "", disabled: false }, [Validators.required]),
    gateway: new FormControl({ value: "", disabled: false }),
    time_range: new FormControl({ value: "", disabled: false }, [Validators.required]),
    time_range_to: new FormControl({ value: "", disabled: false }),
  });

  tg_edit_details_form = new FormGroup({
    tg_name: new FormControl({ value: "", disabled: false }, [Validators.required]),
    tg_id: new FormControl({ value: "", disabled: false }, [Validators.required]),
    tg_descr: new FormControl({ value: "", disabled: false }, [Validators.required]),
    category: new FormControl({ value: "", disabled: false }),
    tags: new FormControl({ value: "", disabled: false }),
    tag_selected: new FormControl({ value: "", disabled: false })
  });

  get filter_form_controls() { return this.filter_form.controls; }


  filterTypeSettings: IDropdownSettings = {};
  filterGatewaySettings: IDropdownSettings = {};
  categorySettings: IDropdownSettings = {};

  /* For mat data tables ---------------------------------- */

  displayedColumns: string[] = ['actions', 'tgName', 'gateway', 'tgDescr', "tgservicetype", "circuitsAvailable", "tgUtilisation", "busiestHour", "tgInCallAtempts", "maxInCpsProcessed", "maxInCpsAttempted"];
  dataSource;

  date_unit: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: false }) content: TemplateRef<any>;
  @ViewChild('editTgDetails', { static: false }) editTgDetails: TemplateRef<any>;

  public gateways = [];
  public serviceTypes = [];
  public kpiList = [];
  public searchTypeList = [];
  public searchType = 'Daily Busy Hour';
  public higher_in_bandwidth = 0;
  public higher_out_bandwidth = 0;
  public date_from = "";
  public date_to = "";
  public watchlist_row_data = {};
  public tg_edit_data = {};
  public tg_edit_form_data = {};
  public categories_list = [];
  public tags_list = [];
  public selected_tags = [];
  public sample_request = {};
  public threshold_tg_utilisation;
  public search_text: string = "";
  public userPermission: boolean = false;

  constructor(private tgStatsService: TgStatsService, private global: GlobalService, private modalService: NgbModal,  @Inject(DOCUMENT) private document: Document,  private renderer: Renderer2,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sonus Trunkgroup Statistics');  
    this.filterTypeSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'value',
      idField: 'label',
    }

    this.filterGatewaySettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'value',
      idField: 'label',
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

    this.document.getElementsByClassName("container-fluid")[0].setAttribute("class", "container-fluid overflow-visible px-0");
    this.document.getElementsByClassName("page-header")[0].setAttribute("class", "row page-header w-110pt px-0");
    this.document.getElementsByClassName("menu_bar")[0].setAttribute("class", "navbar navbar-expand-lg menu_bar mt-1 w-110pt");
  }

  ngOnDestroy(): void {

    this.document.getElementsByClassName("container-fluid")[0].setAttribute("class", "container-fluid px-0");    
    this.document.getElementsByClassName("page-header")[0].setAttribute("class", "row page-header px-0");
    
    this.document.getElementsByClassName("menu_bar")[0].setAttribute("class", "navbar navbar-expand-lg menu_bar mt-1");
}

  on_type_select(ev) { }

  on_type_deselect(ev) {

  }

  on_gateway_select(ev) { }

  on_gateway_deselect(ev) { }

  on_category_select(ev) { }

  on_category_deselect(ev) { }

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
    this.tgStatsService.getAll().subscribe((results) => {

      this.gateways = results.responseResult.result.gatewaysList;
      this.serviceTypes = results.responseResult.result.serviceTypeList;
      this.searchTypeList = results.responseResult.result.searchTypeList;
    }, (err) => {
      this.global.hide_loader();
    });
  }

  filter_form_search() {
    let filter_form_value = this.filter_form.value;
    this.global.show_loader();

    let gateway;
    let selectedGateways = _.pluck(filter_form_value.gateway, 'label');
    //let selectedGateways =[];
    let serviceType;

    /*if (filter_form_value.gateway instanceof String) {
      gateway = filter_form_value.gateway !== "" || filter_form_value.gateway !== null ? filter_form_value.gateway : "";
    } else {
      gateway = filter_form_value.gateway.length > 0 ? filter_form_value.gateway[0].value : "";
    }*/

    if (filter_form_value.service_type instanceof String) {
      serviceType = filter_form_value.service_type !== "" || filter_form_value.service_type !== null ? filter_form_value.service_type : "";
    } else {
      serviceType = filter_form_value.service_type.length > 0 ? filter_form_value.service_type[0].label : "";
    }

    this.sample_request = {
      "busiestBusyHourParameter": "search",
      "date": filter_form_value.time_range,
      "fromDate": "",
      "orderBy": 1,
      "searchType": filter_form_value.search_type,
      "selectedCategories": [],
      "selectedCategory": 0,
      "selectedGateway": gateway,
      "selectedGateways": selectedGateways,
      "selectedServiceType": serviceType,
      "selectedTags": [],
      "sortType": "asc",
      "tgDescr": filter_form_value.trunk_description,
      "tgName": filter_form_value.trunk_group_name,
      "toDate": "",
      "trunkGroupId": 0
    };

    if (filter_form_value.time_range_to !== "") {
      this.sample_request['date'] = "";
      this.sample_request['fromDate'] = filter_form_value.time_range;
      this.sample_request['toDate'] = filter_form_value.time_range_to;
    }

    if (this.filter_form.valid) {
      this.tgStatsService.searchTg(this.sample_request).subscribe((results) => {

        this.kpiList = results.responseResult.result.kpiList;
        this.higher_in_bandwidth = results.responseResult.result.higherInBandwidth;
        this.higher_out_bandwidth = results.responseResult.result.higherOutBandwidth;
        this.threshold_tg_utilisation = results.responseResult.result.thresholdTrunkgroupUtilisation;

        this.dataSource = new MatTableDataSource(this.kpiList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  filter_form_reset() {
    this.filter_form.reset();
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

  open_watchlist_confirmation(row_data) {
    this.watchlist_row_data = row_data;
    this.open_watchlist_modal(this.content);
  }

  open_tg_edit_details(row_data) {
    this.tg_edit_data = row_data;
    this.tgStatsService.getTgEdit(row_data['tgId']).subscribe(results => {

      this.tg_edit_data = results['responseResult']['result'];

      this.categories_list = this.tg_edit_data['categoriesList'];
      this.tags_list = this.tg_edit_data['tagList'];

      let selected_cat = _.findWhere(this.categories_list, { label: String(this.tg_edit_data['selectedCategory']) });
      console.log("Selected category object");
      console.log(selected_cat);


      this.categorySettings = {
        singleSelection: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        enableCheckAll: false,
        textField: 'value',
        idField: 'label',
      };

      this.tg_edit_details_form.patchValue({
        tg_name: this.tg_edit_data['tgName'],
        tg_id: row_data['tgId'],
        tg_descr: row_data['tgDescr'] !== null ? row_data['tgDescr'] : "",
        category: [selected_cat]
      });

      let temp = {};

      this.selected_tags = [];

      this.tg_edit_data['selectedTags'].forEach((item, index) => {
        this.tags_list.forEach((tag, tag_index) => {
          if (item == tag.label) {
            this.selected_tags.push(tag);
          }
        });
      });

      console.log("Processed Seleceted tags");
      console.log(this.selected_tags);

      this.tg_edit_details_form.patchValue({
        tag_selected: this.selected_tags
      });


      console.log("edit form value");
      console.log(this.tg_edit_details_form.value);

      this.open_tg_edit_modal(this.editTgDetails);
    }, (err) => {
      this.global.hide_loader();
    });
  }

  open_watchlist_modal(template) {
    this.modalService.open(template, { centered: true, size: 'sm', scrollable: true, windowClass: 'custom-modal', backdropClass: 'backdrop-class' });
  }

  open_tg_edit_modal(template) {
    this.modalService.open(template, { centered: true, size: 'lg', scrollable: true, windowClass: 'custom-modal', backdropClass: 'backdrop-class' });
  }

  watchlist_yes_clicked() {
    let username = localStorage.username;
    this.tgStatsService.addTgToWatchlist(this.watchlist_row_data['tgId'], username).subscribe(data => {
      this.global.close_all_modals();
      if (data['message'] == "SUCCESS") {
        let mess = "The <span class='color-red'>" + this.watchlist_row_data['tgName'] + "</span> has been added to watchlist successfully";

        let modal_obj = {
          title: 'Watchlist <span>Update </span> Status',
          size: "sm",
          color: "green",
          auto_close: false,
          content: '<p class="text-center my-3">' + mess + '</p>'
        };

        this.global.open_alert_message(modal_obj);
      }
    })
  }

  tg_edit_submit() {

    let form_val = this.tg_edit_details_form.value;

    let selected_tags = "";

    console.log("Form value after submit");
    console.log(form_val);

    let submit_obj = {
      "busiestBusyHourParameter": "",
      "date": "",
      "fromDate": "",
      "orderBy": 0,
      "searchType": "",
      "selectedCategories": [],
      "selectedCategory": form_val.category[0].label,
      "selectedGateway": "",
      "selectedServiceType": "",
      "selectedTags": [],
      "sortType": "",
      "tgDescr": "",
      "tgName": "",
      "toDate": "",
      "trunkGroupId": form_val['tg_id']
    };

    (function ($) {
      var sTags = [];
      var dt = $("#select2 option").map(function () {
        sTags.push($(this).text());
      });
      console.log(sTags);
      submit_obj['selectedTags'] = sTags;
    })(jQuery);

    if (typeof (form_val.category) == "string") {
      submit_obj.selectedCategory = form_val.category;
    } else {
      submit_obj.selectedCategories.push(form_val.category[0].label);
    }

    console.log("Submit object");
    console.log(submit_obj);

    this.tgStatsService.updateTg(submit_obj).subscribe(results => {
      this.global.close_all_modals();

      let mess = "The <span class='color-red'>" + form_val['tgName'] + "</span> has been updated with details successfully";

      let modal_obj = {
        title: 'Update  <span>Trunkgroup </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);
    });

  }

  remove() {
    (function ($) {
      return !$('#select2 option:selected').remove().appendTo('#select1');
    })(jQuery);
  }
  copy() {
    (function ($) {
      return !$('#select1 option:selected').remove().appendTo('#select2');
    })(jQuery);
  }
  copyAll() {
    (function ($) {
      return !$('#select1  option').remove().appendTo('#select2');
    })(jQuery);
  }
  removeAll() {
    (function ($) {
      return !$('#select2  option').remove().appendTo('#select1');
    })(jQuery);

  }

  downloadCsv() {
    let obj = this.sample_request;
    this.global.show_loader();
    this.tgStatsService.downloadCsv(obj).subscribe((results) => {
      let csvList = results.responseResult.result.csvList;
      let headerLine = results.responseResult.result.headerLine;
      let headerNames = results.responseResult.result.columnLine;
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


}
