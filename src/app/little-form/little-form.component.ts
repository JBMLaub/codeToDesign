import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-little-form',
    templateUrl: './little-form.component.html',
    styleUrls: ['./little-form.component.scss']
})
export class LittleFormComponent {
    @Input() littleFormSelection = ''
    windowState = 'closed'
    @Input() littleFormFonts: string[] = []

    @Output() newItemEvent = new EventEmitter<string>();
    returnSelection(button: any) {
        this.newItemEvent.emit(button)
    }
}