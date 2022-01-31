import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Wishes } from "./wishes";


@Injectable({ providedIn: 'root' })
export class WishesService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getAllWishes(): Observable<Wishes[]> {
        return this.http.get<Wishes[]>(`${this.apiServerUrl}/api/wishes/all`);
    }

    public addWishes(wishes: Object): Observable<Object> {
        return this.http.post<Object>(`${this.apiServerUrl}/api/wishes/add`, wishes);
    }

    public deleteWishes(id: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/wishes/delete/${id}`);
    }

    public getAllMyWishes(id: number | undefined): Observable<Wishes[]> {
        return this.http.get<Wishes[]>(`${this.apiServerUrl}/api/wishes/all/${id}`); 
    }

}