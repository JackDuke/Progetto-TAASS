import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  public showPassword: boolean | undefined;
  user: any;

  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
   /*  this.apiService.login(this.user).subscribe(user => {
      this.user = user;
      // Cambio component ma mi porto dietro lo user
      this.router.navigate(['/users'], {state: {user: this.user}});
    }); */
    this.apiService.login(this.user).subscribe((user) => this.user = user);
  }
}
