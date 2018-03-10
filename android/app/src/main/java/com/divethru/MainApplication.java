package com.divethru;

import android.app.Application;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.calendarevents.CalendarEventsPackage;
// import fm.indiecast.rnaudiostreamer.RNAudioStreamerPackage;
import com.horcrux.svg.SvgPackage;
// import br.com.arauk.reactnative.audioplayer.ReactNativeAudioPlayerPackage;
// import com.zmxv.RNSound.RNSoundPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new SvgPackage(),
            new RNSoundPackage(),
            new FIRMessagingPackage(),
            new CalendarEventsPackage(),
            // new RNAudioStreamerPackage(),
            // new ReactNativeAudioPlayerPackage(),
        // new RNSoundPackage(),
        // new ReactNativeAudioStreamingPackage(),
        new VectorIconsPackage(),
        new ReactVideoPackage(),
        new FBSDKPackage(mCallbackManager)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);

//    // Add code to print out the key hash
//    try {
//      PackageInfo info = getPackageManager().getPackageInfo(
//              "com.divethru",
//              PackageManager.GET_SIGNATURES);
//      for (Signature signature : info.signatures) {
//        MessageDigest md = MessageDigest.getInstance("SHA");
//        md.update(signature.toByteArray());
//        Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
//      }
//    } catch (PackageManager.NameNotFoundException e) {
//
//    } catch (NoSuchAlgorithmException e) {
//
//    }
    // SoLoader.init(this, /* native exopackage */ false);
  }
}
