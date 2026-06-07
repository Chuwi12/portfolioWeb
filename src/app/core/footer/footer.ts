import { Component } from '@angular/core';
import { I18NextModule } from 'angular-i18next';

@Component({
  selector: 'app-footer',
  imports: [I18NextModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})

// Class to view my contact data
export class Footer {
  
  // Contact data
  protected readonly numTelefono: String = '+34 640 870 770';
  protected readonly email: String = 'srperez04122004@gmail.com';
  protected readonly github: String = 'https://github.com/Chuwi12';
  protected readonly linkedin: String = 'https://es.linkedin.com/in/sergio-rodr%C3%ADguez-p%C3%A9rez-a57240392';
  protected readonly currentYear: number = new Date().getFullYear();

  // Variable to track if it is copied to the clipboard
  protected isCopied = false;

  // Function to copy the phone number to the clipboard when clicked
  copyNum() {
    navigator.clipboard.writeText(this.numTelefono.toString()).then ( () => {

      // Set the variable to true to trigger a notification
      this.isCopied = true;
      
      // Wait a few seconds and set it back to false
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    })
  }
}


