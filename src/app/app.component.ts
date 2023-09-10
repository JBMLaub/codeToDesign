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

  //
  // activeObject, hoveredObject, realDOM, activeShadowObject, hoveredShadowObject, shadowDOM
  //
  //
  // let numbers
  // shadowDOM[0].children[0].children[0].children[0]---undefined
  // numbers = shadowDOM[0].children[0].children[0].children[0]
  //  if(numbers.name === className){
  //    this.active.name = className
  //    this.active.node = document.getElementsByClassName(className)[0]
  //  }
  // shadowDOM[0].children[1].children[0].children[0].children[0]---undefined
  // new line
  // shadowDOM[0].children[1].children[1].children[0].children[0].children[0]---undefined7
  // new line
  // shadowDOM[0].children[2].children[0].children[0]---undefined
  //
  //
  // What is it for?
  //  building realDOM
  //  thats it?
  //
  //  Routes = [
  //(x) 0   1   2   3   4   5
  // 0|[0---0---0---0---undefined]
  // 1|[0---0---0---1---undefined]
  // 2|[0---0---1---undefined]
  // 3|[0---1---0---0---0---undefined]
  // 4|[0---1---1---undefined]
  // 5|[0---2---0---0---undefined]
  // 6|[0---2---0---1---undefined]
  // 7|[0---2---1---undefined]
  //(y) ]
  //
  //
  //  routes[x,y]
  //
  //
  //  for(let y = 0;y < routes.length;y++){
  //    for(let x = 0;x < routes[y].length;x++){
  //      routes[y][x]
  //      recurse(name, y, x)
  //    }
  //  }
  //
  //  moving with children - puh
  //  let activeObject
  //  let shadowDOM
  //  let activeShadowObject
  //  let first = true
  //  recurse(name, x, y)
  //   if(first === true){
  //      activeShadowObject = shadowDOM[0]
  //      if(activeShadowObject.name === name) {
  //        reposition activeShadowObject --> get route of activeObject
  //        position activeShadowObject accordingly
  //        get node
  //        check for all styles should not come to it - (test for  undefined or === '')
  //        compare children
  //      }
  //      first = false
  //   }
  //   if(activeShadowObject.name === name){
  //      adapt activeShadowObject to activeObject
  //        get node
  //        check for all styles - collect if === '' (alt test for null, undefined)
  //        compare children
  //      return route
  //   }else if(activeShadowObject){
  //      activeShadowObject = activeShadowObject.children[i]
  //   }
  //   if(activeShadowObject === undefined){
  //      first = true
  //      return false
  //   }
  //
  //  //  check for all styles(){}
  //  node.style => {0: 'min-width', 1: 'top', 2: 'position', 3: 'text-align', 4: 'display', 5: 'left',
  //  let keysArray = Object.keys(node.style) => ['0', '1', '2', '3', '4','accentColor']
  //  keysArray[0] => '0'
  //  let i = 0
  //  while(typeof(+keysArray[i]) === 'number'){
  //    node.style[node.style[+keysArray[i]]] = node.style[node.style[i]]
  //    i++
  //  }
  //
  //  this.shadowDOM =[
  //   { name: undefined,
  //     style: undefined,
  //     children:[{},{},{}]
  //   }
  //  ]
  //
  //  loop complete shadowDOM for matching className - brute force
  //  build map first
  //  shadowDOM[0].children[0] if undefined go to next line
  //  build routes
  //  }

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


