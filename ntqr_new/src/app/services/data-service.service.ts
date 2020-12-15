import { Injectable } from '@angular/core';
import {  Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  private countryId:string
   private _countryIdSource = new Subject();
   countryId$ = this._countryIdSource.asObservable()

  constructor() { }

  public setCountryIdInit(value:string){
    //console.log(value)
    this.countryId=value
    console.log("value from sender: "+this.countryId)
    this._countryIdSource.next()
    this.setCountryId(this.countryId)
    
  }
  public setCountryId(value:string){
     this._countryIdSource.next(value)
  }


  
}
