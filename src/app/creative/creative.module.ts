import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { environment } from "../../environments/environment";
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
import { CalendarModule } from 'angular-calendar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialComponentsModule } from '../material-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { StoreModule } from '@ngrx/store';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';

import { WidgetComponent } from '../core/widgets/widgets-v1/widget-v1/widget-v1.component';
import { LineChartWidgetComponent } from '../core/widgets/widgets-v1/line-chart-widget/line-chart-widget.component';
import { SourceOverviewWidgetComponent } from '../core/widgets/widgets-v1/source-overview-widget/source-overview-widget.component';
import { nvD3 } from '../core/charts/nvD3/nvD3.component';
import { BarChartComponent } from '../core/widgets/bar-chart/bar-chart.component';
import { LineChartComponent } from '../core/widgets/line-chart/line-chart.component';
import { RecentSalesComponent } from '../core/widgets/recent-sales/recent-sales.component';
import { PieChartComponent } from '../core/widgets/pie-chart/pie-chart.component';
import { GoogleMapsWidgetComponent } from '../core/widgets/google-maps-widget/google-maps-widget.component';
import { ActivityComponent } from '../core/widgets/activity/activity.component';
import { TrafficSourcesComponent } from '../core/widgets/traffic-sources/traffic-sources.component';
import { LoadingOverlayComponent } from '../core/loading-overlay/loading-overlay.component';
import { D3ChartService } from '../core/charts/nvD3/nvD3.service';
import { HighlightModule } from '../core/highlightjs/highlight.module';
import { AuthModule } from '../core/auth/auth.module';
import { CreativeRoutingModule } from './creative-routing.module';

import { reducers } from './reducers';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApi
    }),
    StoreModule.forFeature('creative', reducers),
    QuillModule,
    HighlightModule,
    SortablejsModule,
    CalendarModule.forRoot(),
    PerfectScrollbarModule.forChild(),
    AuthModule,
    CreativeRoutingModule
  ],
  entryComponents: [
  ],
  declarations: [

    //Creative Components
    DashboardComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,

    //Core Components
    WidgetComponent,
    LineChartWidgetComponent,
    SourceOverviewWidgetComponent,
    nvD3,
    BarChartComponent,
    LineChartComponent,
    RecentSalesComponent,
    PieChartComponent,
    GoogleMapsWidgetComponent,
    ActivityComponent,
    TrafficSourcesComponent,
    LoadingOverlayComponent,

  ],
  providers: [
    D3ChartService
  ]
})
export class CreativeModule { }
