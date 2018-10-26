import { NativeModules, NativeEventEmitter } from "react-native";
const emitter = new NativeEventEmitter(NativeModules.FfmpegModule);
export function setListeners(
  onFailure = val => {},
  onSuccess = val => {},
  onProgress = val => {},
  onStart = val => {},
  onFinish = val => {}
) {
  emitter.removeAllListeners("onFailure");
  emitter.removeAllListeners("onSuccess");
  emitter.removeAllListeners("onProgress");
  emitter.removeAllListeners("onStart");
  emitter.removeAllListeners("onFinish");
  emitter.addListener("onFailure", val => onFailure(val));
  emitter.addListener("onSuccess", val => onSuccess(val));
  emitter.addListener("onProgress", val => onProgress(val));
  emitter.addListener("onStart", val => onStart(val));
  emitter.addListener("onFinish", val => onFinish(val));
}
export function exec(command) {
  NativeModules.FfmpegModule.exec(command);
}
