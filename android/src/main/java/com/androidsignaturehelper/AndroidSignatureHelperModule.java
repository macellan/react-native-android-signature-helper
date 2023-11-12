package com.androidsignaturehelper;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@ReactModule(name = AndroidSignatureHelperModule.NAME)
public class AndroidSignatureHelperModule extends ReactContextBaseJavaModule {
  public static final String NAME = "AndroidSignatureHelper";

  public AndroidSignatureHelperModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
    public void getSignatureHash(Promise promise) {
        Context context = getReactApplicationContext();

        try {
            PackageInfo packageInfo = context.getPackageManager().getPackageInfo(
                    context.getPackageName(),
                    PackageManager.GET_SIGNATURES);

            for (Signature signature : packageInfo.signatures) {
              String appInfo = context.getPackageName() + " " + signature;

              MessageDigest md = MessageDigest.getInstance("SHA-256");
              md.update(appInfo.getBytes(StandardCharsets.UTF_8));
              byte[] hashed = md.digest();

              hashed = Arrays.copyOfRange(hashed, 0, 9);

              String signatureHash = Base64.encodeToString(hashed, Base64.NO_PADDING | Base64.NO_WRAP);
              signatureHash = signatureHash.substring(0, 11);
                
              promise.resolve(signatureHash);
            }
        } catch (PackageManager.NameNotFoundException | NoSuchAlgorithmException e) {
            promise.reject(e.getMessage());
        }
  }
}
