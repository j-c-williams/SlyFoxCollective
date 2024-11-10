import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // If using routerLink
import { CommonModule } from '@angular/common'; // If using *ngFor or other common directives

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, // Add this line for standalone components
  imports: [
    RouterModule, // Add if using routerLink
    CommonModule  // Add if using common directives
  ]
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  
  // Navigation items can be defined as an array for easier management
  navItems = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Optional: method to check active route
  isActive(path: string): boolean {
    return this.router.url === path;
  }
}