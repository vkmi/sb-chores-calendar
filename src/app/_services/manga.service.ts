import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/auth/login`,
      {
        username: username,
        password: password,
      },
      { headers: {} }
    );
  }
  getMangaByTitle(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/manga?title=${title}`);
  }
}

export interface LoginResponse {
  result: string;
  token: { session: string; refresh: string };
}
