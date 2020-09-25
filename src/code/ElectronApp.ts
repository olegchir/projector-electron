// tslint:disable/tslint:enable awaits you
import {app, BrowserWindow, ipcMain, Menu, globalShortcut, remote} from 'electron';

import * as url from 'url';
import * as path from 'path';
import {Lang} from "./Lang";
import {ElectronUtil} from "./ElectronUtil";
import * as electron from "electron";
import {GlobalSettings} from "./GlobalSettings";

export class ElectronApp {
  public mainWindow:BrowserWindow;
  public app:Electron.App;

  constructor () {
    this.app = app
  }

  createWindow () {

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

  connect(){
    this.mainWindow.loadURL('http://void:8080/projector/?host=void&port=8887');
  }

  quitApp() {
    // Two alternatives:
    // This command will work even with Blocker: app.exit(0)
    // Also we can do the same in the renderer process:
    // let w = electron.remote.getCurrentWindow(); w.close();
    // This is the normal way:
    // app.quit()
    app.exit(0);
  }

  start():void {
    app.on('ready', () => {
      this.createWindow();
    });

    ElectronUtil.registerGlobalShortcut(app,'Alt+F4', () => {
      this.quitApp();
    });

    if (GlobalSettings.CONFIG.FEATURE_TERMINATION_SHORTCUT) {
      ElectronUtil.registerGlobalShortcut(app, 'CommandOrControl+Alt+Q', () => {
        this.quitApp();
      });
    }

    if (GlobalSettings.CONFIG.FEATURE_HELP_F1_SHORTCUT) {
      ElectronUtil.registerGlobalShortcut(app, 'F1', () => {
        this.mainWindow.webContents.sendInputEvent({keyCode: 'Q', type: 'keyDown', modifiers: ['control']});
      });
    }

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

    ipcMain.on('connect', (event, arg) => {
      this.connect()
    });

  }
}
