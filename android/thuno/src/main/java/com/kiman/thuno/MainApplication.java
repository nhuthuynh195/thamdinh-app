package com.kiman.thuno;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.imagepicker.ImagePickerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.oblador.shimmer.RNShimmerPackage;
import com.nuttawutmalee.RCTBluetoothSerial.*;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
//import com.microsoft.codepush.react.CodePush;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new RNGestureHandlerPackage(),
              new VectorIconsPackage(),
              new MapsPackage(),
              new ReactNativeAudioPackage(),
              new RNSoundPackage(),new ImagePickerPackage(),
              new ReactNativePushNotificationPackage(),
              new RNShimmerPackage(),
              new RCTBluetoothSerialPackage(),
              new BackgroundGeolocationPackage(),
              new RNFusedLocationPackage()
//              new CodePush("B9KRDEly901vyr_85npM_1KjodSqe7882160-45f7-4651-8864-db31202018f6", MainApplication.this, BuildConfig.DEBUG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "src/apps/thuno/index";
    }

//    @Override
//    protected String getJSBundleFile() {
//      return CodePush.getJSBundleFile();
//    }
  };



  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
