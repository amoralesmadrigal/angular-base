import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ThemePalette } from '@angular/material/core';

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

  constructor(private fb: FormBuilder, private contactService: ContactService) {
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
      this.contactService.createContact(this.contactForm.value).subscribe(() => {
        alert('Contact information sent successfully');
        this.contactForm.reset();
      });
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
