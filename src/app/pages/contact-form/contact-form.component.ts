import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ThemePalette } from '@angular/material/core';
import { TabStateService } from 'src/app/services/tab-state.service';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css'],
    standalone: true,
    imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatIconModule, MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, MatButtonModule, MatProgressSpinnerModule]
})
export class ContactFormComponent {
  contactForm: FormGroup;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  loading = false;

  constructor(private fb: FormBuilder, private contactService: ContactService, private tabStateService: TabStateService) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      consentimiento: ['', Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      this.contactService.sendEmail(this.contactForm.value, this.tabStateService.getTabParams("resultadoIntegral")).subscribe();
      setTimeout(()=>{
        this.loading = false;
        Swal.fire({
          title: "Información enviada",
          text: "En unos momentos le llegará un correo electrónico con la información",
          icon: "success"
        });
        this.contactForm.untouched
        this.contactForm.reset();
        this.tabStateService.enableTab('calculaPresupuesto', null );
        this.tabStateService.changeTab(0);
      }, 2000);
      
    }
  }

  get firstName(){
    return this.contactForm.get("firstName");
  }

  get lastName(){
    return this.contactForm.get("lastName");
  }

  get email(){
    return this.contactForm.get("email");
  }

  get phoneNumber(){
    return this.contactForm.get("phoneNumber");
  }

  get consentimiento(){
    return this.contactForm.get("consentimiento");
  }
}
