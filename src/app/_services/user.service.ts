import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { environment } from 'src/environments/environment';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  public getUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/api/user/all`);
}

public addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/api/user/add`, user);
}

public updateUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/api/user/update`, user);
}

public deleteUser(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/user/delete/${id}`);
}

}