import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'designToCode';

  // Nav Buttons
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
  isInitial: any = true
  centiesY: any
  centiesX: any
  cursorDirection: any
  mouseDown = 'isUp'
  target: any
  el: any = undefined
  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    //necessary?
    this.el = document.getElementsByClassName('formSquare')[0]
    this.mouseDown = 'isDown'
    this.target = e.target.className
    //------------------------------------------------------------
    this.centiesX = e.clientX - this.el?.style.left.split('px')[0]
    this.centiesY = e.clientY - this.el?.style.top.split('px')[0]
    //create full width when touching the top border
    if (this.target === 'formSquare') {
      this.addBottomRightPoint()
      this.el = document.getElementsByClassName('formSquare')[0]
      let screen = document.getElementsByClassName('screen')[0]
      screen.insertBefore(this.el, screen.firstElementChild);
      this.el.style.boxSizing = 'border-box'
      this.el.style.position = 'absolute'
      this.el.style.top = '-0px'
      this.el.style.left = '0px'
    }
  }

  @HostListener('mousemove', ['$event'])
  mousemove(e: any) {
    if (this.mouseDown === 'isDown') {

    }
    this.el = document.getElementsByClassName('formSquare')[0]
    if (this.mouseDown === 'isDown' && this.target === 'formSquare') {
      this.el.style.top = e.clientY - this.centiesY + 'px'
      this.el.style.left = e.clientX - this.centiesX + 'px'
      // if (this.el.style.top.split('px')[0] < 0 && this.findScrollDirection(e) === 'top') {
      //   this.el.style.top = '0px'
      // }
    }
    else if (this.mouseDown === 'isDown' && this.target === 'formSquare__handler--bottomRight') {
      this.el.style.height = e.clientY - +this.el.style.top.split('px')[0] - 100 + 'px'
      this.el.style.width = e.clientX - +this.el.style.left.split('px')[0] + 'px'
    }
    else if (this.mouseDown === 'isDown' && this.target === 'formSquare__handler--middleBottom') {
      this.el.style.height = e.clientY - 100 + 'px'
    }

    // if (this.mouseDown === 'isDown' && this.el.style.top.split('px')[0] < 20 && this.findScrollDirection(e) === 'top') {
    //   this.removeBottomRightPoint()
    //   this.addMiddleBottomPoint()
    //   this.stickToTop()
    // }
  }
  @HostListener('mouseup', ['$event'])
  mouseup(e: any) {
    //activate Form on first 
    this.mouseDown = 'isUp'
    this.target = undefined
    //if navMenues
    const squareParent = document.getElementsByClassName('navMenues initForms')[0]
    // if (squareParent) {
    //   if (squareParent.getElementsByClassName('formSquare')[0] === undefined) {
    //     const formSquare1 = document.createElement("div");
    //     formSquare1.classList.add('formSquare')
    //     squareParent.insertBefore(formSquare1, squareParent.firstElementChild)
    //   }
    // }
  }

  removeBottomRightPoint() {
    const bottomRight = document.getElementsByClassName("formSquare__handler--bottomRight")[0];
    bottomRight?.remove()
  }
  addBottomRightPoint() {
    const bottomRight = document.createElement("div");
    bottomRight.classList.add('formSquare__handler--bottomRight')
    this.el.insertBefore(bottomRight, this.el.firstElementChild)
  }
  addMiddleBottomPoint() {
    const middleBottom = document.createElement("div");
    middleBottom.classList.add('formSquare__handler--middleBottom')
    this.el.insertBefore(middleBottom, this.el.firstElementChild)
  }
  stickToTop() {
    this.el = document.getElementsByClassName('formSquare')[0]
    this.el.style.left = '0px'
    this.el.style.top = '0px'
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


  //archive
  // ---------find scroll direction ---------------
  // on mousemove
  direction = ""
  oldy = 0
  findScrollDirection(e: any) {

    if (e.pageY < this.oldy) {
      this.direction = 'top';

    } else if (e.pageY > this.oldy) {
      this.direction = 'bottom';
    }

    this.oldy = e.pageY;
    return this.direction
  }
  // -------------------------------------------------------------


}

