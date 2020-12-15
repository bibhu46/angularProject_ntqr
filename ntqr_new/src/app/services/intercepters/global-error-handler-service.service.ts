import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerServiceService {

  constructor() { }

  handleError(error: Error | HttpErrorResponse) {
    console.log('GlobalErrorHandlerService')
    console.error(error);
  }
}
