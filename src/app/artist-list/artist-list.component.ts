import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../music.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  artists = [];
  selectedArtist;
  @Output() eventSelectedArtist = new EventEmitter();
  constructor(private authService:AuthService, private musicService: MusicService) { }

  ngOnInit() {
    this.authService.userSubject.subscribe(_ => {
      this.getAllArtist();
    })
  }

  ngOnDestroy(){
    
  }

  setArtistName(artistName:string){
    this.selectedArtist = artistName;
    this.eventSelectedArtist.emit(this.selectedArtist);
  }

  getAllArtist(){
    this.musicService.getAllArtists().subscribe( (data) => {
      this.artists = data;
    })
  }

}