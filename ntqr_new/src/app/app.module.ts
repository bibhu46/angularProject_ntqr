import { BrowserModule } from '@angular/platform-browser';
import { BreadcrumbModule } from 'angular-crumbs';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandlerServiceService } from './services/intercepters/global-error-handler-service.service';
import { GlobalHttpInterceptorServiceService } from './services/intercepters/global-http-interceptor-service.service';
import { DashboardService } from './services/sonus/dashboard.service';
import { DeviceKpiService } from './services/sonus/devicekpi.service';
import { TgStatsService } from './services/sonus/trunkgroup-statistics.service';
import { CustomerReportsService } from './services/ngin/customer-reports.service';
import { DataServiceService } from './services/data-service.service';
import { DeviceKpiPopupService } from './services/sonus/devicekpi-popup.service';
import { GlobalService } from './services/global-service.service';


/* 3rd party modules ---------------------------------------------- */

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { JwtModule } from '@auth0/angular-jwt';
import { NgMonthPickerModule } from 'ng-month-picker';

/* Custom Pipes Added ----------------------------------------------- */

import { HoursPipe } from './pipes/hours.pipe';
import { NullToZeroPipe } from './pipes/null-to-zero.pipe';

/* Custom components added ---------------------------------------- */

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { RatingsBarComponent } from './components/ratings-bar/ratings-bar.component';

/* Custom route components added ---------------------------------------- */

import { LoginPageComponent } from './route_components/login-page/login-page.component';
import { HomePageComponent } from './route_components/home-page/home-page.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { WatchlistService } from './services/sonus/watchlist.service';
import { NginRatingbarComponent } from './components/ngin-ratingbar/ngin-ratingbar.component';
import { SonusDeviceStatsV2Component } from './route_components/Sonus/device-statistics/sonus-device-stats-v2.component';
import { SonusDeviceStatsComponent } from './route_components/Sonus/sonus-device-stats-testing/sonus-device-stats.component';
import { SonusDataAvailabilityComponent } from './route_components/Sonus/data-availability/sonus-data-availability.component';
import { SonusHelpComponent } from './route_components/Sonus/help/sonus-help.component';
import { TrunkGroupSearchComponent } from './route_components/Sonus/trunkgroup-statistics/trunk-group-search.component';
import { DashboardV2Component } from './route_components/Sonus/dashboard/dashboard-v2.component';
import { DailyBusyHourReportComponent } from './route_components/Sonus/trunkgroup-statistics-popup/daily-busy-hour-report.component';
import { SystemStatComponent } from './route_components/NGIN_5.2/system-statistics/system-stat.component';
import { ServiceKeysComponent } from './route_components/NGIN_5.2/service-keys/service-keys.component';
import { PopupSysStatComponent } from './route_components/NGIN_5.2/popup-system-statistics/popup-sys-stat.component';
import { PopupObjCapComponent } from './route_components/NGIN_5.2/popup-obj-capacity/popup-obj-cap.component';
import { PopupMrfStatComponent } from './route_components/NGIN_5.2/popup-mrf-statistics/popup-mrf-stat.component';
import { PopupInstalledNumComponent } from './route_components/NGIN_5.2/popup-installed-numbers/popup-installed-num.component';
import { PopupCallAttemptComponent } from './route_components/NGIN_5.2/popup-call-attempts/popup-call-attempt.component';
import { MrfStatisticsComponent } from './route_components/NGIN_5.2/mrf-statistics/mrf-statistics.component';
import { InstalledNumbComponent } from './route_components/NGIN_5.2/installed-numbers/installed-numb.component';
import { ExpandInstallednumberCountryComponent } from './route_components/NGIN_5.2/view-servicekeyslink/expand-installednumber-country.component';
import { EditServiceKeysComponent } from './route_components/NGIN_5.2/edit-service-keys/edit-service-keys.component';
import { DataAvailabilityComponent } from './route_components/NGIN_5.2/data-availability/data-availability.component';
import { CustomerReportsComponent } from './route_components/NGIN_5.2/customer-reports/customer-reports.component';
import { CallAttemptsV2Component } from './route_components/NGIN_5.2/call-attempts/call-attempts-v2.component';
import { AddCustomerComponent } from './route_components/NGIN_5.2/add-customer/add-customer.component';
import { ObjCapacityComponent } from './route_components/NGIN_5.2/obj-capacity/obj-capacity.component';
import { DeviceStatPopupComponent } from './route_components/Sonus/device-statistics-popup/devicestat-popup.component';
import { ManageWatchlistComponent } from './route_components/settings/manage-watchlist/manage-watchlist.component';
import { PageNotFoundComponent } from './route_components/page-not-found/page-not-found.component';
import { UserManagementComponent } from './route_components/settings/user-management/user-management.component';
import { ProfileComponent } from './route_components/settings/profile/profile.component';
import { TrunkgroupWatchlistSearchComponent } from './route_components/Sonus/watchlist/trunkgroup-watchlist-search.component';
import { IncnCustomerComponent } from './route_components/NGIN_5.2/incn-customer/incn-customer.component';
import { EditIncnCustomerComponent } from './route_components/NGIN_5.2/edit-incn-customer/edit-incn-customer.component';
import { AddServiceKeyComponent } from './route_components/NGIN_5.2/add-service-key/add-service-key.component';
import { ViewServiceKeyComponent } from './route_components/NGIN_5.2/view-service-key/view-service-key.component';
import { OptionsComponent } from './route_components/settings/options/options.component';
import { NginPerformanceThresholdComponent } from './route_components/settings/ngin-performance-threshold/ngin-performance-threshold.component';
import { SonusPerformanceThresholdComponent } from './route_components/settings/sonus-performance-threshold/sonus-performance-threshold.component';
import { SonusThresholdComponent } from './route_components/settings/sonus-threshold/sonus-threshold.component';
import { EditCardInformationComponent } from './route_components/settings/edit-card-information/edit-card-information.component';
import { UpdateServiceKeyComponent } from './route_components/NGIN_5.2/update-service-key/update-service-key.component';

/* importing NGIN_20 components */

import { PopupInstalledNumComponentV20 } from './route_components/NGIN_20/popup-installed-numbers/popup-installed-num.component';
import { PopupObjCapComponentV20 } from './route_components/NGIN_20/popup-obj-capacity/popup-obj-cap.component';
import { PopupCallAttemptComponentV20 } from './route_components/NGIN_20/popup-call-attempts/popup-call-attempt.component';
import { PopupSysStatComponentV20 } from './route_components/NGIN_20/popup-system-statistics/popup-sys-stat.component';
import { PopupMrfStatComponentV20 } from './route_components/NGIN_20/popup-mrf-statistics/popup-mrf-stat.component';
import { CustomerReportsComponentV20 } from './route_components/NGIN_20/customer-reports/customer-reports.component';
import { ServiceKeysComponentV20 } from './route_components/NGIN_20/service-keys/service-keys.component';
import { DataAvailabilityComponentV20 } from './route_components/NGIN_20/data-availability/data-availability.component';
import { MrfStatisticsComponentV20 } from './route_components/NGIN_20/mrf-statistics/mrf-statistics.component';
import { SystemStatComponentV20 } from './route_components/NGIN_20/system-statistics/system-stat.component';
import { ObjCapacityComponentV20 } from './route_components/NGIN_20/obj-capacity/obj-capacity.component';
import { InstalledNumbComponentV20 } from './route_components/NGIN_20/installed-numbers/installed-numb.component';
import { CallAttemptsV2ComponentV20 } from './route_components/NGIN_20/call-attempts/call-attempts-v2.component';
import { EditServiceKeysComponentV20 } from './route_components/NGIN_20/edit-service-keys/edit-service-keys.component';
import { AddCustomerComponentV20 } from './route_components/NGIN_20/add-customer/add-customer.component';
import { ExpandInstallednumberCountryComponentV20 } from './route_components/NGIN_20/view-servicekeyslink/expand-installednumber-country.component';
import { IncnCustomerComponentV20 } from './route_components/NGIN_20/incn-customer/incn-customer.component';
import { EditIncnCustomerComponentV20 } from './route_components/NGIN_20/edit-incn-customer/edit-incn-customer.component';
import { AddServiceKeyComponentV20 } from './route_components/NGIN_20/add-service-key/add-service-key.component';
import { UpdateServiceKeyComponentV20 } from './route_components/NGIN_20/update-service-key/update-service-key.component';
import { ViewServiceKeyComponentV20 } from './route_components/NGIN_20/view-service-key/view-service-key.component';


//exporting functions

export function tokenGetter() {
  let current_user = localStorage.getItem("token");  
  return current_user;
}

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    MenuBarComponent,
    TrunkGroupSearchComponent,
    RatingsBarComponent,
    DailyBusyHourReportComponent,
    TrunkgroupWatchlistSearchComponent,    
    CustomerReportsComponent,
    CustomerReportsComponentV20,
    ServiceKeysComponent,
    ServiceKeysComponentV20,
    DataAvailabilityComponent,
    DataAvailabilityComponentV20,    
    MrfStatisticsComponent,
    MrfStatisticsComponentV20,
    SystemStatComponent,
    SystemStatComponentV20,
    PopupMrfStatComponent,
    PopupMrfStatComponentV20,
    InstalledNumbComponent,
    InstalledNumbComponentV20,
    LoginPageComponent,
    HomePageComponent,
    PopupObjCapComponent,
    PopupObjCapComponentV20,
    PopupSysStatComponent,
    PopupSysStatComponentV20,
    PopupInstalledNumComponent,
    PopupInstalledNumComponentV20,
    CallAttemptsV2Component,
    CallAttemptsV2ComponentV20,
    PopupCallAttemptComponent,
    PopupCallAttemptComponentV20,
    EditServiceKeysComponent,
    EditServiceKeysComponentV20,
    AddCustomerComponent,
    AddCustomerComponentV20,
    PreloaderComponent,
    HoursPipe,
    PreloaderComponent,
    AlertMessageComponent,
    NullToZeroPipe,
    SonusHelpComponent,
    SonusDataAvailabilityComponent,
    DashboardV2Component,
    SonusDeviceStatsComponent,
    SonusDeviceStatsV2Component,
    NginRatingbarComponent,
    ExpandInstallednumberCountryComponent,
    ExpandInstallednumberCountryComponentV20,
    ObjCapacityComponent,
    ObjCapacityComponentV20,
    DeviceStatPopupComponent,
    PageNotFoundComponent,
    ManageWatchlistComponent,
    UserManagementComponent,
    ProfileComponent,
    IncnCustomerComponent,
    IncnCustomerComponentV20,
    EditIncnCustomerComponent,
    EditIncnCustomerComponentV20,
    AddServiceKeyComponent,
    AddServiceKeyComponentV20,
    ViewServiceKeyComponent,
    ViewServiceKeyComponentV20,
    OptionsComponent,
    NginPerformanceThresholdComponent,
    SonusPerformanceThresholdComponent,
    SonusThresholdComponent,
    EditCardInformationComponent,
    UpdateServiceKeyComponent,
    UpdateServiceKeyComponentV20
  ],
  imports: [
    BrowserModule,
    BreadcrumbModule,
    AppRoutingModule,
    HttpClientModule,    
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    NgbModule,    
    NgMultiSelectDropDownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter        
      }
    }),
    NgMonthPickerModule   
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorServiceService, multi: true  },
    { provide: ErrorHandler, useClass:GlobalErrorHandlerServiceService},
    DashboardService, DeviceKpiService, TgStatsService, CustomerReportsService, DeviceKpiPopupService, GlobalService,WatchlistService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
