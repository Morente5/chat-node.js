import { Component, OnInit } from '@angular/core';

import { LoginService } from './../../services/login.service';
import { SocketService } from './../../services/socket.service';

import { User } from './../../model/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputUsername: string;
  inputStatus: string;
  avatarImages = ['man.png',
                  'boy.png',
                  'girl.png',
                  'man-2.png',
                  'man-3.png'];
  users: Array<User>;
  selectedAvatar: string;
  constructor(
    private loginService: LoginService,
    private socketService: SocketService
  ) {
    this.socketService.subjectUsers.subscribe(users => this.users = users);
  }

  ngOnInit() {
  }

  loginBtn() {
    if (this.inputUsername && this.inputUsername.trim()) {
      this.loginService.login(
        new User(this.inputUsername.trim().replace(/[\W_]+/g, '-'), this.selectedAvatar || 'man-3.png', this.inputStatus)
      );
    }
  }

  available() {
    if (this.inputUsername) {
      return !this.users.find(user => user.name === this.inputUsername.trim().replace(/[\W_]+/g, '-'));
    }
    return false;
  }

}
