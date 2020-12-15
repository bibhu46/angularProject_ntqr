import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomerReportsService } from 'src/app/services/ngin/customer-reports.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-incn-customer',
  templateUrl: './edit-incn-customer.component.html',
  styleUrls: ['./edit-incn-customer.component.scss']
})
export class EditIncnCustomerComponentV20 implements OnInit {

  customer_form = new FormGroup({
    customer_name: new FormControl({ value: "", disabled: false }, [Validators.required]),
  });
  public id: any;
  public name: any;
  constructor(private CustomerReportsService: CustomerReportsService, private global: GlobalService, private router: Router, private aRoute: ActivatedRoute,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Edit Customer'); 
    this.name = this.aRoute.snapshot.paramMap.get('name')
    this.id = this.aRoute.snapshot.paramMap.get('id')
    console.log(this.name, this.id)
  }

  customer_submit_form() {
    console.log('called');
    let customer_form_value = this.customer_form.value;
    let submit_obj =
    {
      "incnCustomerName": customer_form_value.customer_name,
      "incnCustomerId": this.id
    };
    console.log(submit_obj);
    this.global.show_loader();
    this.CustomerReportsService.editCustomerInList(submit_obj).subscribe((results) => {
      this.global.hide_loader();
      console.log(results)
      let mess = "The Customer <span class='color-red'>" + customer_form_value.customer_name + "</span> has been update successfully";

      let modal_obj = {
        title: '<span>Customer </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);
      this.router.navigate(['/ngin20/addedCustomerList']);
    })
  }

  onCancel() {
    this.router.navigate(['/ngin20/addedCustomerList']);
  }

}
