import { ElectronApp } from './ElectronApp'

export function start():void {
    const controller = new ElectronApp();
    const app = controller.app;
    controller.start();
}

start();
