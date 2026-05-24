import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})

// Clase para ver mis datos de contacto
export class Footer {
  
  // Datos de contacto
  protected readonly numTelefono: String = '+34 640 870 770';
  protected readonly email: String = 'srperez04122004@gmail.com';
  protected readonly github: String = 'https://github.com/Chuwi12';
  protected readonly linkedin: String = 'https://www.linkedin.com/in/sergio-rodr%C3%ADguez-p%C3%A9rez-a57240392/?locale=en_US';

  // Variable para traquear si esta copiado en el portapapeles
  protected isCopied = false;

  // Función para que cuando se clicke sobre el número de télefono se copie en el portapapeles
  copyNum() {
    navigator.clipboard.writeText(this.numTelefono.toString()).then ( () => {

      // Ponemos la variable en tru, para lanzar un aviso
      this.isCopied = true;
      
      // Esperamos unos segundo y la volvemos a poner en fals
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    })
  }
}


