import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/authorization/auth-guard.service';

/* importing custom modules for ntqr2.0 -------------------------------- */

import { LoginPageComponent } from './route_components/login-page/login-page.component';
import { HomePageComponent } from './route_components/home-page/home-page.component';
import { SonusDeviceStatsV2Component } from './route_components/Sonus/device-statistics/sonus-device-stats-v2.component';
import { SonusDeviceStatsComponent } from './route_components/Sonus/sonus-device-stats-testing/sonus-device-stats.component';
import { SonusDataAvailabilityComponent } from './route_components/Sonus/data-availability/sonus-data-availability.component';
import { SonusHelpComponent } from './route_components/Sonus/help/sonus-help.component';
import { TrunkGroupSearchComponent } from './route_components/Sonus/trunkgroup-statistics/trunk-group-search.component';
import { TrunkgroupWatchlistSearchComponent } from './route_components/Sonus/watchlist/trunkgroup-watchlist-search.component';
import { DashboardV2Component } from './route_components/Sonus/dashboard/dashboard-v2.component';
import { DailyBusyHourReportComponent } from './route_components/Sonus/trunkgroup-statistics-popup/daily-busy-hour-report.component';
import { SystemStatComponent } from './route_components/NGIN_5.2/system-statistics/system-stat.component';
import { ServiceKeysComponent } from './route_components/NGIN_5.2/service-keys/service-keys.component';
import { PopupSysStatComponent } from './route_components/NGIN_5.2/popup-system-statistics/popup-sys-stat.component';
import { PopupObjCapComponent } from './route_components/NGIN_5.2/popup-obj-capacity/popup-obj-cap.component';
import { PopupMrfStatComponent } from './route_components/NGIN_5.2/popup-mrf-statistics/popup-mrf-stat.component';
import { PopupInstalledNumComponent } from './route_components/NGIN_5.2/popup-installed-numbers/popup-installed-num.component';

import { PopupCallAttemptComponent } from './route_components/NGIN_5.2/popup-call-attempts/popup-call-attempt.component';
import { ObjCapacityComponent } from './route_components/NGIN_5.2/obj-capacity/obj-capacity.component';
import { MrfStatisticsComponent } from './route_components/NGIN_5.2/mrf-statistics/mrf-statistics.component';
import { InstalledNumbComponent } from './route_components/NGIN_5.2/installed-numbers/installed-numb.component';
import { ExpandInstallednumberCountryComponent } from './route_components/NGIN_5.2/view-servicekeyslink/expand-installednumber-country.component';
import { EditServiceKeysComponent } from './route_components/NGIN_5.2/edit-service-keys/edit-service-keys.component';
import { DataAvailabilityComponent } from './route_components/NGIN_5.2/data-availability/data-availability.component';
import { CustomerReportsComponent } from './route_components/NGIN_5.2/customer-reports/customer-reports.component';
import { CallAttemptsV2Component } from './route_components/NGIN_5.2/call-attempts/call-attempts-v2.component';
import { AddCustomerComponent } from './route_components/NGIN_5.2/add-customer/add-customer.component';
import { DeviceStatPopupComponent } from './route_components/Sonus/device-statistics-popup/devicestat-popup.component';
import { PageNotFoundComponent } from "./route_components/page-not-found/page-not-found.component";
import { ManageWatchlistComponent } from './route_components/settings/manage-watchlist/manage-watchlist.component';
import { UserManagementComponent } from './route_components/settings/user-management/user-management.component';
import { ProfileComponent } from './route_components/settings/profile/profile.component';
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

// importing NGIN-20 components

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

const routes: Routes = [
  //Login 
  { path: 'login', component: LoginPageComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuardService] },

  //Sonus
  { path: 'sonus/trunkGroupStatistics', component: TrunkGroupSearchComponent, canActivate: [AuthGuardService] },
  { path: 'sonus/trunkGroupStatisticsPopup/:trunk_id/:tgName/:tgDesc/:gateway/:serviceType/:searchType/:date', component: DailyBusyHourReportComponent, canActivate: [AuthGuardService] },
  { path: 'sonus/trunkGroupStatisticsPopup/:trunk_id/:tgName/:tgDesc/:gateway/:serviceType/:searchType/:date_from/:date_to', component: DailyBusyHourReportComponent, canActivate: [AuthGuardService] },
  { path: 'sonus/watchlist', component: TrunkgroupWatchlistSearchComponent, canActivate: [AuthGuardService] },
  { path: 'sonus/help', component: SonusHelpComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Help' } },
  { path: 'sonus/dataAvilability', component: SonusDataAvailabilityComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Sonus Data Availability' } },
  { path: 'sonus/dashboard', component: DashboardV2Component, canActivate: [AuthGuardService], data: { breadcrumb: 'Sonus Dashboard' } },
  { path: 'sonus/devicestats_test', component: SonusDeviceStatsComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Sonus Device Statistics' } },
  { path: 'sonus/devicestats', component: SonusDeviceStatsV2Component, canActivate: [AuthGuardService], data: { breadcrumb: 'Sonus Device Statistics' } },
  { path: 'sonus/devicestats/popup', component: DeviceStatPopupComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Device Stats Details' } },

  //NGIN-5.2  
  { path: 'ngin5.2/installedNumbersPopup/:countryId/:desc/:name/:date', component: PopupInstalledNumComponent, canActivate: [AuthGuardService] },
  { path: 'ngin5.2/objectCapacityPopup/:serviceId/:desc/:servName/:date', component: PopupObjCapComponent, canActivate: [AuthGuardService] },
  { path: 'ngin5.2/callAttemptsPopup/:date', component: PopupCallAttemptComponent, canActivate: [AuthGuardService] },
  { path: 'ngin5.2/systemStatisticsPopup/:date/:host', component: PopupSysStatComponent, canActivate: [AuthGuardService] },
  { path: 'ngin5.2/mrfStatisticsPopup/:date/:host', component: PopupMrfStatComponent, canActivate: [AuthGuardService] },
  { path: 'ngin5.2/customerReports', component: CustomerReportsComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Customer Reports' } },
  { path: 'ngin5.2/serviceKeys', component: ServiceKeysComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Service Keys' } },
  { path: 'ngin5.2/dataAvilability', component: DataAvailabilityComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Data Availability' } },
  { path: 'ngin5.2/mrfStatistics', component: MrfStatisticsComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'MRF Statistics' } },
  { path: 'ngin5.2/systemStatistics', component: SystemStatComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Sysytem Statistics' } },
  { path: 'ngin5.2/objectCapacity', component: ObjCapacityComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Object Capacity' } },
  { path: 'ngin5.2/installedNumbers', component: InstalledNumbComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Installed Numbers' } },
  { path: 'ngin5.2/callAttempts', component: CallAttemptsV2Component, canActivate: [AuthGuardService], data: { breadcrumb: 'Call Attempts' } },
  { path: 'ngin5.2/countryGroupEdit/:countryId', component: EditServiceKeysComponent, canActivate: [AuthGuardService] },
  { path: 'ngin5.2/addedCustomerList', component: AddCustomerComponent, canActivate: [AuthGuardService], data: { breadcrumb: '' } },
  { path: 'ngin5.2/openServiceKey/:countryId/:desc/:name/:date', component: ExpandInstallednumberCountryComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Service Key' } },
  { path: 'ngin5.2/addCustomer', component: IncnCustomerComponent, canActivate: [AuthGuardService], data: { breadcrumb: '' } },
  { path: 'ngin5.2/editCustomer/:name/:id', component: EditIncnCustomerComponent, canActivate: [AuthGuardService], data: { breadcrumb: '' } },
  { path: 'ngin5.2/addServiceKey', component: AddServiceKeyComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Create Service Keys' } },
  { path: 'ngin5.2/updateServiceKey/:countryId', component: UpdateServiceKeyComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Update Service Keys' } },
  { path: 'ngin5.2/viewServiceKey/:countryId', component: ViewServiceKeyComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'View Service Key' } },

  //NGIN-20  
  { path: 'ngin20/installedNumbersPopup/:countryId/:desc/:name/:date', component: PopupInstalledNumComponentV20, canActivate: [AuthGuardService] },
  { path: 'ngin20/objectCapacityPopup/:serviceId/:desc/:servName/:date', component: PopupObjCapComponentV20, canActivate: [AuthGuardService] },
  { path: 'ngin20/callAttemptsPopup/:date', component: PopupCallAttemptComponentV20, canActivate: [AuthGuardService] },
  { path: 'ngin20/systemStatisticsPopup/:date/:host', component: PopupSysStatComponentV20, canActivate: [AuthGuardService] },
  { path: 'ngin20/mrfStatisticsPopup/:date/:host', component: PopupMrfStatComponentV20, canActivate: [AuthGuardService] },
  { path: 'ngin20/customerReports', component: CustomerReportsComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Customer Reports' } },
  { path: 'ngin20/serviceKeys', component: ServiceKeysComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Service Keys' } },
  { path: 'ngin20/dataAvilability', component: DataAvailabilityComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Data Availability' } },
  { path: 'ngin20/mrfStatistics', component: MrfStatisticsComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'MRF Statistics' } },
  { path: 'ngin20/systemStatistics', component: SystemStatComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Sysytem Statistics' } },
  { path: 'ngin20/objectCapacity', component: ObjCapacityComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Object Capacity' } },
  { path: 'ngin20/installedNumbers', component: InstalledNumbComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Installed Numbers' } },
  { path: 'ngin20/callAttempts', component: CallAttemptsV2ComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Call Attempts' } },
  { path: 'ngin20/countryGroupEdit/:countryId', component: EditServiceKeysComponentV20, canActivate: [AuthGuardService] },
  { path: 'ngin20/addedCustomerList', component: AddCustomerComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: '' } },
  { path: 'ngin20/openServiceKey/:countryId/:desc/:name/:date', component: ExpandInstallednumberCountryComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Service Key' } },
  { path: 'ngin20/addCustomer', component: IncnCustomerComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: '' } },
  { path: 'ngin20/editCustomer/:name/:id', component: EditIncnCustomerComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: '' } },
  { path: 'ngin20/addServiceKey', component: AddServiceKeyComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Create Service Keys' } },
  { path: 'ngin20/updateServiceKey/:countryId', component: UpdateServiceKeyComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'Update Service Keys' } },
  { path: 'ngin20/viewServiceKey/:countryId', component: ViewServiceKeyComponentV20, canActivate: [AuthGuardService], data: { breadcrumb: 'View Service Key' } },

  //Settings
  { path: 'manageWatchlist', component: ManageWatchlistComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Manage Watchlist' } },
  { path: 'userManagement', component: UserManagementComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'User Management' } },
  { path: 'myProfile', component: ProfileComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'My Profile' } },
  {
    path: 'options', component: OptionsComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Options' },
    children: [
      { path: 'nginPerformanceThreshold', component: NginPerformanceThresholdComponent, canActivate: [AuthGuardService] },
      { path: 'sonusPerformanceThreshold', component: SonusPerformanceThresholdComponent, canActivate: [AuthGuardService] },
      { path: 'sonusThreshold', component: SonusThresholdComponent, canActivate: [AuthGuardService] },
      { path: '', redirectTo:'sonusPerformanceThreshold', pathMatch:"full" }
    ]
  },
  { path: 'editCard/:deviceId/:shelf/:slot', component: EditCardInformationComponent, canActivate:[AuthGuardService],data: { breadcrumb: 'Card' } },

  //404
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

