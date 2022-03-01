import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Output() messageText = new EventEmitter();

  chatDiv!: HTMLElement;
  user!: User;
  userToChat!: User;
  messages!: Message[];
  message: Message = {
    id: 0,
    idDestinatario: '',
    idMittente: '',
    msgText: '',
  };
  hoverMessage: any;


  constructor(private apiService: ApiService,
              private router: Router) {
      this.userToChat = this.router.getCurrentNavigation()!.extras.state!['example'];
      this.user = this.router.getCurrentNavigation()!.extras.state!['user'];
    }

  ngOnInit(): void {
    this.message.idDestinatario = this.userToChat.uniqueId;
    this.message.idMittente = this.user.uniqueId;
    this.apiService.getChat(this.user.uniqueId, this.userToChat.uniqueId).subscribe(messages => {
      this.messages = messages as Message[];
      console.log(messages);
    });

    this.checkNewMessages();
  }

  checkNewMessages(): void {
    setInterval(() => {
      this.apiService.getChat(this.user.uniqueId, this.userToChat.uniqueId).subscribe(messages => {
      this.messages = messages as Message[];
    });
    }, 1000);
  }

  sendMessage(message: Message) {
    console.log('message: ' + JSON.stringify(message));
    this.apiService.sendMessage(message).subscribe();
    this.message.msgText = '';
    this.checkNewMessages();
  }

  deleteMessage(message: any) {
    // this.apiService.deleteMessage(message.msg_id).subscribe();
    // this.checkNewMessages();
  }

  goBack() {
    this.router.navigate(['/users'], {state: {user: this.user}});
  }
}
