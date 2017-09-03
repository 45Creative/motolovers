import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../../route.animation';

@Component({
  selector: 'ms-comment-confirm-delete',
  templateUrl: './comment-confirm-delete.component.html',
  styleUrls: ['./comment-confirm-delete.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class CommentConfirmDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
