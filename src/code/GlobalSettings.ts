export class GlobalSettings {
  // General configuration
  public static CONFIG = {
    LOG_LEVEL: process.env.PROJECTOR_ELECTRON_LOG_LEVEL || "info",
    FEATURE_HELP_F1_SHORTCUT: false,
    FEATURE_TERMINATION_SHORTCUT: true,
    FEATURE_DEV_REFRESH_SHORTCUT: process.env.FEATURE_DEV_REFRESH_SHORTCUT || false
  }
}
