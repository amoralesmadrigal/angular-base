import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TabStateService {
  private tabDisabledState = new BehaviorSubject<{ [key: string]: boolean }>({ resultadoIntegral: true, datosContacto: true });
  tabDisabledState$ = this.tabDisabledState.asObservable();

  private selectedIndex = new BehaviorSubject<number>(0);
  selectedIndex$ = this.selectedIndex.asObservable();
  
  private tabParams: Map<string, number> = new Map();

  constructor() { }

  enableTab(tab: string, params?: any) {
    const currentState = this.tabDisabledState.value;
    currentState[tab] = false;
    this.tabDisabledState.next(currentState);
  }

  disableTab(tab: string) {
    const currentState = this.tabDisabledState.value;
    currentState[tab] = true;
    this.tabDisabledState.next(currentState);
  }

  setTabParams(tab: string, params: Map<string, string>): any {
    const currentState = this.tabDisabledState.value;
    currentState[tab] = false;
    this.tabParams[tab] = params;
  }

  getTabParams(tabName: string): any {
    return this.tabParams[tabName];
  }

  changeTab(index: number) {
    this.selectedIndex.next(index);
  }
}
