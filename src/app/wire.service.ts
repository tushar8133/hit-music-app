import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WireService {

  currentlyPlaying = new Subject<Object>();
  constructor() { }


}