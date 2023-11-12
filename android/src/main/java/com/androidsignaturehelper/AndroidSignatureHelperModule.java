package com.androidsignaturehelper;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.androidsignaturehelper.AppSignatureHelper;

import java.util.ArrayList;


@ReactModule(name = AndroidSignatureHelperModule.NAME)
public class AndroidSignatureHelperModule extends ReactContextBaseJavaModule {
  public static final String NAME = "AndroidSignatureHelper";

  private final ReactApplicationContext reactContext;

  public AndroidSignatureHelperModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
    public void getSignatureHashes(Promise promise) {
      try {
        AppSignatureHelper mAppSignatureHelper = new AppSignatureHelper(reactContext);
        ArrayList<String> list = mAppSignatureHelper.getAppSignatures();
          String[] stringArray = list.toArray(new String[0]);
          WritableArray promiseArray=Arguments.createArray();
          for(int i=0;i<stringArray.length;i++){
            promiseArray.pushString(stringArray[i]);
          }
          
          promise.resolve(promiseArray);
      }
      catch (Error e) {
        promise.reject(e);
      }
  }
}
