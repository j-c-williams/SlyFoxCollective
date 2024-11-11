import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ServicesComponent } from './services/services.component';
import { MeetComponent } from './meet/meet.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ConnectComponent } from './connect/connect.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'meet', component: MeetComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'connect', component: ConnectComponent }
];
