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
  //forms
  //on mouse down move to0 screen and stay with negative psotion values
  addSquare() {
    //what does it mean though
    //numbers.splice(2, 0, 'three');2 equals into position 3
    //insert equally into DOM
    this.active.name = Math.random().toFixed(7)
    this.active.node = document.createElement("div");
    this.active.node.classList.add(this.active.name)
    let screen = document.getElementsByClassName('screen')[0]
    screen.insertBefore(this.active.node, screen.firstElementChild)
    this.addBottomRightPoint()
    // this.active.node.style.boxSizing = 'border-box'
    this.active.node.style.position = 'absolute'
    this.active.node.style.width = "100px"
    this.active.node.style.height = "100px"
    this.active.node.style.border = "1px solid black"
    //not necessary
  }
  //
  //--------------------------------------------
  // edit
  //boder radius
  makeFullWidth() {
    this.active.node.style.width = '100%'
  }
  colour: any
  myInput() {
    this.active.node.style.backgroundColor = this.colour
  }
  //paddding,  margin
  //--------------------------------------
  // typing
  littleFormSelection = 'Times New Roman'
  selectedFontFamily(family: any) {
    this.littleFormSelection = family
  }
  littleFormFonts = ['Sans Serif', 'Montserrat', 'Arial Narrow', "Courier New"]
  //make counter work
  //highlight hover-fix broken
  counterWindow = ['5', '8', '10', '11', '12', '13', '14', '15', '16']
  //make color work
  color = 'orange'
  colours = []
  //----------------------------------------

  //Edit extern
  //
  // positioning - space between, space around, center hor, center vert, center 1-9
  //  parent display flex,space between,space around, justifyContent center, alignItems center
  // addins - googl maps with locactions and comments
  // user - name, e-mail, password

  //Fixed - Menu, edit - resolve all positions, jump into screen
  //Dynamic - rightBottom, middleBottom, dotted border v2, highlight collction, measure sticks - what sticks,
  //  adjust to top, build groups, show vert and hor alignment of child
  //Numbers - place into children, remove from old position

  //screen
  active: any = {
    name: undefined,
    node: undefined,
    style: undefined,
    children: []
  }
  numbersArray: any = []
  dynamic: any = {
    name: undefined
  }
  centiesY: any
  centiesX: any
  mouseDown = 'isUp'
  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    this.mouseDown = 'isDown'
    //get active elment
    if (typeof (e.target.className) === 'number' && e.clientY > 120) {
      this.active.name = e.target.className
      this.active.node = document.getElementsByClassName(e.target.className)[0]
    } else {
      //not necessarily
      this.dynamic.name = e.target.className
    }
    //active item
    //numbersArray[4].children.push()
    //parntelement.insertBefore(newElement, numbersArray[4].children[2])
    //numbers.splice(2, 0, 'three');2 equals into position 3
    //hoverOver: get hoivered id, find id, insert object into its children, delete last position or do nothing if from menu
    //compare top with clientY and left with clientX
    this.centiesX = e.clientX - +this.active.node?.style.left.split('px')[0]
    this.centiesY = e.clientY - +this.active.node?.style.top.split('px')[0]
  }
  @HostListener('mousemove', ['$event'])
  mousemove(e: any) {
    if (this.mouseDown === 'isDown') {
      if (typeof (this.active.name) === 'number') {
        //tell Listener what is dragstart currently
        this.active.node.style.top = e.clientY - this.centiesY + 'px'
        this.active.node.style.left = e.clientX - this.centiesX + 'px'
        if (+this.active.node.style.top.split('px')[0] < 0) {
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
    //this.active.name = undefined
    const squareParent = document.getElementsByClassName('navExtension initForms')[0]
    if (squareParent?.getElementsByClassName('formSquare') === undefined) {
      const newSquare = document.createElement("div");
      newSquare.classList.add(Math.random().toFixed(7))
      squareParent.insertBefore(newSquare, squareParent.firstElementChild)
    }
    //resolve all fixed positions

    //this.fixedResolve
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


