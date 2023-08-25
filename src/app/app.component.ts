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
  //All shit
  // edit
  centiesY: any
  centiesX: any

  mouseDown = 'isUp'
  formOnSite = false
  target: any
  el: any = undefined
  startLeft: any = undefined
  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    //necessary?
    this.el = document.getElementsByClassName('formSquare')[0]
    this.mouseDown = 'isDown'
    this.target = e.target.className
    //------------------------------------------------------------
    this.centiesX = e.clientX - this.el?.style.left.split('px')[0]
    this.centiesY = e.clientY - this.el?.style.top.split('px')[0]

    if (this.formOnSite === false && e.target.className === 'formSquare') {
      this.el = document.getElementsByClassName('formSquare')[0]
      let screen = document.getElementsByClassName('screen')[0]
      screen.insertBefore(this.el, screen.firstElementChild);

      this.el.style.boxSizing = 'border-box'
      this.el.style.position = 'absolute'
      this.el.style.top = 60 + 'px'
      this.el.style.left = 20 + 'px'
      // this.el.style.width = 100 + 'px'
      // this.el.style.height = 100 + 'px'
      this.addResizePoint()
      console.log(this.el.style.top.split('px')[0])
      if (this.el.style.top.split('px')[0] > 120) {
        this.formOnSite = true
      }
    }
  }


  @HostListener('mousemove', ['$event'])
  mousemove(e: any) {
    if (this.mouseDown === 'isDown' && this.target === 'formSquare') {
      this.el.style.top = e.clientY - this.centiesY + 'px'
      this.el.style.left = e.clientX - this.centiesX + 'px'

    }
    else if (this.mouseDown === 'isDown' && this.target === 'formSquare__handler--bottomRight') {
      this.el.style.height = e.clientY - this.el.style.top.split('px')[0] + 'px'
      this.el.style.width = e.clientX - this.el.style.left.split('px')[0] + 'px'
    }
    if (this.formOnSite) {
      this.makeFullWidth()
      console.log('hi from mousemove as awake')
    }
  }
  @HostListener('mouseup', ['$event'])
  mouseup(e: any) {
    //activate Form on first 
    if ('isGrabingForm') {
      this.mouseDown = 'isUp'
      this.target = undefined
    }
  }


  addResizePoint() {
    const bottomRight = document.createElement("div");
    bottomRight.classList.add('formSquare__handler--bottomRight')
    this.el.insertBefore(bottomRight, this.el.firstElementChild)
  }

  makeFullWidth() {
    this.el.style.left = '0px'
    this.el.style.width = '100%'
  }

  colour: any
  myInput() {
    this.el.style.backgroundColor = this.colour
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


  //playground





}

