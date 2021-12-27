import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Equipment } from './equipment';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class EquipmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiServerUrl}/api/equipment/all`);
  }

  public addEquipment(equipment : Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.apiServerUrl}/api/equipment/add`, equipment);
  }

  public updateEquipment(equipment : Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiServerUrl}/api/equipment/update`, equipment);
  }

  public deleteEquipment(id : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/equipment/delete/${id}`);
  }


}
