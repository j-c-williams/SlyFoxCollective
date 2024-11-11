import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  private textArray: string[] = [
    'events',
    'corporate gifts',
    'recognition'
  ];
  
  currentText: string = this.textArray[0];
  isVisible: boolean = true;
  private currentIndex: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    // Only start animation if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.startTextCycling();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startTextCycling(): void {
    // Set initial state
    this.currentText = this.textArray[0];
    this.isVisible = true;
    
    // Start the interval
    this.intervalId = setInterval(() => {
      this.isVisible = false;
      
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.textArray.length;
        this.currentText = this.textArray[this.currentIndex];
        this.isVisible = true;
      }, 500);
    }, 3000);
  }
}