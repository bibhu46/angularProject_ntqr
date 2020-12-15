import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl, FormGroup, FormControlName, Validators, FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CustomerReport } from 'src/app/models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'underscore';
import * as moment from 'moment';

import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global-service.service';
import { CustomerReportsService } from 'src/app/services/ngin/customer-reports.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponentV20 implements OnInit {

  filterTypeSettings: IDropdownSettings = {};
  serviceTypes: any[];
  displayedColumns: string[] = ['date', 'types', 'memory'];
  dataSource: MatTableDataSource<CustomerReport>;
  customer_list: any[];
  days_of_week: any[];
  daysChecked: any[];
  customer_report: any[];
  // bar_width: any[];
  public userPermission: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  show_errors: boolean = false;

  filter_form = new FormGroup({
    customer_name: new FormControl({ value: "", disabled: false }, [Validators.required]),
    days_checked: new FormControl([]),
    day_of_week: new FormArray([]),
    from_date_range: new FormControl({ value: "", disabled: false }, [Validators.required]),
    to_date_range: new FormControl({ value: "", disabled: false }, [Validators.required]),
    week_list: new FormArray([]),
  });

  get week_days() { return this.filter_form.get('day_of_week') as FormArray };

  public week_array: any = ['false', 'true', 'true', 'true', 'true', 'true', 'false'];
  public customerStatList: any[];
  fromDate: string;
  toDate: string;
  date_from: string;

  get filter_form_controls() { return this.filter_form.controls; }

  constructor(private CustomerReportsService: CustomerReportsService, private route: Router, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Customer Reports'); 
    if (localStorage.getItem('userPermission') == 'true') {
      this.userPermission = true;
    } else {
      this.userPermission = false;
    }
    this.fromDate = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");
    this.toDate = this.date_from = moment().subtract(1, 'd').format("YYYY-MM-DD");

    this.filter_form.patchValue({
      from_date_range: this.fromDate,
      to_date_range: this.toDate
    });

    this.filterTypeSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'name',
      idField: 'id',
    };

    this.dataSource = new MatTableDataSource(this.customerStatList);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.get_customer_list();
  }


  onCheckChange(event) {
    const formArray: FormArray = this.filter_form.get('day_of_week') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  getWeekArray() {
    let week_arr = this.filter_form.value.day_of_week;
    let result = [];
    week_arr.forEach((day, index) => {
      if (day) {
        result.push(this.days_of_week[index]);
      }
    });

    return result;
  }

  get_customer_list() {
    this.CustomerReportsService.getCustomerList().subscribe((results) => {

      this.customer_list = results.responseResult.result.incnCustomerList;
      this.days_of_week = results.responseResult.result.daysOfWeek;
      this.daysChecked = results.responseResult.result.daysChecked;

      this.days_of_week.forEach((item, index) => {
        this.add_day(this.daysChecked[index]);
      });

      console.log("Form value");
      console.log(this.filter_form.value);
    })
  }

  on_customer_select(ev) { }

  on_customer_deselect(ev) { }

  filter_form_search() {

    if (this.filter_form.valid) {
      console.log('form submitted');
      let filter_form_value = this.filter_form.value;
      let customer_name_list = _.pluck(filter_form_value.customer_name, 'name');
      let from_temp = moment(filter_form_value.from_date_range).format('DD/MM/YYYY');
      let to_temp = moment(filter_form_value.to_date_range).format('DD/MM/YYYY');



      let submit_obj =
      {
        "customersSelectedList": customer_name_list,
        "daysChecked": filter_form_value.day_of_week,
        "daysOfWeek": this.getWeekArray(),
        "fromDate": from_temp,
        "toDate": to_temp,
        "weekList": filter_form_value.day_of_week
      };

      this.global.show_loader();
      this.CustomerReportsService.getRecord(submit_obj).subscribe((results) => {
        this.global.hide_loader();
        console.log(results.responseResult.result.customerStatList);
        this.customerStatList = results.responseResult.result.customerStatList;

      });
    } else {
      this.show_errors = true;
    }


  }
  filter_form_reset() {
    this.filter_form.reset();
  }
  open_edit_window() {
    this.route.navigateByUrl('/ngin20/addedCustomerList');
  }

  add_day(val) {
    let week_day = new FormControl({ value: val, disabled: false });
    this.week_days.push(week_day);
  }
}
