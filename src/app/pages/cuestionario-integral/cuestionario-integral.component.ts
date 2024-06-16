import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EstadoVivienda } from 'src/app/models/estado-vivienda.model';
import { TipoReforma } from 'src/app/models/tipo-reforma.model';
import { Vivienda } from 'src/app/models/vivienda.model';
import { TabStateService } from 'src/app/services/tab-state.service';

@Component({
  selector: 'app-cuestionario-integral',
  templateUrl: './cuestionario-integral.component.html',
  styleUrls: ['./cuestionario-integral.component.css']
})
export class CuestionarioIntegralComponent implements OnInit{
  cuestionarioForm: FormGroup;
  viviendaControl: FormControl;
  calidadControl: FormControl;
  estadoReformaControl: FormControl;
  valorMetrosCuadrados: number = 1;
  valorHabitaciones: number = 1;
  valorWc: number = 1;
  viviendaList: Vivienda[] =[];
  estadoReformaList: TipoReforma[] =[];
  calidadList: EstadoVivienda[] =[];

  constructor(private fb: FormBuilder, private tabStateService: TabStateService) {
    this.cuestionarioForm = this.fb.group({
      mConstruidos: []
    });
  }

  ngOnInit(): void {
    this.viviendaList = [
      { id: 0,  descripcion: 'Piso' },
      { id: 1,  descripcion: 'Casa' },
    ];

    this.estadoReformaList = [
      { id: 0,  descripcion: 'Para reformar' },
      { id: 1,  descripcion: 'Buen estado' },
    ];

    this.calidadList = [
      { id: 0,  descripcion: 'Básica' },
      { id: 1,  descripcion: 'Media' },
      { id: 2,  descripcion: 'Alta' },
    ];


    this.viviendaControl = new FormControl(this.viviendaList[0].id);
    this.calidadControl = new FormControl(this.calidadList[0].id);
    this.estadoReformaControl = new FormControl(this.estadoReformaList[0].id);
  }

  onSliderChangeMetrosCuadrados(event: any) {
    console.log('Slider value:', event.value);
    this.valorMetrosCuadrados = event.value;
  }


  onSliderChangeHabitaciones(event: any) {
    console.log('Slider value:', event.value);
    this.valorHabitaciones = event.value;
  }

  onSliderChangeWc(event: any) {
    console.log('Slider value:', event.value);
    this.valorWc = event.value;
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  habilitarResultadoIntegralTab() {
    this.tabStateService.enableTab('resultadoIntegral');
    this.tabStateService.changeTab(1);
  }


}
