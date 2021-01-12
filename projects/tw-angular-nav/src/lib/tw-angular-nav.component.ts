import { Component, Input, Output, ElementRef, EventEmitter, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { TwAngularNavModel } from './tw-angular-nav.model';
import { TwNavDirections, TwNavLayouts } from './tw-angular-nav.enums';
import { TwAngularNavitemModel } from './tw-angular-navitem/tw-angular-navitem.model';

@Component({
  selector: 'tw-angular-nav',
  templateUrl: './tw-angular-nav.component.html',
  styleUrls: ['./tw-angular-nav.component.scss']
})
export class TwAngularNavComponent implements OnChanges {
  @Output() menuSelect = new EventEmitter<TwAngularNavitemModel>();
  @Output() menuPath = new EventEmitter<TwAngularNavitemModel[]>();
  @Output() menuLoaded = new EventEmitter();
  private _menu: TwAngularNavModel;
  private _minimize: boolean = false;
  private _buttonWidth: string = "150px";
  private _buttonHeight: string = "50px";
  private _selectedMenu: string;
  private _layout: TwNavLayouts;
  private _direction: TwNavDirections;


  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.menu) {
      //this.direction = changes.menu.currentValue.direction;
    }
  }

  ngAfterViewInit() {
    this.determineLayout();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.determineLayout();
  }


  public get layout(): string {
    return this._layout;
  }

  private determineLayout(): void {
    var element = document.querySelector(".tw-nav-desktop") as HTMLElement;
    if (element) {
      this._layout = TwNavLayouts.Desktop;
    } else {
      this._layout = TwNavLayouts.Mobile;
    }
  }


  get direction(): string {
    return this._direction;
  }

  @Input() set direction(value: string) {
    if (value.toLocaleLowerCase() == 'column' || this._layout == TwNavLayouts.Mobile) {
      this._direction = TwNavDirections.Column;
    } else {
      this._direction = TwNavDirections.Row;
    }
  }


  get minimize(): boolean {
    return this._minimize;
  }

  @Input() set minimize(value: boolean) {
    this._minimize = value;
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
    this._buttonHeight = value;
  }


  get menu(): TwAngularNavModel {
    if (!this._menu) {
      this._menu = new TwAngularNavModel();
    }
    return this._menu;
  }

  @Input() set menu(value: TwAngularNavModel) {
    if (value && value.items.length > 0) {
      if (this._menu && this.isIdentical(this._menu.items, value.items)) {
        this.renameCaptions(this._menu.items, value.items);
      }
      else {
        this._menu = value;
        this._menu.items = this._menu ? this.loadMenu(this._menu.items) : [];
        this._selectedMenu = ''
        this.buttonWidth = this._menu.buttonWidth;
        this.buttonHeight = this._menu.buttonHeight;

        // Questionable Code Start - commented out.
        //this._browsingPath = [];
        // Questionable Code End - commented out.
        this.menuLoaded.emit();
      }
    }
  }


  get selectedMenu(): string {
    return this._selectedMenu;
  }
  
  @Input() set selectedMenu(value: string) {
    if (value && this._selectedMenu !== value) {
      this._selectedMenu = value;
    } else if (!value && this._selectedMenu !== value) {
      this._selectedMenu = value;
    }
  }


  onMenuSelect(menuPath: TwAngularNavitemModel[]) {
    let trunk = menuPath[menuPath.length-1];
    let leaf = menuPath[0];

    if (this.direction == TwNavDirections.Row) {
      if (leaf.isSelected && leaf.items.length == 0) {
        for (let menuItem of this._menu.items) {
          if (menuItem.id != trunk.id) {
            menuItem.clearSelected();
          } else {
            setTimeout(() => {
              trunk.close();
            }, 150);
          }
        }
      } else {
        for (let menuItem of this._menu.items) {
          if (menuItem.id != trunk.id) {
            menuItem.close();
          }
        }
      }

    } else if (this.direction == TwNavDirections.Column) {
      if (leaf.isSelected && leaf.items.length == 0) {
        for (let menuItem of this._menu.items) {
          if (menuItem.id != trunk.id) {
            menuItem.clearSelected();
            menuItem.close();
          // } else {
          //   setTimeout(() => {
          //     trunk.close();
          //   }, 150);
          }
        }
      } else {
        for (let menuItem of this._menu.items) {
          if (menuItem.id != trunk.id) {
            menuItem.autoShrink();
          }
        }
      }
    } 
  }


  private loadMenu(source: TwAngularNavitemModel[]): TwAngularNavitemModel[] {
    let result: TwAngularNavitemModel[] = [];

    if (source) {
      for (let sourceItem of source) {
        var destinationItem = new TwAngularNavitemModel();
        destinationItem.id = sourceItem.id;
        destinationItem.caption = sourceItem.caption;
        destinationItem.link = sourceItem.link;
        destinationItem.notification = sourceItem.notification;
        destinationItem.icon = sourceItem.icon;
        destinationItem.image = sourceItem.image;
        destinationItem.fontClass = sourceItem.fontClass; 
        destinationItem.isSelected = (this.selectedMenu === sourceItem.link && sourceItem.link !== "");
        destinationItem.containerHeight = 0;
        destinationItem.transform = '';
        destinationItem.items = this.loadMenu(sourceItem.items);
        result.push(destinationItem);
      }
    }

    return result;
  }


  private renameCaptions(targetItems: TwAngularNavitemModel[], sourceItems: TwAngularNavitemModel[]) {
    for (let i in targetItems) {
      if (targetItems.length === sourceItems.length) {
        targetItems[i].caption = sourceItems[i].caption;
        this.renameCaptions(targetItems[i].items, sourceItems[i].items);
      }
    }
  }


  private isIdentical(sourceItems: TwAngularNavitemModel[], comparisonItems: TwAngularNavitemModel[]): boolean {
    var result = sourceItems.length === comparisonItems.length;

    if (result) {
      for (let i in sourceItems) {
        result = (sourceItems[i].id === comparisonItems[i].id) && (sourceItems[i].link === comparisonItems[i].link);

        if (result) {
          result = this.isIdentical(sourceItems[i].items, comparisonItems[i].items);
        }

        if (result === false) {
          break;
        }
      }
    }

    return result;
  };

}
