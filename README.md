# react-native-android-ffmpeg-wrapper
a simple ffmpeg wrapper for react native (android only)

# Installing:
   # Step 1:
      npm i react-native-android-ffmpeg-wrapper --save
   # Step 2:
     react-native link react-native-android-ffmpeg-wrapper
 
# Usage:
   ```javascript
   import * as Ffmpeg from 'react-native-android-ffmpeg-wrapper'
   //for set listeners:
   Ffmpeg.setListeners(this.onFailure,this.onSuccess,onProgress,onStart,onFinish)
   //for run commands:
   Ffmpeg.exec('cmd')
