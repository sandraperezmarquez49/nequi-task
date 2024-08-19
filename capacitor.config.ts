import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nequi.nequitasktest',
  appName: 'Nequi - Task',
  webDir: 'www',
  cordova: {
    preferences: {
      WKWebViewOnly: 'true',
      Orientation: 'portrait',
      ScrollEnabled: 'false',
      'android-minSdkVersion': '28',
      'android-targetSdkVersion': '34',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000'
    }
  }
};

export default config;
