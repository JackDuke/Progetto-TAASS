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
  EDIT_MODE!: boolean;


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
    });

    // this.checkNewMessages();
  }

  checkNewMessages(): void {
    setInterval(() => {
      this.apiService.getChat(this.user.uniqueId, this.userToChat.uniqueId).subscribe(messages => {
      this.messages = messages as Message[];
    });
    }, 1000);
  }

  sendMessage(message: Message) {
    if (this.EDIT_MODE) {
      this.apiService.editMessage(message.id, message).subscribe(x => console.log(x));
      this.message.msgText = '';
      this.EDIT_MODE = false;
    } else {
    this.apiService.sendMessage(message).subscribe();
    this.message.msgText = '';
    }
    this.checkNewMessages();
  }

  deleteMessage(message: Message) {
    this.apiService.deleteMessage(message.id).subscribe();
    this.checkNewMessages();
  }

  editMessage(message: Message) {
    this.EDIT_MODE = true;
    console.log(this.EDIT_MODE);
    // console.log(message.msgText);
    this.message = message;
    const inputField = document.getElementById("text") as HTMLElement;
    document.getElementById("text")!.focus();
    inputField.innerText = message.msgText;
    this.message.msgText = message.msgText;

    //this.apiService.editMessage(message.id).subscribe();
  }

  goBack() {
    this.router.navigate(['/users'], {state: {user: this.user}});
  }
}
