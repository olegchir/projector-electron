// tslint:disable/tslint:enable awaits you
import {app, BrowserWindow, ipcMain, Menu, globalShortcut, remote} from 'electron';

import * as url from 'url';
import * as path from 'path';
import {ElectronUtil} from "./ElectronUtil";
import {GlobalSettings} from "./GlobalSettings";
import {Logger} from "./Logger";

export class ElectronApp {
  public mainWindow:BrowserWindow;
  public app:Electron.App;

  public mainWindowUrl: string;
  public mainWindowPrevUrl: string;
  public mainWindowNextUrl: string;

  public static readonly INDEX_URL = url.format({
    pathname: path.join(__dirname, `../static/index.html`),
    protocol: "file:",
    slashes: true
  });

  constructor () {
    this.app = app
  }

  async navigateMainWindow(url: string) {
    this.mainWindowNextUrl = url
    await this.mainWindow.loadURL(url);
    this.mainWindowPrevUrl = this.mainWindowUrl
    this.mainWindowUrl = url
  }

  async createWindow() {

    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // It's better to use navigation-entry-commited
    // But it is still private: https://github.com/electron/electron/issues/10566
    // "did-navigate" is for the main frame and "did-navigate-in-page" is for multiple windows
    this.mainWindow.webContents.on('did-navigate-in-page', (event: Event,
                                                               url: string,
                                                               isMainFrame: boolean,
                                                               frameProcessId: number,
                                                               frameRoutingId: number) => {
      if (isMainFrame) {
        Logger.debug(`Navigation: go to ${url}`)
      }
    });

    this.mainWindow.webContents.on('did-fail-load', () => {
      Logger.debug(`Loading failed, fallback activated: ${this.mainWindowNextUrl} -> ${this.mainWindowUrl}`);
      this.navigateMainWindow(this.mainWindowUrl);
    });

    this.mainWindow.webContents.on('did-finish-load', () => {
      this.mainWindow.webContents.send('info', 'loading finished');
    });

    this.mainWindow.on('closed', function () {
      this.mainWindow = null;
    });

    await this.navigateMainWindow(ElectronApp.INDEX_URL);

    this.mainWindow.webContents.openDevTools();

    ElectronUtil.disableAllStandardShortcuts();
  }

  connect(){
    this.navigateMainWindow('http://void:8080/projector/?host=void&port=8887&blockClosing=false');
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

    if (GlobalSettings.CONFIG.FEATURE_DEV_REFRESH_SHORTCUT) {
      // See this interesting hack: https://github.com/electron/electron/issues/14978
      // History API is a bit clumsy, so we just emulate it with local variables
      ElectronUtil.registerGlobalShortcut(app, 'Ctrl+R', async () => {
        //this.mainWindow.reload();
        await this.navigateMainWindow(this.mainWindowUrl);
        Logger.debug("Reloaded");
      });
    }

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

    app.on('activate', async function () {
      if (this.mainWindow === null) {
          await this.createWindow()
      }
    });

    ipcMain.on('connect', (event, arg) => {
      this.connect()
    });

  }
}
