// tslint:disable/tslint:enable awaits you
import {app, BrowserWindow, ipcMain, Menu} from 'electron';

import * as url from 'url';
import * as path from 'path';
import {Lang} from "./Lang";
import {ElectronUtil} from "./ElectronUtil";

export class ElectronApp {
  public mainWindow:BrowserWindow;
  public app:Electron.App;

  constructor () {
    this.app = app
    this.app["clazz"] = this
  }

  createWindow () {
    const clazz = this["clazz"];

    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })

    this.mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `../static/index.html`),
        protocol: "file:",
        slashes: true
      })
    );

    this.mainWindow.webContents.openDevTools();

    ElectronUtil.disableAllStandardShortcuts();

    this.mainWindow.webContents.on('did-finish-load', () => {
      this.mainWindow.webContents.send('test','This is a test');
    });

    this.mainWindow.on('closed', function () {
      this.mainWindow = null;
    });
  }

  openModal(){
    let modal = new BrowserWindow({ parent: this.mainWindow, modal: true, show: false });
    modal.loadURL('https://facebook.com/olegchir');
    modal.once('ready-to-show', () => {
      modal.show()
    })
  }

  openProjector() {

  }

  start():void {
    app.on('ready', this.createWindow);
    ElectronUtil.registerGlobalShortcut(app, "F1", () => {
      console.log("Hey, F1!!!");
    })

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
          app.quit()
      }
    });

    app.on('activate', function () {
      if (this.mainWindow === null) {
          this.createWindow()
      }
    });

    ipcMain.on('openModal', (event, arg) => {
      console.log("openModal - main process")
      this.openModal()
    });
  }
}
