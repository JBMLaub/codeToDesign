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
  // edit
  makeFullWidth() {
    this.active.node.style.width = '100%'
  }
  colour: any
  myInput() {
    this.active.node.style.backgroundColor = this.colour
  }
  //--------------------------------------
  // typing
  //make this selection  work
  littleFormSelection = 'Times New Roman'
  littleFormWindow = 'Sans Serif'
  //make this selecion work
  littleFormFonts = ['Sans Serif', 'Montserrat', 'Arial Narrow', "Courier New"]
  //make counter work
  counterWindow = ['5', '8', '10', '11', '12', '13', '14', '15', '16']
  //make color work
  color = 'orange'
  colours = []
  //----------------------------------------

  // positioning - space between, space around, center hor, center vert, center 1-9
  // addins - googl maps with locactions
  // user - name, e-mail.password

  //Fixed  - Menu, edit
  //Dynamic - rightBottom, middleBottom, dotted border, measure sticks, adjust to top, 
  //Numbers - numbersArray: name, node, landed, style,children, 

  //screen
  active: any = {
    name: undefined,
    node: undefined,
    landed: false
  }
  numbersArray: any = []
  dynamic: any = {
    name: undefined
  }
  squaresCounter: any = 1
  centiesY: any
  centiesX: any
  cursorDirection: any
  mouseDown = 'isUp'
  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    //Numbers
    this.mouseDown = 'isDown'
    if (this.fixedNames(e.target.className) != 'fixedName') {
      this.active.name = e.target.className + ' ' + Math.random().toFixed(7)
      this.active.node = document.getElementsByClassName(this.active.name)[0]
      this.numbersArray.push(this.active)
    } else if (e.target.className === 'formSquare__handler--bottomRight') {
      this.dynamic.name = 'formSquare__handler--bottomRight'
    } else if (e.target.className === 'formSquare__handler--middleBottom') {
      this.dynamic.name = 'formSquare__handler--middleBottom'
    }

    this.centiesX = e.clientX - this.active.node?.style.left.split('px')[0]
    this.centiesY = e.clientY - this.active.node?.style.top.split('px')[0]
    if (this.fixedNames(e.target.className) != 'fixedName' && !this.active.landed) {
      this.addBottomRightPoint()
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

      if (this.active.name === 'formSquare 0') {
        this.active.node.style.top = e.clientY - this.centiesY + 'px'
        this.active.node.style.left = e.clientX - this.centiesX + 'px'
        if (this.active.node.style.top.split('px')[0] < 0) {
          this.active.node.style.top = '0px'
        }
      }
      else if (this.dynamic.name === 'formSquare__handler--bottomRight') {
        this.active.node.style.height = e.clientY - +this.active.node.style.top.split('px')[0] - 100 + 'px'
        this.active.node.style.width = e.clientX - +this.active.node.style.left.split('px')[0] + 'px'
      }
      else if (this.dynamic.name === 'formSquare__handler--middleBottom') {
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

  fixedNames(fixedName: any) {
    let fixedNames = ['formSquare__handler--bottomRight', 'formSquare__handler--middleBottom',
      'nav__button']
    for (let index = 0; index < fixedNames.length; index++) {
      const element = fixedNames[index];
      if (element === fixedName) {
        fixedName = 'fixedName'
      }
    }
    return fixedName
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
    this.active.node.style.left = '0px'
    this.active.node.style.top = '0px'
    this.active.node.style.width = '100%'
  }

}


