import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  isHandset$: Observable<boolean>;
  constructor(private breakPointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.isHandset$ = this.breakPointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );
  }

}
