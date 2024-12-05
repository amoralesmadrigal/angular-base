import { Component, OnInit } from '@angular/core';
import { TabStateService } from '../services/tab-state.service';
import { ContactFormComponent } from '../pages/contact-form/contact-form.component';
import { ResultadoIntegralComponent } from '../pages/resultado-integral/resultado-integral.component';
import { CuestionarioIntegralComponent } from '../pages/cuestionario-integral/cuestionario-integral.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [MatToolbarModule, FlexModule, MatTabsModule, MatIconModule, CuestionarioIntegralComponent, ResultadoIntegralComponent, ContactFormComponent, TranslatePipe, TranslateModule]
})
export class HeaderComponent  implements OnInit{
  isResultadoIntegralDisabled = true;
  isDatosContactoDisabled = true;
  isCalculaPresupuestoDisabled = true;
  selectedIndex = 0;
  currentLang: string = '';

  constructor(private tabStateService: TabStateService, private translate: TranslateService){
    this.currentLang = this.translate.currentLang;
    console.log(this.currentLang);
    console.log(this.translate.instant('TITLE_TAB_1'));
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
