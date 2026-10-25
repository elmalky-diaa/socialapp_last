import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-mainLayout',
  templateUrl: './mainLayout.component.html',
  styleUrls: ['./mainLayout.component.css'],
  imports: [RouterOutlet, NavbarComponent],
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
