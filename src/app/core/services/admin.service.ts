import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
    private api = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Départements
    getDepartements(): Observable<any[]> {
        return this.http.get<any[]>(`${this.api}/departments`);
    }

    createDepartement(data: any): Observable<any> {
        return this.http.post(`${this.api}/departments`, data);
    }

    updateDepartement(id: number, data: any): Observable<any> {
        return this.http.put(`${this.api}/departments/${id}`, data);
    }

    deleteDepartement(id: number): Observable<any> {
        return this.http.delete(`${this.api}/departments/${id}`);
    }

    // Processus
    getProcessus(): Observable<any[]> {
        return this.http.get<any[]>(`${this.api}/processes`);
    }

    createProcessus(data: any): Observable<any> {
        return this.http.post(`${this.api}/processes`, data);
    }

    deleteProcessus(id: number): Observable<any> {
        return this.http.delete(`${this.api}/processes/${id}`);
    }

    // Utilisateurs
    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.api}/users`);
    }

    createUser(data: any): Observable<any> {
        return this.http.post(`${this.api}/users`, data);
    }

    updateUser(id: number, data: any): Observable<any> {
        return this.http.put(`${this.api}/users/${id}`, data);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.api}/users/${id}`);
    }
}