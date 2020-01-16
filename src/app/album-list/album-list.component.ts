import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  @Input('artist') set name(val){
    this.getArtistAlbums(val);
    this.setAlbum("");
  }
  @Output() emitAlbum = new EventEmitter();
  albums = [];
  currentlySelected;
 
  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.getArtistAlbums('ColdPlay')
  }

  getArtistAlbums(artistName:string){
    this.musicService.getArtistAlbums(artistName).subscribe( (data) => {
      this.albums = data;
    })
  }

  setAlbum(album:string){
    this.currentlySelected = album;
    this.emitAlbum.emit(album);
  }

  

}