import { Component, OnInit } from '@angular/core';
import { TabStateService } from '../services/tab-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  isResultadoIntegralDisabled = true;
  isDatosContactoDisabled = true;
  isCalculaPresupuestoDisabled = true;
  selectedIndex = 0;

  constructor(private tabStateService: TabStateService){
    
  }

  ngOnInit() {
    this.tabStateService.tabDisabledState$.subscribe(state => {
      this.isResultadoIntegralDisabled = state['resultadoIntegral'];
      this.isDatosContactoDisabled = state['datosContacto'];
      this.isCalculaPresupuestoDisabled = state['calculaPresupuesto'];
    });

    this.tabStateService.selectedIndex$.subscribe(index => {
      this.selectedIndex = index;
    });
  }
}
