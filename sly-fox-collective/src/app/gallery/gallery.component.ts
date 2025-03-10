import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class GalleryComponent implements OnInit {
  images: string[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<string[]>('assets/image-list.json').subscribe({
      next: (data) => {
        this.images = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading image list:', err);
        this.error = 'Failed to load images. Please try again later.';
        this.loading = false;
      }
    });
  }
}