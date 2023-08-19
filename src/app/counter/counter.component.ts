import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  @Input() counterFontsizes: string[] = []
  counterSelection = 12
  counter = 'isClosed'

  // @HostListener('window:click', ['$event'])
  // click(event: KeyboardEvent) {
  //   if ((event.target as Element).className != 'counter__selection' && (event.target as Element).className != 'counter__window') {
  //     console.log((event.target as Element).className)
  //     this.counter = 'isClosed'
  //   }
  // }
  toggleCounter() {
    if (this.counter === 'isClosed') { this.counter = 'isOpen' }
    else {
      this.counter = 'isClosed'
    }
  }

  counterUp() {
    this.counterSelection++
  }
  counterDown() {
    this.counterSelection--
  }

  onSelect(size: any): void {
    this.counterSelection = size
  }
}
