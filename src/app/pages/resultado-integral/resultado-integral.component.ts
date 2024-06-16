import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TabStateService } from 'src/app/services/tab-state.service';

@Component({
  selector: 'app-resultado-integral',
  templateUrl: './resultado-integral.component.html',
  styleUrls: ['./resultado-integral.component.css']
})
export class ResultadoIntegralComponent {

  constructor(private fb: FormBuilder, private tabStateService: TabStateService) {}

  habilitarDatosContactoTab() {
    this.tabStateService.enableTab('datosContacto');
    this.tabStateService.changeTab(2);
  }

}
