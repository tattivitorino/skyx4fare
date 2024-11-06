package com.skyx4fare;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.MifareClassic;
import android.os.Build;
import android.widget.Toast;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.io.InputStream;
import java.io.OutputStream;
import android.util.Base64;
import java.io.ByteArrayInputStream;

import org.apache.commons.lang3.StringUtils;
import retrofit2.converter.gson.GsonConverterFactory;


import static android.hardware.Camera.Parameters.FLASH_MODE_ON;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.x4fare.mobipix.onboard.sdk.MobiPixOnboard;

import com.x4fare.mobipix.onboard.sdk.OnboardCallback;
import com.x4fare.mobipix.onboard.sdk.dto.MobiPixResponseDTO;
import com.x4fare.mobipix.onboard.sdk.dto.InitResponseDTO;
import com.x4fare.mobipix.onboard.sdk.dto.ChargeRiderResponseDTO;


public class paymentModuleX4 extends ReactContextBaseJavaModule implements ActivityEventListener {
   public CallbackInit callbackInit = new CallbackInit();

    
    private static ReactApplicationContext reactContext;
    private MobiPixOnboard MobiPixOnboard;  
    public CallbackTransaction callbackTransaction = new CallbackTransaction();
    paymentModuleX4(ReactApplicationContext context) {

        super(context);
        reactContext = context;
        reactContext.addActivityEventListener(this);
    }


    @Override
    public String getName() {
        return "paymentModuleX4";
    }
     public void onNewIntent(Intent intent) {}

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    }


    @ReactMethod(isBlockingSynchronousMethod = true)
    public String initSDKX4Fare(String uuid, String ApiKey, String IMEI){

        MobiPixOnboard.init(this.reactContext,"QA",uuid,ApiKey, IMEI,this.callbackInit);  
    return this.callbackInit.getBackStatus();
}
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String startX4FareTransaction(String valor, String qrPassageiro, String motorista, String trecho ){

    MobiPixOnboard.getInstance().chargePassenger(this.reactContext, valor, qrPassageiro, motorista, trecho, this.callbackTransaction);

    return callbackTransaction.getBackStatus();
    }

     @ReactMethod(isBlockingSynchronousMethod = true)
     public String getStatus(){
        return this.callbackTransaction.getBackStatus();
     }
     @ReactMethod(isBlockingSynchronousMethod = true)
     public void setStatus(){
        this.callbackTransaction.setBackStatus(null);
     }

}