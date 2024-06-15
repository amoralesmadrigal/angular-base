import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cuestionario-integral',
  templateUrl: './cuestionario-integral.component.html',
  styleUrls: ['./cuestionario-integral.component.css']
})
export class CuestionarioIntegralComponent {
  cuestionarioForm: FormGroup;
  valorMetrosCuadrados: number = 1;
  valorHabitaciones: number = 1;
  valorWc: number = 1;

  constructor(private fb: FormBuilder) {
    this.cuestionarioForm = this.fb.group({
      mConstruidos: []
    });
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


}
