import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorization/authorize.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  response:any; 
  show_errors: boolean = false;

  userForm = new FormGroup({
    username: new FormControl({ value: "", disabled: false}, [Validators.required]),
    password: new FormControl({ value: "", disabled: false}, [Validators.required])        
  });

  get LoginForm() { return this.userForm.controls; }

  constructor(private service: AuthorizeService, private router: Router, private global: GlobalService,private titleService: Title) {
    if(this.service.isUserLoggedIn()){
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');  
    this.userForm.valueChanges.subscribe(val => {
      if((val.username == "" || val.password == "") && this.userForm.touched){
        this.show_errors = true;
      } else {
        this.show_errors = false;
      }
    });
  }

  errorMessage = "";
  public  getAccessToken(authRequest){    
    let resp = this.service.generateToken(authRequest);
    resp.subscribe(data => { 
      localStorage.setItem('userPermission',data.response.userPermission);
      localStorage.setItem('logged',"true");
      this.global.hide_loader();      
      this.showHome();
    }, (err) => {
          let mess = "The <span class='color-red'>User-id</span> or <span class='color-red'>password</span> is incorrect";        

          let modal_obj = {
            title: 'NTQR <span class="color-red">Login </span> Error',
            size: "sm",
            color: "red",                
            auto_close: false,
            content: '<p class="text-center my-3">' + mess + '</p>'
          };

          this.global.hide_loader();
          this.global.open_alert_message(modal_obj);
    });    
    
  }

  public showHome(){
    this.router.navigateByUrl('/home');
  }
  

  onSubmit() {
    if(this.userForm.valid) {      
      this.show_errors = false;
      this.global.show_loader();
      this.getAccessToken(this.userForm.value);
    } else {
      this.show_errors = true;
    }
    
  }  

}
