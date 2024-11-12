import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  // Toggle mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const menuToggle = document.querySelector('.menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (menuToggle && navButtons) {
      // Check if click was outside menu and toggle button
      if (!menuToggle.contains(event.target as Node) && 
          !navButtons.contains(event.target as Node)) {
        this.isMenuOpen = false;
      }
    }
  }

  // Optional: Hide header on scroll down, show on scroll up
  lastScrollTop = 0;
  isHeaderVisible = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > this.lastScrollTop) {
      // Scrolling down
      this.isHeaderVisible = false;
    } else {
      // Scrolling up
      this.isHeaderVisible = true;
    }
    
    this.lastScrollTop = currentScroll;
  }
}