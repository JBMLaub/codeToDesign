import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-little-form',
    templateUrl: './little-form.component.html',
    styleUrls: ['./little-form.component.scss']
})
export class LittleFormComponent {
    @Input() littleFormSelection = ''
    @Input() littleFormWindow = ''
    windowState = 'closed'
    @Input() littleFormFonts: string[] = []

}