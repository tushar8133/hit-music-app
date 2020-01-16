import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  authObs;
  userSubs: Subscription;
  isUserAuthentic: boolean;

  constructor(private authService:AuthService, private musicService:MusicService) {
    this.username = "tushar8133@gmail.com";
    this.password = "Ambition@1";
  }

  ngOnInit() {
    this.userSubs = this.authService.userSubject.subscribe(data => {
      this.isUserAuthentic = data['token'];
    })
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }

  login(form:NgForm){
    let { username, password } = form.value;
    this.authObs = this.authService.login(username, password);
    this.handleUserState();
  }

  register(form:NgForm){
    let { username, password } = form.value;
    this.authObs = this.authService.register(username, password);
    this.handleUserState();
  }

  handleUserState(){
    this.authObs.subscribe(data => {
      console.log(data);
    });
  }

  logout(){
    this.authService.logout();
  }

  submit(data:NgForm){
    
  }

}