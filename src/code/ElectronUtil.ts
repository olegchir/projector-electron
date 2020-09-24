import {App, BrowserWindow, Menu} from "electron";
const { app, globalShortcut } = require("electron");

export class ElectronUtil {
  public static disableAllStandardShortcuts () {
    Menu.setApplicationMenu(null);
  }

  public static disableWindowShortcuts (browserWindow: BrowserWindow) {
    browserWindow.setMenu(null)
  }

  // https://www.electronjs.org/docs/tutorial/keyboard-shortcuts
  public static registerGlobalShortcut(recipient: (BrowserWindow | App), activationKey: string, callback: () => void) {
    app.on("ready", () => {
      globalShortcut.register(activationKey, callback);
    });
  }
}
