import { Component } from '@angular/core';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projector';

  private ipc: IpcRenderer;
  constructor(){
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
        console.log("ipc created")
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  connect(){
    console.log("Connecting to the Projector Server");
    this.ipc.send("connect");
  }
}
