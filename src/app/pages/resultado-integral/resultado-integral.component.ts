import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TabStateService } from 'src/app/services/tab-state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-resultado-integral',
    templateUrl: './resultado-integral.component.html',
    styleUrls: ['./resultado-integral.component.css'],
    standalone: true,
    imports: [MatCardModule, MatIconModule, MatFormFieldModule, MatListModule, MatButtonModule]
})
export class ResultadoIntegralComponent {
  
  constructor(private fb: FormBuilder, private tabStateService: TabStateService) {
    
  }
  
  habilitarDatosContactoTab() {
    this.tabStateService.enableTab('datosContacto');
    this.tabStateService.changeTab(2);
  }

  getTabParams(tabName: string, key: string): any {
    const param = this.tabStateService.getTabParams(tabName);
    if(param === undefined){
      return null;
    }else{
      return param.get(key);
    }
  }

}
