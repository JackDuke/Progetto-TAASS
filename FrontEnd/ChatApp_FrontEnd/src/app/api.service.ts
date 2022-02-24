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

  baseUrl = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/login`, user);
  }

  getUser(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  getUserList(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/users`);
  }

  /* login(email: string, password: string): Observable<Object> {
    const postData = 'email=' + email + '&password=' + password;
    return this.httpClient
      .post(`${this.baseUrl}/login`, { data: email, password }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(
        map((user) => {
          if (user) {
            localStorage.clear();
          }
          return user;
        })
      );
  } */

  logout(uniqueId: number) {
    const postData = 'unique_id=' + uniqueId;
    return this.httpClient
      .post(`${this.baseUrl}/logout.php`, postData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(
      );
  }

  getUsers(uniqueId: number) {
    const postData = 'unique_id=' + uniqueId;
    return this.httpClient
      .post<User[]>(`${this.baseUrl}/users.php`, postData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(
        map((users) => {
          return users;
        })
      );
  }

  getChat(uniqueId: number, incomingId: number) {
    const postData = 'unique_id=' + uniqueId + '&incoming_id=' + incomingId;
    return this.httpClient
      .post<Message[]>(`${this.baseUrl}/get-chat.php`, postData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(
        map((messages) => {
          return messages;
        })
      );
  }

  insertNewContact(uniqueId: number, fname: string, lname: string, email: string, password: string, img: string, status: string) {
    const postData = 'unique_id=' + uniqueId + '&fname=' + fname + '&lname=' + lname + '&email=' + email + '&password=' + password + '&img=' + img + '&status=' + status;
    return this.httpClient
      .post<User>(`${this.baseUrl}/insert-contact.php`, postData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  sendMessage(uniqueId: number, incomingId: number, msg: string) {
    const postData = 'unique_id=' + uniqueId + '&incoming_id=' + incomingId + '&message=' + msg;
    return this.httpClient
      .post<Message>(`${this.baseUrl}/insert-chat.php`, postData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(
        map((message) => {
          return message;
        })
      );
  }

  deleteMessage(msgId: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete-message.php?msg_id=${msgId}`);
  }

}
