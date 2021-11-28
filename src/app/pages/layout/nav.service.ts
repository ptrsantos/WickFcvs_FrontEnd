import {ElementRef, EventEmitter, Injectable, ViewChild} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { TopNavComponent } from './top-nav/top-nav.component';

@Injectable()
export class NavService {
  public appDrawer: any;
  private open: boolean;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public checkNav(){
    this.appDrawer.toggle();
  }

}
