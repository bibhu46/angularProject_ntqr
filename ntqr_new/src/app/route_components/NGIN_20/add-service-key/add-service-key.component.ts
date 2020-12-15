import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceKeyService } from 'src/app/services/ngin/service-key.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-service-key',
  templateUrl: './add-service-key.component.html',
  styleUrls: ['./add-service-key.component.scss']
})
export class AddServiceKeyComponentV20 implements OnInit {
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
    countryGroupId: new FormControl({ value: "", disabled: false }),
    serviceKeyDesc: new FormControl({ value: "", disabled: false }),
  });

  service_type: any;
  country_list: any;
  filterTypeSettings: IDropdownSettings = {};
  countryGroupSettings: IDropdownSettings = {};
  codeValue: any;
  countryGroupId: any;
  serviceKeyDesc: any;

  // get number_range(): FormArray {
  //   return this.service_form.get('number_range') as FormArray;
  // }

  // addNumber() {
  //   this.number_range.push(new FormControl('', Validators.required));
  // }

  constructor(private ServiceKeyService: ServiceKeyService, private router: Router, private global: GlobalService, private fb: FormBuilder,private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('NGIN 20 Add Service Key'); 
    this.get_data();
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
  }

  get_data() {
    this.global.show_loader();
    this.ServiceKeyService.addServiceKey().subscribe((results) => {
      this.global.hide_loader();
      this.service_type = results.responseResult.result.stypeList;
      this.country_list = results.responseResult.result.countryGroupList;

      this.service_form.patchValue({
        selectedTypeValue: [this.service_type[0]],
        selectedCountryValue: [this.country_list[0]],
        //country_code: this.country_list[0].label
      });

      this.ServiceKeyService.editServiceKey(this.country_list[0].label).subscribe((results) => {
       
        this.service_form.patchValue({
          serviceKeyDesc: results.responseResult.result.serviceKeyDesc,
          countryGroupId : results.responseResult.result.selectedCountryGroupId,
          country_code: results.responseResult.result.countryCode,
        });

      })

    })
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
    var rangeValue : string = numberArr[0];
    let submit_obj = {
      "countryCode": this.code,
      "countryInputType": service_form_value.type,
      "countryName": this.country,
      "numberRanges": rangeValue,
      "selectedCountryGroupId": service_form_value.countryGroupId,
      "serviceKey": {
        "numberRanges": 
          numberArr
        ,
        "serviceKey": service_form_value.service_key
      },
      "serviceKeyDesc": service_form_value.serviceKeyDesc,
      "serviceType": service_form_value.selectedTypeValue[0].label,
      "serviceTypeDesc": service_form_value.selectedTypeValue[0].value,
      "numberRangesToInsert": [
        {
          "numberRange": rangeValue //??
        }
      ]
    }
      ;
    console.log(submit_obj)

    this.ServiceKeyService.submitServiceKey(submit_obj).subscribe((results) => {
      let mess = "The Service Keys has been added successfully";

      let modal_obj = {
        title: '<span>Service Keys </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);

    })
    this.router.navigate(['/ngin20/serviceKeys']);
  }
  onCancel() {
    console.log('cancel')
    this.router.navigate(['/ngin20/serviceKeys']);
  }
  on_country_select(ev) {
    this.ServiceKeyService.editServiceKey(ev.label).subscribe((results) => {
      
      this.service_form.patchValue({
        serviceKeyDesc: results.responseResult.result.serviceKeyDesc,
        countryGroupId : results.responseResult.result.selectedCountryGroupId,
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
