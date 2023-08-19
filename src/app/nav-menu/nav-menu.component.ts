import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  littleFormName = 'Schriftart'
  littleFormWindow = 'Sans Serif'
  //Typing
  littleFormFonts = ['Sans Serif', 'Montserrat', 'Arial Narrow']
  // littleFormFonts = ["12px", "13px", "14px", "15px", "16px", "17px", "18px", "19px"]

}
