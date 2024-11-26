import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import {environment} from '@envs/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = `${environment.API_URL}/api/contacts/create`;
  
  constructor(private http: HttpClient) { }

  createContact(contact: Contact, tabParams: Map<string, string>): Observable<void> {
    const plainObject = {
      ...contact,
      messages: Object.fromEntries(tabParams),
    };
    return this.http.post<void>(this.apiUrl, plainObject, {
      headers: {
        'Content-Type': 'application/json',
      }});
  }
}
