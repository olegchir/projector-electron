import * as os from 'os';
import * as path from "path";

export class GlobalSettings {
  // General configuration
  public static CONFIG: any = {
    USER_DIR: os.homedir() + path.sep + ".projector",
    DB_FILE: os.homedir() + path.sep + ".projector" + path.sep + "db.json",
    LOG_LEVEL: process.env.PROJECTOR_ELECTRON_LOG_LEVEL || "info",
    FEATURE_HELP_F1_SHORTCUT: false,
    FEATURE_TERMINATION_SHORTCUT: true,
    FEATURE_DEV_REFRESH_SHORTCUT: process.env.FEATURE_DEV_REFRESH_SHORTCUT || false,
    FEATURE_DEV_TOOLS: process.env.FEATURE_DEV_TOOLS || false
  }
}
