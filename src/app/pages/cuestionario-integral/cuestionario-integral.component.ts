import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboSiNoId } from 'src/app/enums/combosinoId.enum';
import { ComboSiNoDes } from 'src/app/enums/combosinoDes.enum';
import { ComboBox } from 'src/app/models/comboBox.model';
import { EstadoVivienda } from 'src/app/models/estado-vivienda.model';
import { TipoReforma } from 'src/app/models/tipo-reforma.model';
import { Vivienda } from 'src/app/models/vivienda.model';
import { TabStateService } from 'src/app/services/tab-state.service';
import { CalidadId } from 'src/app/enums/calidadId.enum';
import { CalidadDes } from 'src/app/enums/calidadDes.enum';
import { TipoReformaId } from 'src/app/enums/tipoReformaId.enum';
import { TipoReformaDes } from 'src/app/enums/tipoReformaDes.enum';
import { ViviendaId } from 'src/app/enums/viviendaId.enum';
import { ViviendaDes } from 'src/app/enums/viviendaDes.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
    selector: 'app-cuestionario-integral',
    templateUrl: './cuestionario-integral.component.html',
    styleUrls: ['./cuestionario-integral.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FlexModule, MatCardModule, MatIconModule, MatFormFieldModule, MatSliderModule, MatSelectModule, NgFor, MatOptionModule, MatButtonModule]
})
export class CuestionarioIntegralComponent implements OnInit{
  cuestionarioForm: FormGroup;
  viviendaControl = new FormControl;
  calidadControl= new  FormControl;
  estadoReformaControl = new FormControl;
  cocinaControl = new FormControl();
  salonControl = new FormControl();
  valorMetrosCuadrados = new FormControl(1);
  valorHabitaciones = new FormControl(1);
  valorWc = new FormControl(1);
  viviendaList: Vivienda[] =[];
  tipoReformaList: TipoReforma[] =[];
  calidadList: EstadoVivienda[] =[];
  cocinaList: ComboBox[] =[];
  salonList: ComboBox[] =[];
  message: { [key: string]: any } = {};

  itemsBase = 5;
  aumentoLujoIntegral = 300;
  aumentoLujoParcial = 200;

  aumentoBasicoIntegral = 200;
  aumentoBasicoParcial = 100;

  baseBasicoIntegral = 1500.00
  baseBasicoParcial = 1000.00

  baseLujoIntegral = 2000.00
  baseLujoParcial = 1500.00
  
  total = 0.0;

  constructor(private fb: FormBuilder, private tabStateService: TabStateService) {
    this.cuestionarioForm = this.fb.group({
      mConstruidos: [],
      valorMetrosCuadrados: this.valorMetrosCuadrados,
      valorHabitaciones: this.valorHabitaciones,
      valorWc: this.valorWc,
      cocinaControl: this.cocinaControl,
      salonControl: this.salonControl,
      viviendaControl: this.viviendaControl,
      calidadControl: this.calidadControl,
      estadoReformaControl: this.estadoReformaControl
    });
  }

  ngOnInit(): void {
    this.viviendaList = [
      { id: ViviendaId.PISO,  descripcion: ViviendaDes.PISO },
      { id: ViviendaId.CASA,  descripcion: ViviendaDes.CASA },
      { id: ViviendaId.LOCAL,  descripcion: ViviendaDes.LOCAL }
    ];

    this.tipoReformaList = [
      { id: TipoReformaId.PARCIAL,  descripcion: TipoReformaDes.PARCIAL },
      { id: TipoReformaId.INTEGRAL,  descripcion: TipoReformaDes.INTEGRAL }
    ];

    this.calidadList = [
      { id: CalidadId.BASICA,  descripcion: CalidadDes.BASICA },
      { id: CalidadId.LUJO,  descripcion: CalidadDes.LUJO }
    ];
    
    this.cocinaList =[
      { id: ComboSiNoId.SI,  descripcion: ComboSiNoDes.SI },
      { id: ComboSiNoId.NO,  descripcion: ComboSiNoDes.NO }
    ];
    
    this.salonList = [
      { id: ComboSiNoId.SI,  descripcion: ComboSiNoDes.SI },
      { id: ComboSiNoId.NO,  descripcion: ComboSiNoDes.NO }
    ];

    this.viviendaControl.setValue(this.viviendaList[0].id);
    this.calidadControl.setValue(this.calidadList[0].id);
    this.estadoReformaControl.setValue(this.tipoReformaList[0].id);
    this.cocinaControl.setValue(this.cocinaList[0].id);
    this.salonControl.setValue(this.salonList[0].id);

    this.cuestionarioForm.valueChanges.subscribe((nuevoValor) => {
     this.habilitarResultadoIntegralTab(false);
    });
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  habilitarResultadoIntegralTab(changeTab: boolean) {
    this.calcularTotal();
    let viviendaDes = this.viviendaList[this.viviendaControl.value] as Vivienda;
    let param : Map<string, string> = new Map();
    param.set('metros', this.valorMetrosCuadrados.value.toString());
    param.set('wc', this.valorWc.value.toString());
    param.set('habitacion', this.valorHabitaciones.value.toString());
    param.set('cocina', (this.cocinaControl.value == ComboSiNoId.SI ? ComboSiNoDes.SI : ComboSiNoDes.NO ));
    param.set('salon', (this.salonControl.value == ComboSiNoId.SI ? ComboSiNoDes.SI : ComboSiNoDes.NO ));
    param.set('vivienda', viviendaDes.descripcion );
    param.set('calidad', (this.calidadControl.value == CalidadId.BASICA ? CalidadDes.BASICA : CalidadDes.LUJO ));
    param.set('reforma',  (this.estadoReformaControl.value == TipoReformaId.PARCIAL ? TipoReformaDes.PARCIAL : TipoReformaDes.INTEGRAL));
    param.set('total', this.total.toString());
    this.tabStateService.setTabParams('resultadoIntegral', param);

    if(changeTab){
      this.tabStateService.enableTab('resultadoIntegral', param );
      this.tabStateService.changeTab(1);
    }
  }
  
  nextStep(){
    
  }

  calcularTotal(){
    switch(this.calidadControl.value){
      case CalidadId.BASICA:
        switch(this.estadoReformaControl.value){
          case TipoReformaId.PARCIAL: {
            this.total = this.calcular(this.baseBasicoParcial, this.aumentoBasicoParcial);
            break;
          }
          case TipoReformaId.INTEGRAL: {
            this.total = this.calcular(this.baseBasicoIntegral, this.aumentoBasicoIntegral);
            break;
          }
          default:
            console.log('ID no válido.');
        }
        break;
      case CalidadId.LUJO:
        switch(this.estadoReformaControl.value){
          case TipoReformaId.PARCIAL: {
            this.total = this.calcular(this.baseLujoParcial, this.aumentoLujoParcial);
            break;
          }
          case TipoReformaId.INTEGRAL: {
            this.total = this.calcular(this.baseLujoIntegral, this.aumentoLujoIntegral);
            break;
          }
          default:
            console.log('ID no válido.');
        }
        break;
      
      default:
        console.log('ID no válido.');
    }
  
  }

  private calcular(base: number, aumento: number) : number{
    let total = 0;
    const items = this.valorWc.value + this.valorHabitaciones.value + (this.salonControl.value == ComboSiNoId.SI ? 1 : 0 ) + (this.cocinaControl.value == ComboSiNoId.SI ? 1 : 0 );
    if(items == this.itemsBase){
      return base;
    }else if(items < this.itemsBase){
      const diferenciaItems = (this.itemsBase - items) * aumento;
      total = base - diferenciaItems;
    }else if(items > this.itemsBase){
      const diferenciaItems = (items - this.itemsBase) * aumento;
      total = base + diferenciaItems;
    }
    return total;
  }


}
