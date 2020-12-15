import { Component, OnInit } from '@angular/core';
import { ServiceKeyService } from 'src/app/services/ngin/service-key.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global-service.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-update-service-key',
  templateUrl: './update-service-key.component.html',
  styleUrls: ['./update-service-key.component.scss']
})
export class UpdateServiceKeyComponentV20 implements OnInit {

  arr = [];

  service_form = new FormGroup({
    selectedCountryValue: new FormControl({ value: "", disabled: false }, [Validators.required]),
    country_code: new FormControl({ value: "", disabled: false }, [Validators.required]),
    service_key: new FormControl({ value: "", disabled: false }, [Validators.required]),
    selectedTypeValue: new FormControl({ value: "", disabled: false }, [Validators.required]),
    search_type: new FormControl({ value: "", disabled: false }, [Validators.required]),
    type: new FormControl({ value: "Choose", disabled: false }, [Validators.required]),
    country_text: new FormControl({ value: "", disabled: false }, [Validators.required]),
    country_code_new: new FormControl({ value: "", disabled: false }, [Validators.required]),
    //number_range: new FormArray([ new FormControl('', Validators.required)]),
    number_range: new FormControl({ value: "", disabled: false }, [Validators.required]),

  });

  service_type: any;
  country_list: any;
  filterTypeSettings: IDropdownSettings = {};
  countryGroupSettings: IDropdownSettings = {};
  codeValue: any;
  countryGroupId: any;
  countryId: any;


  constructor(private aRoute: ActivatedRoute, private ServiceKeyService: ServiceKeyService, private router: Router, private global: GlobalService, private fb: FormBuilder,private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('NGIN 20 Edit Service Keys');
    this.countryId = this.aRoute.snapshot.paramMap.get('countryId');
    this.filterTypeSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'value',
      idField: 'label',
    };
    this.countryGroupSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false,
      textField: 'value',
      idField: 'label',
    }
    this.get_data();
  }

  get_data() {
    this.global.show_loader();
    this.ServiceKeyService.editServiceKey(this.countryId).subscribe((results) => {
      this.global.hide_loader();
      this.service_type = results.responseResult.result.stypeList;
      this.country_list = results.responseResult.result.countryGroupList;
      this.service_form.patchValue({
        countryGroupId: results.responseResult.result.selectedCountryGroupId,
        country_code: results.responseResult.result.countryCode,
        service_key: results.responseResult.result.serviceKeyDesc,
        number_range: results.responseResult.result.numberRanges,
        selectedTypeValue: [results.responseResult.result.serviceTypes],
        selectedCountryValue: [results.responseResult.result.countryGroup]
      });
    });

  }

  find_country_id(name) {
    this.country_list.forEach(item => {
      if (item.value == name) {
        return item.id;
      }
    });
  }

  changeOption(e) { }

  code: any;
  country: any;

  add_serviceKey() {
    let service_form_value = this.service_form.value;
    if (service_form_value.type == 'Choose') {
      this.code = service_form_value.country_code,
        this.country = service_form_value.selectedCountryValue[0].value
    } else {
      this.code = service_form_value.country_code_new,
        this.country = service_form_value.country_text
    }

    var numberArr = service_form_value.number_range.split(',');

    let submit_obj = {
      "countryCode": this.code,
      "countryInputType": service_form_value.type,
      "countryName": this.country,
      "numberRanges": numberArr,
      "selectedCountryGroupId": service_form_value.countryGroupId,
      "serviceKey": {
        "numberRanges": [
          numberArr
        ],
        "serviceKey": service_form_value.service_key
      },
      "serviceKeyDesc": "",
      "serviceType": service_form_value.selectedTypeValue[0].label,
      "serviceTypeDesc": service_form_value.selectedTypeValue[0].value,
      "numberRangesToInsert": [
        {
          "numberRange": numberArr
        }
      ]
    }
      ;
    console.log(submit_obj)
    this.global.show_loader();
    this.ServiceKeyService.submitServiceKey(submit_obj).subscribe((results) => {
      this.global.hide_loader();
      let mess = "The Service Keys has been updated successfully";
      let modal_obj = {
        title: '<span>Service Keys </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };
      this.global.open_alert_message(modal_obj);
      this.router.navigate(['/ngin20/serviceKeys']);
    }, (err) => {
      this.global.hide_loader();
    });
  }
  onCancel() {
    console.log('cancel')
    this.router.navigate(['/ngin20/serviceKeys']);
  }
  on_country_select(ev) {
    this.ServiceKeyService.editServiceKey(ev.label).subscribe((results) => {
      this.countryGroupId = results.responseResult.result.selectedCountryGroupId;
      this.service_form.patchValue({
        countryGroupId: results.responseResult.result.selectedCountryGroupId,
        country_code: results.responseResult.result.countryCode,
      });
    })
  }
  on_country_deselect(ev) {
    this.service_form.patchValue({
      country_code: ''
    });
  }

}
