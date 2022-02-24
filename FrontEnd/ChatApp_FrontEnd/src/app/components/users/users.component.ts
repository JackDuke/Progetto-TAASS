import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user!: User;
  users: User[] = [];
  hoverChat: any;

  constructor(private apiService: ApiService,
              private router: Router) {
                this.user = this.router!.getCurrentNavigation()!.extras!.state!['user'];
               }

  ngOnInit(): void {
    /* this.apiService.getUsers(this.user.unique_id).subscribe(users => {
        this.users = users as User[];
    });

    this.checkUserList(); */
  }

  newContact(): void {
    /* this.router.navigate(['contacts'], {state: {user: this.user}}); */
  }

  checkUserList(): void {
    /* setInterval(() => {
      this.apiService.getUsers(this.user.unique_id).subscribe(users => {
        this.users = users as User[];
    });
    }, 1000); */
  }

  goToChat(userToChat: User) {
    /* this.router.navigate(['chat'], {state: { example: userToChat, user: this.user}}); */
  }

  logout() {
    /* this.apiService.logout(this.user.unique_id).subscribe();
    this.router.navigate(['login']); */
  }
}
