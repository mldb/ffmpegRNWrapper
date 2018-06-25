package com.testffmpeg;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.github.hiteshsondhi88.libffmpeg.ExecuteBinaryResponseHandler;
import com.github.hiteshsondhi88.libffmpeg.FFmpeg;
import com.github.hiteshsondhi88.libffmpeg.LoadBinaryResponseHandler;
import com.github.hiteshsondhi88.libffmpeg.exceptions.FFmpegNotSupportedException;

/**
 * Created by miladbagheri on 6/24/18.
 */

public class FfmpegModule extends ReactContextBaseJavaModule {
    Context mContext;
    FFmpeg ffmpeg;

    public FfmpegModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        ffmpeg=FFmpeg.getInstance(reactContext);
        loadFFMpegBinary();

    }

    private void loadFFMpegBinary() {
        try {
            ffmpeg.loadBinary(new LoadBinaryResponseHandler() {
                @Override
                public void onFailure() {
                }
            });
        } catch (FFmpegNotSupportedException e) {
        }
    }
    @ReactMethod
    public void getMpin(String command){
        final DeviceEventManagerModule.RCTDeviceEventEmitter emitter= this.getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);

        String[] commands=command.split(" ");
        try {
            ffmpeg.execute(commands, new ExecuteBinaryResponseHandler() {
                public void onFailure(String s) {
                    emitter.emit("onFailure","FAILED with output : "+s);
                }

                @Override
                public void onSuccess(String s) {
                    emitter.emit("onSuccess","SUCCESS with output : "+s);

                }
                @Override
                public void onProgress(String s) {
                    emitter.emit("onProgress","progress : "+s);

                }

                @Override
                public void onStart() {
                    emitter.emit("onStart","Started command : ffmpeg ");


                }

                @Override
                public void onFinish() {
                    emitter.emit("onFinish","Finished command : ffmpeg ");
                }
            });

        } catch (Exception e) {
            Toast.makeText(mContext, "Unable to fetch shared preference", Toast.LENGTH_LONG).show();
        }
    }
    @Override
    public String getName() {
        return "FfmpegModule";

    }
}
