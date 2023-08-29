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
  active: any = {
    name: undefined,
    node: undefined,
    landed: false
  }
  squaresCounter: any = 1
  centiesY: any
  centiesX: any
  cursorDirection: any
  mouseDown = 'isUp'
  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    //necessary?
    this.mouseDown = 'isDown'
    this.active.node = document.getElementsByClassName('formSquare 0')[0]
    this.active.name = e.target.className
    //------------------------------------------------------------
    this.centiesX = e.clientX - this.active.node?.style.left.split('px')[0]
    this.centiesY = e.clientY - this.active.node?.style.top.split('px')[0]
    //create full width when touching the top border
    if (this.active.name === 'formSquare 0' && !this.active.landed) {
      this.addBottomRightPoint()
      this.active.node = document.getElementsByClassName('formSquare 0')[0]
      let screen = document.getElementsByClassName('screen')[0]
      screen.insertBefore(this.active.node, screen.firstElementChild);
      this.active.node.style.boxSizing = 'border-box'
      this.active.node.style.position = 'absolute'
      this.active.node.style.top = '0px'
      this.active.landed = true
    }
  }

  @HostListener('mousemove', ['$event'])
  mousemove(e: any) {
    if (this.mouseDown === 'isDown') {

      this.active.node = document.getElementsByClassName('formSquare 0')[0]
      if (this.active.name === 'formSquare 0') {
        this.active.node.style.top = e.clientY - this.centiesY + 'px'
        this.active.node.style.left = e.clientX - this.centiesX + 'px'
        if (this.active.node.style.top.split('px')[0] < 0) {
          this.active.node.style.top = '0px'
        }
      }
      else if (this.active.name === 'formSquare__handler--bottomRight') {
        this.active.node.style.height = e.clientY - +this.active.node.style.top.split('px')[0] - 100 + 'px'
        this.active.node.style.width = e.clientX - +this.active.node.style.left.split('px')[0] + 'px'
      }
      else if (this.active.name === 'formSquare__handler--middleBottom') {
        this.active.node.style.height = e.clientY - 100 + 'px'
      }

      if (this.active.node.style.top.split('px')[0] < 20 && this.findScrollDirection(e) === 'top') {
        this.removeBottomRightPoint()
        this.addMiddleBottomPoint()
        this.stickToTop()
      }
    }
  }
  @HostListener('mouseup', ['$event'])
  mouseup(e: any) {
    //activate Form on first 
    this.mouseDown = 'isUp'
    this.active.name = undefined
    //if navMenues
    const squareParent = document.getElementsByClassName('navMenues initForms')[0]
    if (squareParent) {
      if (squareParent.getElementsByClassName('formSquare ' + (this.squaresCounter - 1))[0] === undefined) {
        const formSquare1 = document.createElement("div");
        formSquare1.classList.add('formSquare')
        formSquare1.classList.add(this.squaresCounter)
        squareParent.insertBefore(formSquare1, squareParent.firstElementChild)
        this.squaresCounter++
      }
    }
  }

  removeBottomRightPoint() {
    const bottomRight = document.getElementsByClassName("formSquare__handler--bottomRight")[0];
    bottomRight?.remove()
  }
  addBottomRightPoint() {
    const bottomRight = document.createElement("div");
    bottomRight.classList.add('formSquare__handler--bottomRight')
    this.active.node.insertBefore(bottomRight, this.active.node.firstElementChild)
  }
  addMiddleBottomPoint() {
    const middleBottom = document.createElement("div");
    middleBottom.classList.add('formSquare__handler--middleBottom')
    this.active.node.insertBefore(middleBottom, this.active.node.firstElementChild)
  }
  stickToTop() {
    this.active.node = document.getElementsByClassName('formSquare 0')[0]
    this.active.node.style.left = '0px'
    this.active.node.style.top = '0px'
    this.active.node.style.width = '100%'
  }

  colour: any
  myInput() {
    this.active.node.style.backgroundColor = this.colour
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

