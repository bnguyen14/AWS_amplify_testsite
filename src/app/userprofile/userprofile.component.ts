import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  @Input() firstName : string;
  @Input() lastName : string;
  @Input() SSN : string;
  constructor() { }

  ngOnInit(): void {
  }

}
