export class TwAngularNavitemModel {
  id: string;
  caption: string;
  link: string;
  notification: string;
  icon: string;
  image: string;
  fontClass: string;
  isSelected: boolean;
  containerHeight: number;
  items: TwAngularNavitemModel[];
  transform: string;
  minimize: boolean;
  
  constructor() {
    this.caption = '';
    this.link = '';
    this.notification = '';
    this.icon = '';
    this.image = '';
    this.isSelected = false;
    this.containerHeight = 0;
    this.items = [];
    this.transform = '';
    this.minimize = false;
  }

  public hasNode(targetNode: TwAngularNavitemModel):boolean {
    var nodeFound = false;

    if (!nodeFound) {
      for (let menuItem of this.items) {
        nodeFound = menuItem.id == targetNode.id || menuItem.hasNode(targetNode);

        if (nodeFound) {
          return true;
        }
      }  
    }
    return nodeFound;
  }  

  public hasSelected():boolean {
    var hasSelected = this.isSelected;

    if (!hasSelected) {
      for (let menuItem of this.items) {
        hasSelected = menuItem.isSelected;
        hasSelected = menuItem.isSelected || menuItem.hasSelected();

        if (hasSelected) {
          return true;
        }
      }  
    }
    return hasSelected;
  }


  public autoShrink():void {
    this.resetContainerHeights(false);
  }

  public resetContainerHeights(forceClosure: boolean = true):void {
    if (!this.hasSelected() || forceClosure) {
      for (let menuItem of this.items) {
        menuItem.resetContainerHeights();
      }
      this.containerHeight = 0;
    }
  }

  public close():void {
    this.resetContainerHeights();
    //this._navigationPath = [];
  }

  public clearSelected():void {
    let x = false;
    if (this.isSelected) {
      x = true;
      console.log("Old Selected: " + this.caption + ", Value: " + this.isSelected);
    }
    this.isSelected = false;
    if (x) {
      x = false;
      console.log("Old Selected: " + this.caption + ", Value: " + this.isSelected);
    }
    for (let menuItem of this.items) {
      menuItem.clearSelected();
    }
  }

}
