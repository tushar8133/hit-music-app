import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, exhaustMap, mergeAll, toArray, map, filter, pluck, concatMap, tap, flatMap, switchMap } from 'rxjs/operators'
import { from } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class MusicService {
  data;
  databaseURL = "https://tushar8133-musicdb.firebaseio.com";

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
  }

  getToken():string{
    return this.authService.token;
  }

  getDefaultData(){
    return this.httpClient.get(`${this.databaseURL}/.json?auth=${this.getToken()}`)
    .pipe(
      map( obs => (Object.keys(obs)).map( (id) => obs[id]) )
    );
  }

  getAllArtists(){
    return this.getDefaultData()
    .pipe( map( (data) => {
      var temp = {};
      data.filter( (obj)=>{
        temp[obj['artist']] = true;
      } )
      return Object.keys(temp);
    } ) );
  }

  getArtistAlbums(artistName:string){
    return this.getDefaultData()
    .pipe( map( (data) => {
      var temp = {};
      data.filter( (obj)=>{
        if(obj['artist'] === artistName){
          temp[obj['album']] = true;
        }
      } )
      return Object.keys(temp);
    } ) );
  }

  getTrackList(albumName:string){
    return this.getDefaultData()
    .pipe( map( (data) => {
      var temp = [];
      data.filter( (obj)=>{
        if(obj['album'] === albumName){
          temp.push(obj);
        }
      } )
      return temp;
    } ) );
  }

}