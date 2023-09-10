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
    //add negative values for flluent add into screen
    //numbers.splice(2, 0, 'three');2 equals into position 3
    //insert equally into DOM

    // this.active.node.style.boxSizing = 'border-box'
    //not necessary
    //this.active.name = undefined

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
  //paddding,  margin, border, width, height, color - and edit colour?
  //--------------------------------------
  // typing
  //seems to be bottom to top 
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


  //leave big working areas by starting branches

  //screen
  active: any = {
    name: undefined,
    node: undefined,
    style: undefined,
    children: []
  }
  shadowDOM: any = []
  dynamic: any = {
    name: undefined
  }
  centiesY: any
  centiesX: any
  mouseDown = 'isUp'
  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    this.mouseDown = 'isDown'
    //bring item to page
    if (typeof (e.target.className) === 'number' && e.clientY > 120) {
      this.active.name = e.target.className
      this.active.node = document.getElementsByClassName(e.target.className)[0]
    } else {
      //not necessarily
      this.dynamic.name = e.target.className
    }
    //active item
    //shadowDOM[4].children.push()
    //more research
    //parntelement.insertBefore(newElement, shadowDOM[4].children[2])
    //numbers.splice(2, 0, 'three');at index2 0 elements added replaced with 'three' 
    //hoverOver: get hoivered className, find className, insert object into its children, delete last position or do nothing if from menu
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
    //resolve all fixed positions

    //place number in shadow dom
    // getTravelRoute 000
    // this.numbersArray[0][0][0] = this.active

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
  initiateSquare() {
    this.active.name = Math.random().toFixed(7)
    const square = document.createElement("div");
    square.classList.add(this.active.name)
    let screen = document.getElementsByClassName('screen')[0]
    screen.insertBefore(square, screen.firstElementChild);
    this.active.node = document.getElementsByClassName(this.active.name)[0]
    //insert equally into DOM?
    this.addBottomRightPoint()

    this.active.node.style.width = "50px"
    this.active.node.style.height = "50px"
    this.active.node.style.position = 'absolute'
    this.active.node.style.border = '1px solid black'
    this.active.node.style.boxSizing = 'border-box'
    //place object diectly into shadowDOM
  }
}


