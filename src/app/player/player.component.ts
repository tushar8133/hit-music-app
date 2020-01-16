import { Component, OnInit, OnDestroy } from '@angular/core';
import { WireService } from '../wire.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  song;
  subscription: Subscription;
  constructor(private wire:WireService) { }

  ngOnInit() {
    this.subscription = this.wire.currentlyPlaying.subscribe( (song) => {
      this.song = song;
    } )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}