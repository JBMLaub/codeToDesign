import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-nav-button',
    templateUrl: './nav-button.component.html',
    styleUrls: ['./nav-button.component.scss']
})
export class NavButtonComponent {
    title = 'cd';
    @Input() navButton: any
    @Input() isActive: any


    @Input() activeButton = 'activeButton'
    @Output() newItemEvent = new EventEmitter<string>();
    selectedButton(button: string) {
        console.log('to emit', button)
        this.newItemEvent.emit(button)
    }
}
