import { ElectronApp } from './ElectronApp'

// Starter for Electron mode
export function start():void {
    const controller = new ElectronApp();
    const app = controller.app;
    controller.start();
}

start();
