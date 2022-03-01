import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './model/user';
import { map } from 'rxjs/operators';
import { Message } from './model/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: 'authkey',
      userid: '1',
    }),
  };

  baseUrl = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<Object> {
    return this.httpClient.post<User>(`${this.baseUrl}/login`, user);
  }

  logout(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/logout`, user);
  }

  getUser(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  getUserList(uniqueId: string): Observable<Object> {
    return this.httpClient.post<User[]>(`${this.baseUrl}/users`, uniqueId);
  }

  getChat(uniqueId: string, incomingId: string): Observable<Object> {
    return this.httpClient.post<Message[]>(`${this.baseUrl}/chat`, { uniqueId, incomingId });
  }

  sendMessage(message: Message): Observable<Object> {
    return this.httpClient.post<Message>(`${this.baseUrl}/send`, message);
  }

  deleteMessage(msgId: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${msgId}`, { responseType: 'text' });
  }

}
