package com.kiman.thamdinh;

import android.app.Application;
import android.support.annotation.NonNull;

import com.facebook.react.ReactApplication;
import com.facebook.react.modules.core.PermissionListener;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.imagepicker.ImagePickerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.shimmer.RNShimmerPackage;
import com.zyu.ReactNativeWheelPickerPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.microsoft.codepush.react.CodePush;
import com.rnfs.RNFSPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication, OnImagePickerPermissionsCallback {

  private PermissionListener listener;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new RNGestureHandlerPackage(),
          new VectorIconsPackage(), new MapsPackage(), new RNSoundPackage(), new ImagePickerPackage(),
          new ReactNativePushNotificationPackage(), new RNCameraPackage(), new ReactNativeAudioPackage(),
          new ReactNativeWheelPickerPackage(),
          new RNFusedLocationPackage(),
          new FastImageViewPackage(),
           new RNFSPackage(),
            new PickerPackage(),
            new ImageResizerPackage(),
          new CodePush("1JtZ8mGE4VNUt51o68UVZVCOJvPdE97Ho4oJC", MainApplication.this, BuildConfig.DEBUG),
          new RNShimmerPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "src/apps/thamdinh/index";
    }
     @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

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

  @Override
  public void setPermissionListener(@NonNull PermissionListener listener) {
    this.listener = listener;
  }

}
