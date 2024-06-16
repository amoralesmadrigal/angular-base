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


  constructor() { }

  enableTab(tab: string) {
    const currentState = this.tabDisabledState.value;
    currentState[tab] = false;
    this.tabDisabledState.next(currentState);
  }

  disableTab(tab: string) {
    const currentState = this.tabDisabledState.value;
    currentState[tab] = true;
    this.tabDisabledState.next(currentState);
  }

  changeTab(index: number) {
    this.selectedIndex.next(index);
  }
}
