import { ElectronApp } from './code/ElectronApp'

export async function start() {
  const controller = new ElectronApp();
  const app = controller.app;
  await controller.start();
}

(async function() {
  await start();
}());


