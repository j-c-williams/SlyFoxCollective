import { Component, HostListener, OnInit, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('lightboxContent') lightboxContent!: ElementRef;
  
  images: string[] = [];
  loading: boolean = true;
  error: string | null = null;
  lightboxOpen: boolean = false;
  selectedImage: string | null = null;
  currentIndex: number = 0;
  isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

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

  ngAfterViewInit(): void {
  }

  openLightbox(index: number): void {
    this.currentIndex = index;
    this.selectedImage = this.images[index];
    this.lightboxOpen = true;
    
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => this.setupHammerManager(), 100);
    }
  }

  setupHammerManager(): void {
    if (!this.isBrowser || !this.lightboxContent) return;
    
    import('hammerjs').then(Hammer => {
      const hammertime = new Hammer.Manager(this.lightboxContent.nativeElement);
      
      const swipe = new Hammer.Swipe();
      
      hammertime.add(swipe);
      
      hammertime.on('swipeleft', () => {
        this.nextImage();
      });
      
      hammertime.on('swiperight', () => {
        this.prevImage();
      });
    });
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.selectedImage = null;
    
    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.selectedImage = this.images[this.currentIndex];
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.selectedImage = this.images[this.currentIndex];
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    
    switch(event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
    }
  }
}