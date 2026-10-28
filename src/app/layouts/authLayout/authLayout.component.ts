import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-authLayout',
  templateUrl: './authLayout.component.html',
  styleUrls: ['./authLayout.component.css'],
  imports: [RouterOutlet, RouterLinkWithHref, RouterLink, RouterLinkActive],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
