import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerStatusServiceService {

  private apiUrl = `${environment.API_URL}/api/contacts`;

  constructor(private http: HttpClient) {}

  getStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Realiza la petición GET al backend
  }
}
