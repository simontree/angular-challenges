import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { params });
  }

  post<T>(
    endpoint: string,
    data: any,
    options?: { headers?: HttpHeaders },
  ): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, options);
  }

  put<T>(
    endpoint: string,
    data: any,
    options?: { headers?: HttpHeaders },
  ): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, options);
  }

  delete<T>(
    endpoint: string,
    options?: { headers?: HttpHeaders },
  ): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, options);
  }
}
