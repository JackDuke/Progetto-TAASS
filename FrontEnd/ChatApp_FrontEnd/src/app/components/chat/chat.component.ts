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
    msg_id: 0,
    incoming_msg_id: 0,
    outgoing_msg_id: 0,
    msg: '',
  };
  hoverMessage: any;


  constructor(private apiService: ApiService,
              private router: Router) {
      this.userToChat = this.router.getCurrentNavigation()!.extras.state!['example'];
      this.user = this.router.getCurrentNavigation()!.extras.state!['user'];
    }

  ngOnInit(): void {
    this.apiService.getChat(this.user.unique_id, this.userToChat.unique_id).subscribe(messages => {
      this.messages = messages as Message[];
    });

    this.checkNewMessages();
  }

  checkNewMessages(): void {
    setInterval(() => {
      this.apiService.getChat(this.user.unique_id, this.userToChat.unique_id).subscribe(messages => {
      this.messages = messages as Message[];
    });
    }, 1000);
  }

  sendMessage(message: string) {
    this.apiService.sendMessage(this.user.unique_id, this.userToChat.unique_id, message).subscribe();
    this.message.msg = '';
    this.checkNewMessages();
  }


  deleteMessage(message: any) {
    this.apiService.deleteMessage(message.msg_id).subscribe();
    this.checkNewMessages();
  }

  goBack() {
    this.router.navigate(['/users'], {state: {user: this.user}});
  }
}
