import { makeAutoObservable } from 'mobx';

export class SidebarStore {
  expandedMenuItems: number[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleExpandedMenuItem(index: number) {
    const idx = this.expandedMenuItems.indexOf(index);
    if (idx === -1) {
      this.expandedMenuItems.push(index);
    } else {
      this.expandedMenuItems.splice(idx, 1);
    }
  }
}
