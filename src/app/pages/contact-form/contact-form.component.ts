import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ThemePalette } from '@angular/material/core';
import { TabStateService } from 'src/app/services/tab-state.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
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
      this.contactService.createContact(this.contactForm.value, this.tabStateService.getTabParams("resultadoIntegral")).subscribe(() => {
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
      }, );
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
