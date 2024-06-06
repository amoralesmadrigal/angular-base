import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://demo-production-6c66.up.railway.app/api/contacts/create';
  //private apiUrl = 'http://localhost:8080/api/contacts/create';
  constructor(private http: HttpClient) { }

  createContact(contact: Contact): Observable<void> {
    return this.http.post<void>(this.apiUrl, contact);
  }
}
