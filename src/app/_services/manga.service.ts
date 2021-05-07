import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  getMangaByTitle(title: string): Observable<Manga[]> {
    return this.http.get<MangaResult>(`${this.baseUrl}/manga?title=${title}`).pipe(map(res => res.results));
  }
  getChapterById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/chapter/${id}`);
  }

  compareChapters(a, b) {
    if (Number(a.data.attributes.chapter) > Number(b.data.attributes.chapter)) return 1;
    if (Number(a.data.attributes.chapter) < Number(b.data.attributes.chapter)) return -1;
    return 0;
  }
}

export interface MangaResult {
  results: Manga[];
}
export interface Manga {
  relationships: { id: string; type: string }[];
  data: {attributes:{title: {en:string}}};
}

export interface LoginResponse {
  result: string;
  token: { session: string; refresh: string };
}
