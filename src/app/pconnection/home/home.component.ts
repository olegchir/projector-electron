import { Component, OnInit } from '@angular/core';
import {Pconnection} from "../pconnection";
import {PconnectionService} from "../pconnection.service";
import {NavigationEnd, Router} from "@angular/router";
import {IpcService} from "../../ipc.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pconnections: Pconnection[] = [];
  mySubscription: any;

  constructor(public pconnectionService: PconnectionService,
              private router: Router,
              public ipc: IpcService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

  }

  ngOnInit(): void {
    this.pconnectionService.getAll().subscribe((data: Pconnection[])=>{
      console.log(data);
      this.pconnections = data;
    })
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  delete(id: number) {
    this.pconnectionService.delete(id);
    this.router.navigateByUrl('pconnection/home')
  }

  connect(id: number) {
    this.ipc.send("connect", id);
  }

}
