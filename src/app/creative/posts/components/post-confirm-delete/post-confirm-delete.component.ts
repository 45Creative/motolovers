import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../../route.animation";

@Component({
  selector: 'ms-post-confirm-delete',
  templateUrl: './post-confirm-delete.component.html',
  styleUrls: ['./post-confirm-delete.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class PostConfirmDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
