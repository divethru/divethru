package com.divethru.divethru;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import com.calendarevents.CalendarEventsPackage;
import android.os.Bundle;
import android.util.Log;

import android.os.CountDownTimer;

import android.graphics.Color;

import java.io.File;

import android.content.Context;
// import com.reactnativenavigation.controllers.SplashActivity;
// import org.devio.rn.splashscreen.SplashScreen;
public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
                new CountDownTimer(3000, 1000) {

            public void onTick(long millisUntilFinished) {}

            public void onFinish() {
                getWindow().getDecorView().setBackgroundColor(Color.WHITE);
            }

        }.start();
    }


    @Override
    protected void onStart() {
        super.onStart();
        // Log.d( "ReactNativeDebugOutput", "MainActivity::onStart()" );
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        // Log.d( "ReactNativeDebugOutput", "MainActivity::onRestart()" );
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Log.d( "ReactNativeDebugOutput", "MainActivity::onResume()" );
    }

    @Override
    protected void onPause() {
        super.onPause();
        // Log.d( "ReactNativeDebugOutput", "MainActivity::onPause()" );
    }

    @Override
    protected void onStop() {
        super.onStop();
        // Log.d( "ReactNativeDebugOutput", "MainActivity::onStop()" );
    }

    // @Override
    // protected void onDestroy() {
    //     super.onDestroy();
        // Log.d( "ReactNativeDebugOutput", "MainActivity::onDestroy()" );
    // }

    @Override
    protected void onDestroy() {
      super.onDestroy();
    //   try {
    //      trimCache(this);
        //  Log.d( "ReactNativeDebugOutput", "MainActivity::onDestroy() with catch clear" );
    //   } catch (Exception e) {
    //      // TODO Auto-generated catch block
    //      e.printStackTrace();
    //   }
   }

   public static void trimCache(Context context) {
      try {
         File dir = context.getCacheDir();
         if (dir != null && dir.isDirectory()) {
            deleteDir(dir);
         }
      } catch (Exception e) {
         // TODO: handle exception
      }
   }

   public static boolean deleteDir(File dir) {
      if (dir != null && dir.isDirectory()) {
         String[] children = dir.list();
         for (int i = 0; i < children.length; i++) {
            boolean success = deleteDir(new File(dir, children[i]));
            if (!success) {
               return false;
            }
         }
      }

      // The directory is now empty so delete it
      return dir.delete();
   }

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState) {
        super.onSaveInstanceState(savedInstanceState);
        // Log.d( "ReactNativeDebugOutput", "MainActivity::onSaveInstanceState() " + savedInstanceState );
    }

    @Override
    public void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        // Log.d( "ReactNativeDebugOutput", "MainActivity::onRestoreInstanceState() " + savedInstanceState );
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DiveThru";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
      CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults);
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }
}
