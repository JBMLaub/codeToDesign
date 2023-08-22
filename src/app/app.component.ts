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
  //--------------------------------------------

  // edit
  mouseDown = 'isUp'
  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    this.mouseDown = 'isDown'
    //if-state too long
    if (e.target.className === 'formSquare' && e.target.style.top.split('px')[0] < 120) {
      //still a mess
      this.initializeShape(e)
    }
  }
  @HostListener('mousemove', ['$event'])
  mousemove(e: any) {
    if (this.mouseDown === 'isDown') {
      //still a mess
      this.el.style.left = e.clientX + 'px'
      this.el.style.top = e.clientY + 'px'
      console.log(e.clientY)
    }
    //not sure where to use you
    // if (this.el?.style.top.split('px')[0] < 120) { return }
  }
  @HostListener('mouseup', ['$event'])
  mouseup(e: any) {
    //activate Form on first 
    this.mouseDown = 'isUp'
  }
  el: any = undefined
  resizeSquare() {
    //still no clue on how to do that
    this.el.style.width = +this.el.style.left.split('px')[0] + 'px'
    console.log(this.el.style.left)
  }
  initializeShape(e: any) {
    //insert form into screenDOM
    this.el = document.getElementsByClassName('formSquare')[0]
    let screen = document.getElementsByClassName('screen')[0]
    screen.insertBefore(this.el, screen.firstElementChild);
    //update CSS on formShape
    this.el.style.boxSizing = 'border-box'
    this.el.style.position = 'absolute'
    this.el.style.top = 60 + 'px'
    this.el.style.left = 20 + 'px'
  }
  activateShape() {
    //insert resize points
    this.el = document.getElementsByClassName('formSquare')[0]
    const topLeft = document.createElement("div");
    topLeft.classList.add('formSquare__handler--topLeft')
    const bottomRight = document.createElement("div");
    bottomRight.classList.add('formSquare__handler--bottomRight')
    this.el.insertBefore(topLeft, this.el.firstElementChild)
    this.el.insertBefore(bottomRight, this.el.firstElementChild)
  }
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
    this.cpEdit.addEventListener('click', function () {
      // console.log('cpEdit') 
    })
    this.el.addEventListener('input')
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

