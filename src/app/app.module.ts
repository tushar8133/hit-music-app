import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MusicService } from './music.service';
import { HttpClientModule} from '@angular/common/http';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { TrackListComponent } from './track-list/track-list.component';
import { TimePipe } from './track-list/time.pipe';
import { PlayerComponent } from './player/player.component';
import { WireService } from './wire.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, ArtistListComponent, AlbumListComponent, TrackListComponent, TimePipe, PlayerComponent, AuthComponent],
  bootstrap:    [ AppComponent ],
  providers: [MusicService, WireService, AuthService]
})
export class AppModule { }
