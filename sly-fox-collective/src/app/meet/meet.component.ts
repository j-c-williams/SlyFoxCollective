import { Component, OnInit, OnDestroy, HostListener, inject, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Import register module function
import { register } from 'swiper/element/bundle';

interface TeamMember {
  name: string;
  earsImage: string;
  headshot: string;
}

@Component({
  selector: 'app-meet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line to support custom elements
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css'],
  animations: [
    trigger('wheelRotate', [
      state('current', style({ transform: 'translateX(0)', opacity: 1 })),
      state('next', style({ transform: 'translateX(-100%)', opacity: 0 })),
      state('incoming', style({ transform: 'translateX(100%)', opacity: 0 })),
      transition('current => next', [animate('0.5s ease-in-out')]),
      transition('incoming => current', [animate('0.5s ease-in-out')]),
    ]),
    trigger('iconFade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class MeetComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  public isMobile: boolean = false;

  public teamMembers: TeamMember[] = [
    { name: 'Angi', earsImage: 'assets/images/angi_ears_overlay.png', headshot: 'assets/images/angi_headshot.jpg' },
    { name: 'Leah', earsImage: 'assets/images/leah_ears_overlay.png', headshot: 'assets/images/leah_headshot.jpg' },
    { name: 'Holly', earsImage: 'assets/images/holly_ears_overlay.png', headshot: 'assets/images/holly_headshot.jpg' },
  ];

  public currentText: string = this.teamMembers[0].name;
  public nextText: string = this.teamMembers[1].name;
  public animationState: 'current' | 'next' | 'incoming' = 'current';
  private currentIndex: number = 0;
  private intervalId: any;

  constructor() {
    this.checkScreenSize();
    // Register Swiper custom elements
    register();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTextCycling();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public isIconActive(index: number): boolean {
    return this.getCurrentMemberIndex(this.currentText) === index;
  }

  private getCurrentMemberIndex(name: string): number {
    return this.teamMembers.findIndex((member) => member.name === name);
  }

  private startTextCycling(): void {
    this.intervalId = setInterval(() => {
      this.animationState = 'next';

      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.teamMembers.length;
        const nextIndex = (this.currentIndex + 1) % this.teamMembers.length;

        this.currentText = this.teamMembers[this.currentIndex].name;
        this.nextText = this.teamMembers[nextIndex].name;

        this.animationState = 'incoming';

        setTimeout(() => {
          this.animationState = 'current';
        }, 50);
      }, 500);
    }, 3000);
  }

  @HostListener('window:resize')
  private checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
}