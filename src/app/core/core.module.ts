import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavItemComponent } from './sidenav/sidenav-item/sidenav-item.component';
import { IconSidenavDirective } from './sidenav/icon-sidenav.directive';
import { SearchComponent } from './toolbar/search/search.component';
import { BreadcrumbsComponent } from './breadcrumb/breadcrumb.component';
import { AdminComponent } from './admin/admin.component';
import { QuickpanelComponent } from './quickpanel/quickpanel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarUserButtonComponent } from './toolbar/toolbar-user-button/toolbar-user-button.component';
import { ToolbarI18nButtonComponent } from './toolbar/toolbar-i18n-button/toolbar-i18n-button.component';
import { ClickOutsideDirective } from './utils/click-outside.directive';
import { SearchBarComponent } from './toolbar/search-bar/search-bar.component';
import { ToolbarNotificationsComponent } from './toolbar/toolbar-notifications/toolbar-notifications.component';
import { SidenavService } from './sidenav/sidenav.service';
import { MediaReplayService } from './sidenav/mediareplay/media-replay.service';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { MaterialComponentsModule } from '../material-components.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    AuthModule.forRoot(),
    PerfectScrollbarModule.forChild()
  ],
  declarations: [
    SidenavComponent,
    SidenavItemComponent,
    IconSidenavDirective,
    SearchComponent,
    BreadcrumbsComponent,
    AdminComponent,
    QuickpanelComponent,
    ToolbarComponent,
    ToolbarUserButtonComponent,
    ToolbarI18nButtonComponent,
    ClickOutsideDirective,
    SearchBarComponent,
    ToolbarNotificationsComponent
  ],
  providers: [
    SidenavService,
    MediaReplayService,
    BreadcrumbService
  ],
  exports: [
    ToolbarUserButtonComponent
  ]
})
export class CoreModule { }
