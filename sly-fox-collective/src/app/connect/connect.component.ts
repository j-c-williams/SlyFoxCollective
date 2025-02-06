import { Component } from '@angular/core';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {


  copyEmail() {
    const email = "hello@slyfoxcollective.com";
    navigator.clipboard.writeText(email).then(() => {
      alert("Email address copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy email: ", err);
    });
  }
}
