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
  //click
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
  //--------------------------------------
  // typing
  //make this selection  work
  //is selction working? what is selected and how
  //seems to be bottom to top 
  littleFormSelection = 'Times New Roman'
  littleFormWindow = 'Sans Serif'
  //make this selecion work
  //what is selected and how
  //hilight hover
  littleFormFonts = ['Sans Serif', 'Montserrat', 'Arial Narrow', "Courier New"]
  //make counter work
  //highlight hover
  counterWindow = ['5', '8', '10', '11', '12', '13', '14', '15', '16']
  //make color work
  color = 'orange'
  colours = []
  //----------------------------------------

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
    //more research
    //parntelement.insertBefore(newElement, numbersArray[4].children[2])
    //numbers.splice(2, 0, 'three');2 equals into position 3
    //hoverOver: get hoivered id, find id, insert object into its children, delete last position or do nothing if from menu
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
  }

  //  place number in shadow dom
  //  getTravelRoute 000
  //  this.numbersArray[0].children[0].children[0]
  //  findNumberInDOM()
  //  startCounter
  //  let start = this.numbersArray
  //  let back
  //  first = false
  //  digDeeper(name){
  //              nA[0].children[0].children[0]
  //              startCounter.push(0,0,0)
  //    if(this.numbersArray && !first) {
  //      start = start[0]
  //      first = true
  //     }
  //    if(start.children[0]) {
  //      start = start.children[0]
  //      if(start.name === name ) return
  //      this.digDeeper(name)
  //    } else {
  //    back = this.numbersArray[0].children[0].children
  //      if(back[1]){
  //        if(start.name === name) return
  //       }
  //    } 
  //  }
  //  this.numbersArray = [
  //   this.active = {
  //     name: undefined,
  //     node: undefined,
  //     style: undefined,
  //     children: [
  //       this.active = {
  //         name: undefined,
  //         node: undefined,
  //         style: undefined,
  //         children: [
  //           this.active = {
  //             name: undefined,
  //             node: undefined,
  //             style: undefined,
  //             children: []
  //           }
  //         ]
  //       },
  //       this.active = {
  //         name: undefined,
  //         node: undefined,
  //         style: undefined,
  //         children: [
  //           this.active = {
  //             name: undefined,
  //             node: undefined,
  //             style: undefined,
  //             children: []
  //           }
  //         ]
  //       },
  //       this.active = {
  //         name: undefined,
  //         node: undefined,
  //         style: undefined,
  //         children: [
  //           this.active = {
  //             name: undefined,
  //             node: undefined,
  //             style: undefined,
  //             children: []
  //           }
  //         ]
  //       },
  //       this.active = {
  //         name: undefined,
  //         node: undefined,
  //         style: undefined,
  //         children: [
  //           this.active = {
  //             name: undefined,
  //             node: undefined,
  //             style: undefined,
  //             children: []
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   this.active = {
  //     name: undefined,
  //     node: undefined,
  //     style: undefined,
  //     children: []
  //   }
  // ]
  //  this.numbersArray[0].name if(this.numbersArray[0][0])this.numbersArray[0][0]
  //  if(this.numbersArray[0])
  //loop complete numbersArray for matching className - brute force
  //numbersArray[0].children[0] if undefined go back and down
  //  if nothing go back and down etc.
  // }

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
    this.active.node = document.getElementsByClassName(this.active.name)[0]
    //numbers.splice(2, 0, 'three');2 equals into position 3
    this.numbersArray[0].children.splice(2, 0, this.active)
    //insert equally into DOM
    this.addBottomRightPoint()
    let screen = document.getElementsByClassName('screen')[0]
    screen.insertBefore(this.active.node, screen.firstElementChild);
    // this.active.node.style.boxSizing = 'border-box'
    this.active.node.style.position = 'absolute'
    //not necessary
  }
}


