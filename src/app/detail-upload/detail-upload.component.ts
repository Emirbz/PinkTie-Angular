import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-upload',
  templateUrl: './detail-upload.component.html',
  styleUrls: ['./detail-upload.component.css']
})
export class DetailUploadComponent implements OnInit {
  @Input() fileUpload: string;
  constructor() { }

  ngOnInit() {
  }

}
