import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user";



@Injectable({ providedIn: 'root' })
export class RegistrationService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }
    
    public getUser(): Observable<User[]>{
        return this.http.get<User[]>(`${this.apiServerUrl}/api/user/all`);
    }

    public addUser(user: User): Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/api/user/add`, user);
    }

    public updateUser(user: User): Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/api/user/update`, user);
    }

    public deleteUser(id: number | undefined): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/api/user/delete/${id}`);
    }
}