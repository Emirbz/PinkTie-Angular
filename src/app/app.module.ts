import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DetailpatientComponent } from './detailpatient/detailpatient.component';
import { DetailUploadComponent } from './detail-upload/detail-upload.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ListpatientsComponent } from './listpatients/listpatients.component';
import { SignupComponent } from './signup/signup.component';
import { InboxComponent } from './inbox/inbox.component';
import { RdvComponent } from './rdv/rdv.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars';

import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DoctorprofilComponent } from './doctorprofil/doctorprofil.component';
import { CompleteprofildoctorComponent } from './completeprofildoctor/completeprofildoctor.component';
import { AddOrdonnanceComponent } from './add-ordonnance/add-ordonnance.component';
import { ModifpatientComponent } from './modifpatient/modifpatient.component';
import { ModifuserComponent } from './modifuser/modifuser.component';
import { PatientInboxComponent } from './patient-inbox/patient-inbox.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { HistoriqueComponent } from './historique/historique.component';
import { RapportComponent } from './rapport/rapport.component';
import { Rdv2Component } from './rdv2/rdv2.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { BookComponent } from './book/book.component';
import { Historique2Component } from './historique2/historique2.component';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'addpatient', component: AddPatientComponent},
  {path: 'home', component: HomeComponent},
  {path: 'listpatients',component:ListpatientsComponent},
  {path: 'detailpatient',component:DetailpatientComponent},
  {path: 'signup',component:SignupComponent},
  {path: 'inbox',component:InboxComponent},
  {path: 'rdv',component:RdvComponent},
  {path: 'doctorprofil',component:DoctorprofilComponent},
  {path: 'completedoctor',component:CompleteprofildoctorComponent},
  {path: 'addordonnance',component:AddOrdonnanceComponent},
  {path: 'modifpatient',component:ModifpatientComponent},
  {path: 'modifuser',component:ModifuserComponent},
  {path: 'patientinbox',component:PatientInboxComponent},
  {path: 'schedule',component:ScheduleComponent},
  {path: 'heatmap',component:HeatmapComponent},
  {path: 'historique',component:HistoriqueComponent},
  {path: 'pdf',component:RapportComponent},
  {path: 'rdv2',component:Rdv2Component},
  {path: 'book',component:BookComponent},
  {path: 'historique2',component:Historique2Component},








];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    AddPatientComponent,
    DetailpatientComponent,
    DetailUploadComponent,
    FormUploadComponent,
    ListpatientsComponent,
    SignupComponent,
    InboxComponent,
    RdvComponent,
    DoctorprofilComponent,
    CompleteprofildoctorComponent,
    AddOrdonnanceComponent,
    ModifpatientComponent,
    ModifuserComponent,
    PatientInboxComponent,
    ScheduleComponent,
    HeatmapComponent,
    HistoriqueComponent,
    RapportComponent,
    Rdv2Component,
    BookComponent,
    Historique2Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DatePickerModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FusionChartsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),


  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
