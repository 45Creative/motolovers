import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ms-toolbar-i18n-button',
  templateUrl: './toolbar-i18n-button.component.html',
  styleUrls: ['./toolbar-i18n-button.component.scss']
})
export class ToolbarI18nButtonComponent implements OnInit, OnDestroy {

  isOpen: boolean;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
  }

}
