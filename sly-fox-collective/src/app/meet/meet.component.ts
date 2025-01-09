import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface TeamMember {
  name: string;
  earsImage: string; 
}

@Component({
  selector: 'app-meet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css'],
  animations: [
    trigger('wheelRotate', [
      state('current', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('next', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      state('incoming', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('current => next', [
        animate('0.5s ease-in-out')
      ]),
      transition('incoming => current', [
        animate('0.5s ease-in-out')
      ])
    ]),
    trigger('iconFade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('0.5s ease-in-out'))
    ])
  ]
})
export class MeetComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  public teamMembers: TeamMember[] = [
    { 
      name: 'Angi',
      earsImage: '../../assets/images/angi_ears_overlay.png'
    },
    { 
      name: 'Leah',
      earsImage: '../../assets/images/leah_ears_overlay.png'
    },
    { 
      name: 'Holly',
      earsImage: '../../assets/images/holly_ears_overlay.png'
    }
  ];
  
  public currentText: string = this.teamMembers[0].name;
  public nextText: string = this.teamMembers[1].name;
  public animationState: 'current' | 'next' | 'incoming' = 'current';
  private currentIndex: number = 0;
  private intervalId: any;

  public getCurrentMemberIndex(name: string): number {
    return this.teamMembers.findIndex(member => member.name === name);
  }

  public isIconActive(index: number): boolean {
    return this.getCurrentMemberIndex(this.currentText) === index;
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

  private startTextCycling(): void {
    this.currentText = this.teamMembers[0].name;
    
    this.intervalId = setInterval(() => {
      // Start exit animation
      this.animationState = 'next';
      
      setTimeout(() => {
        // Update indices
        this.currentIndex = (this.currentIndex + 1) % this.teamMembers.length;
        const nextIndex = (this.currentIndex + 1) % this.teamMembers.length;
        
        // Prepare next text
        this.currentText = this.teamMembers[this.currentIndex].name;
        this.nextText = this.teamMembers[nextIndex].name;
        
        // Set up incoming state
        this.animationState = 'incoming';
        
        // Trigger entrance animation
        setTimeout(() => {
          this.animationState = 'current';
        }, 50);
      }, 500);
    }, 3000);
  }
}