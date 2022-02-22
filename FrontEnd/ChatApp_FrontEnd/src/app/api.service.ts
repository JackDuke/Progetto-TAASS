import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './model/user';
import { map } from 'rxjs/operators';
import { Message } from './model/message';

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

  // Riferimento alla cartella api in htdocs in xampp --> URL per effettuare le chiamate al DB
  PHP_API_SERVER = 'http://localhost/api';
  // Riferimento al server node
  NODE_API_SERVER = 'http://localhost:8648';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const postData = 'email=' + email + '&password=' + password;
    return this.httpClient
      .post<User>(`${this.PHP_API_SERVER}/login.php`, postData, {
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
  }

  logout(uniqueId: number) {
    const postData = 'unique_id=' + uniqueId;
    return this.httpClient
      .post(`${this.PHP_API_SERVER}/logout.php`, postData, {
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
      .post<User[]>(`${this.PHP_API_SERVER}/users.php`, postData, {
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

  getUsersNode() {
    return this.httpClient
      .get<User[]>(`${this.NODE_API_SERVER}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(
        map((users) => {
          return users as User[];
        })
      );
  }

  getChat(uniqueId: number, incomingId: number) {
    const postData = 'unique_id=' + uniqueId + '&incoming_id=' + incomingId;
    return this.httpClient
      .post<Message[]>(`${this.PHP_API_SERVER}/get-chat.php`, postData, {
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
      .post<User>(`${this.PHP_API_SERVER}/insert-contact.php`, postData, {
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
      .post<Message>(`${this.PHP_API_SERVER}/insert-chat.php`, postData, {
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
    return this.httpClient.delete(`${this.PHP_API_SERVER}/delete-message.php?msg_id=${msgId}`);
  }

}
