import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'designToCode';

  // topBttons
  isActive = 'Typing'
  navButtons = ["Forms", "Edit", "Typing", "Positioning", "Add Ins", "User"]
  selectedButton(button: any) {
    this.isActive = button
  }
  //-------------------------------------------


  // forms
  el: any = undefined
  handlers: any = undefined
  dragState = 'not dragging'
  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    if (e.target.className === 'formSquare' && this.dragState === 'not dragging') {
      this.el = document.getElementsByClassName('formSquare')[0]
      let screen = document.getElementsByClassName('screen')[0]
      screen.insertBefore(this.el, screen.firstElementChild);
      this.el.style.boxSizing = 'border-box'
      this.el.style.position = 'absolute'
      this.dragState = 'is dragging'
      this.el.style.top = e.clientY + 'px'
      this.el.style.left = e.clientX + 'px'
      this.activateForm()
    } else if (this.dragState === 'is dragging') {
      this.dragState = 'not dragging'
    }
    if (e.target.className === 'formSquare__handler--topLeft') {
      this.changeSize = 'isResizing'
    }
  }
  @HostListener('mousemove', ['$event'])
  mousemove(e: any) {
    if (this.el?.style.top.split('px')[0] < 110) { return }
    if (this.dragState === 'is dragging') {
      this.el.style.top = e.clientY + 'px'
      this.el.style.left = e.clientX + 'px'
    }
    if (this.changeSize === 'isResizing') {
      this.el.style.left = e.clientX + 'px'
      this.el.style.width = this.el.style.width.split('px')[0] + e.clientX + 'px'
    }
  }
  changeSize: any
  activeShape: any
  handlersAdded: any = 'notAdded'
  activateForm() {
    if (this.handlersAdded === 'notAdded') {
      this.el = document.getElementsByClassName('formSquare')[0]
      const topLeft = document.createElement("div");
      topLeft.classList.add('formSquare__handler--topLeft')
      const bottomRight = document.createElement("div");
      bottomRight.classList.add('formSquare__handler--bottomRight')
      this.el.insertBefore(topLeft, this.el.firstElementChild)
      this.el.insertBefore(bottomRight, this.el.firstElementChild)
      this.handlersAdded = 'areAdded'

    }
  }
  //--------------------------------------------

  // edit
  makeFullWidth() {
    this.el.style.left = '0px'
    this.el.style.width = '100%'
  }

  shapeColour = 'orange'
  shapeColours = []
  cpEdit: any
  changeBackgroundColour() {
    this.el = document.getElementsByClassName('formSquare')[0]
    this.el.style.backgroundColor = this.shapeColour
    this.cpEdit = document.getElementsByClassName('formSquare')[0]
    this.cpEdit.addEventListener('click', function () { console.log('cpEdit') })
    this.el.addEventListener('input')
  }
  resizeSquare() {
    this.el = document.getElementsByClassName('formSquare')[0]
      + this.el.style.left.split('px')[0]
    this.el.style.width = +this.el.style.width.split('px')[0] + +this.el.style.left.split('px')[0]
  }
  //--------------------------------------

  // typing
  littleFormSelection = 'Times New Roman'
  littleFormWindow = 'Sans Serif'
  littleFormFonts = ['Sans Serif', 'Montserrat', 'Arial Narrow', "Courier New"]

  counterWindow = ['5', '8', '10', '11', '12', '13', '14', '15', '16']

  color = 'orange'
  colours = []
  //----------------------------------------

  // positioning
  // addins
  // user



}

