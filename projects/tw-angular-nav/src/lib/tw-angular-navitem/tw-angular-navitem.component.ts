import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TwAngularNavitemModel } from './tw-angular-navitem.model';
import { Guid } from "guid-typescript";

@Component({
  selector: 'tw-angular-navitem',
  templateUrl: './tw-angular-navitem.component.html',
  styleUrls: ['../tw-angular-nav.component.scss']
})
export class TwAngularNavitemComponent {
  @Output() menuSelect = new EventEmitter<object>();
  private _menu: TwAngularNavitemModel;
  private _minimize: boolean = false;
  private _buttonWidth: string;
  private _buttonHeight: string;
  private _isRoot: boolean = true;
  private _navigationPath: TwAngularNavitemModel[] = [];
  private _selectedPath: TwAngularNavitemModel[] = [];

  constructor() {}


  get minimize(): boolean {
    return this._minimize;
  }

  @Input() set minimize(value: boolean) {
    this._minimize = false;
  }


  get buttonWidth(): string {
    return this._minimize ? this._buttonHeight : this._buttonWidth;
  }

  @Input() set buttonWidth(value: string) {
    this._buttonWidth = value;
  }

  
  get buttonHeight(): string {
    return this._buttonHeight;
  }

  @Input() set buttonHeight(value: string) {
    if (value && this._buttonHeight != value) {
      this._buttonHeight = value;
      this.loadCssVars();
    }
  }


  get menu(): TwAngularNavitemModel {
    return this._menu;
  }

  @Input() set menu(value: TwAngularNavitemModel) {
    value.containerHeight = 0;
    value.id = Guid.create().toString();
    this._menu = value;
    this.loadCssVars();
  }


  get isRoot(): boolean {
    var tmp = this.menu.caption;
    return this._isRoot;
  }

  @Input() set isRoot(value: boolean) {
    this._isRoot = value;
  }


  hasSelected(): boolean {
    return this.menu[0].isSelected;
  }

  
  private loadCssVars():void {
    if (this._isRoot && this._buttonWidth && this._buttonHeight) {
      var tmp = this.menu.caption;
      var cssVarDefs = "";
      cssVarDefs += `--tw-nav-buttonWidth: ${this._buttonWidth};`;
      cssVarDefs += `--tw-nav-buttonHeight: ${this._buttonHeight};`;
      var element = document.querySelector("tw-angular-nav") as HTMLElement;
      element.style.cssText = cssVarDefs;
    }
  }

  getTitleCaption(): string {
    return this._minimize ? '' : this.menu.caption;
  }

  getExpanderIcon(item: TwAngularNavitemModel): string {
    return item.items.length > 0 ? 'keyboard_arrow_down' : '';
  }

  graphicType(item: TwAngularNavitemModel): string {
    if (item.icon) {
      return 'icon';
    } else if (item.image) {
      return 'image';
    } else if (item.fontClass) {
      return 'font'
    } else {
      return undefined;
    }
  }

  showMiniExpander(item: TwAngularNavitemModel): boolean {
    return (item.items.length > 0 && this._minimize)
  }

  hasChildren(item: TwAngularNavitemModel): boolean {
    return item.items.length > 0;
  }

  isExpanded(item: TwAngularNavitemModel): boolean {
    return item.containerHeight > 0;
  }

  isLeaf(menu):boolean {
    return menu.link && menu.link != ''
  }

  onMenuSelect(menus: TwAngularNavitemModel[]=null) {
    menus.push(this.menu);

    if (this.isRoot && menus.length > 0) {
      var isTogglingRoot = menus.length == 1 && menus[0].containerHeight > 0;

      if (isTogglingRoot) {
        menus[0].resetContainerHeights();
      } else {
        if (this._selectedPath.length > 0 && !this._selectedPath[0].isSelected) {
          this._selectedPath = [];
          this._navigationPath = [];
        }

        var oldNavigatedTarget: TwAngularNavitemModel = <TwAngularNavitemModel> {
          id: this._navigationPath.length == 0 ? null : this._navigationPath[0].id,
          caption: this._navigationPath.length == 0 ? null : this._navigationPath[0].caption,
          containerHeight: this._navigationPath.length == 0 ? null : this._navigationPath[0].containerHeight
        };

        var oldSelectedTarget: TwAngularNavitemModel = <TwAngularNavitemModel> {
          id: this._selectedPath.length == 0 ? null : this._selectedPath[0].id,
          caption: this._selectedPath.length == 0 ? null : this._selectedPath[0].caption,
          containerHeight: this._selectedPath.length == 0 ? null : this._selectedPath[0].containerHeight
        };

        this._navigationPath = menus;
        if (this.isLeaf(this._navigationPath[0])) {
          if (this._selectedPath.length > 0) {
            this._selectedPath[0].isSelected = false;
          }
          this._selectedPath = this._navigationPath;
        }

        this.menu.resetContainerHeights();
        this.calcPathHeight(this._selectedPath, oldSelectedTarget);
        this.calcPathHeight(this._navigationPath, oldNavigatedTarget);
      }
    }

    this.menuSelect.emit(menus);
  }

  calcPathHeight(targetPath: TwAngularNavitemModel[], oldTarget: TwAngularNavitemModel=null):number {
    var totalHeight = 0;

    if (targetPath.length > 0) {
      targetPath[0].isSelected = this.isLeaf(targetPath[0]);
      var targetPathContainsSelectedNode = this._selectedPath.length > 0 && (targetPath[0].hasNode(this._selectedPath[0]));
      var already_calculated = targetPath[0].containerHeight > 0 || targetPathContainsSelectedNode;
      
      if (!already_calculated) {
        let i = 0;
        for (let menu of targetPath) {
          let isToggle = oldTarget!= null && menu.id == oldTarget.id;
          let collapsible = isToggle && oldTarget!= null && oldTarget.containerHeight > 0;
          menu.containerHeight = 0;
          if (i > 0 || !collapsible) {
            let menuContainsPreviousNode = oldTarget!= null && menu.hasNode(oldTarget); 
            if (!menuContainsPreviousNode || targetPathContainsSelectedNode || i > 0) {
              for (let menuItem of menu.items) {
                menu.containerHeight += menuItem.containerHeight;
              }
              menu.containerHeight += parseInt(this.buttonHeight, 10) * menu.items.length;  
            }
          }
          i++;
        }
        totalHeight = targetPath[targetPath.length-1].containerHeight;
      }
    }
    return totalHeight;
  }

  isHorizontal(): boolean {
    return true; //this.orientation.toLowerCase() == "horizontal";
  }

  showHorizontalCaret(): boolean {
    return this.isHorizontal() && this.isRoot && this._selectedPath.length > 0 && this._selectedPath[0].isSelected && this._selectedPath[this._selectedPath.length - 1].containerHeight <= 0;
  }

  isVertical(): boolean {
    return false; //this.orientation.toLowerCase() == "vertical";
  }

  showVerticalCaret(): boolean {
    if (this.isHorizontal()) {
      return this.menu.isSelected && !this.isRoot;
    } else {
      return this.menu.isSelected;
    }
  }

}