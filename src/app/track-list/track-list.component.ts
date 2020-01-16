import { Component, OnInit, Input } from "@angular/core";
import { MusicService } from "../music.service";
import { WireService } from '../wire.service';

@Component({
  selector: "app-track-list",
  templateUrl: "./track-list.component.html",
  styleUrls: ["./track-list.component.css"]
})
export class TrackListComponent implements OnInit {
  @Input("album") set name(val) {
    this.getTrackList(val);
  }
  trackList = [];
  currentlySelected;
  subject
  constructor(private musicService: MusicService, private wire:WireService) {}

  ngOnInit() {
    
  }

  getTrackList(albumName: string) {
    this.musicService.getTrackList(albumName).subscribe(data => {
      this.trackList = data;
    });
  }

  setTrack(song: Object) {
    this.currentlySelected = song;
    this.wire.currentlyPlaying.next(song);
  }
}
