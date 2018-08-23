package com.divethru.divethru;

import android.app.Application;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;

import com.divethru.divethru.BuildConfig;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.imagepicker.ImagePickerPackage;
import com.RNRate.RNRatePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import cl.json.RNSharePackage;
import com.dooboolab.RNIap.RNIapPackage;
// import com.dooboolab.RNIap.RNIapPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
// import co.apptailor.googlesignin.RNGoogleSigninPackage;
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
import cl.json.ShareApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.rhaker.reactnativesmsandroid.RNSmsAndroidPackage;


public class MainApplication extends Application implements ShareApplication, ReactApplication {

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
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new OrientationPackage(),
            new KCKeepAwakePackage(),
            SendSMSPackage.getInstance(),
            new ReactNativeContacts(),
            new ImagePickerPackage(),
            new RNRatePackage(),
            new RNSharePackage(),
            new RNSmsAndroidPackage(),
            new RNFetchBlobPackage(),
            new RNIapPackage(),
            // new RNIapPackage(),sz
            new RNGoogleSigninPackage(),
            // new RNGoogleSigninPackage(),
            new SvgPackage(),
            new RNSoundPackage(),
            new FIRMessagingPackage(),
            new CalendarEventsPackage(),
            // new RNAudioStreamerPackage(),
            // new ReactNativeAudioPlayerPackage(),
        // new RNSoundPackage(),
        // new ReactNativeAudioStreamingPackage(),
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
     public String getFileProviderAuthority() {
            return "com.divethru.divethru";
     }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);

   // Add code to print out the key hash
   try {
     PackageInfo info = getPackageManager().getPackageInfo(
             "com.divethru.divethru",
             PackageManager.GET_SIGNATURES);
     for (Signature signature : info.signatures) {
       MessageDigest md = MessageDigest.getInstance("SHA");
       md.update(signature.toByteArray());
       Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
     }
   } catch (PackageManager.NameNotFoundException e) {

   } catch (NoSuchAlgorithmException e) {

   }
    SoLoader.init(this, /* native exopackage */ false);
  }
}
