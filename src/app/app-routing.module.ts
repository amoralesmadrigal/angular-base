import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';

const routes: Routes = [
  { path: 'contact', component: ContactFormComponent },
  { path: '', redirectTo: '/contact', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
