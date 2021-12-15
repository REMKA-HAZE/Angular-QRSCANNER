import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../model/appointment.model';
import { OperationResponse } from '../model/response.model';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl: string = environment.apiUrl + 'log/appointment';

  constructor(private http: HttpClient) {
  }

  public logAppointment(appointment: Appointment): Observable<OperationResponse> {
    return this.http.post<OperationResponse>(this.baseUrl, appointment);
  }

}