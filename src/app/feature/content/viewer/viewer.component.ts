import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class ViewerComponent implements OnInit {
  id = input<string>();
  location = inject(Location); //  from '@angular/common' for back button
  ngOnInit() {
    console.log('ViewerComponent initialized with id:', this.id());
  }

  goBack() {
    this.location.back();
  }
}
