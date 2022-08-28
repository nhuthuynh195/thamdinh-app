import {
    Platform,
    PermissionsAndroid,
} from 'react-native';
import moment from 'moment';
import Sound from 'react-native-sound';

import { AudioRecorder, AudioUtils } from '../components/react-native-audio';

let instance;

export default class AudioManager {
    static getInstance() {
        if (!instance) {
            instance = new AudioManager();
        }
        return instance;
    }

    checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            title: 'Microphone Permission',
            message: 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }

    prepareRecordingPath() {
        this._recordingName = moment().format('YYYYMMDDHHmmss') + '.aac';
        this._audioPath = AudioUtils.DocumentDirectoryPath + '/' + this._recordingName;
        AudioRecorder.prepareRecordingAtPath(this._audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: 'Low',
            AudioEncoding: 'aac',
            AudioEncodingBitRate: 32000
        });
    }

    setOnProgressListener(listener) {
        if (listener) {
            AudioRecorder.onProgress = listener;
            this._onProgressListener = listener;
        }
    }

    setOnFinishListener(listener) {
        if (listener) {
            AudioRecorder.onFinished = this.onFinishListener.bind(this);
            this._onFinishListener = listener;
        }
    }

    onFinishListener(data) {
        if (Platform.OS === 'ios') {
            this._onFinishListener(data.status === 'OK', this._recordingName, this._audioPath);
        }
    }

    start() {
        return new Promise((resolve, reject) => {
            try {
                this.prepareRecordingPath();
                AudioRecorder.startRecording();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    stop() {
        return new Promise((resolve, reject) => {
            try {
                AudioRecorder.stopRecording();
                if (Platform.OS === 'android') {
                    if (this._onFinishListener) {
                        this._onFinishListener(true, this._recordingName, this._audioPath);
                    }
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    pause() {
        return new Promise((resolve, reject) => {
            try {
                const filePath = AudioRecorder.pauseRecording();
                // Pause is currently equivalent to stop on Android.
                if (Platform.OS === 'android') {
                    if (this._onFinishListener) {
                        this._onFinishListener(true, filePath);
                    }
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    resume() {
        AudioRecorder.resumeRecording();
    }

    static play(audioPath) {
        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.

        if (Platform.OS === 'ios') {
            Sound.enable(true);

        }
        const sound = new Sound(audioPath, '', (error) => {
            if (error) {
            }
            sound.play((success) => {
                if (success) {
                } else {
                }
            });
        });
    }

    static pause(audioPath) {
        const sound = new Sound(audioPath, '', (error) => {
            sound.pause();
        });
    }

    // static deleteRecord(audioPath) {
    //   return new Promise((resolve) => {
    //     fs.unlink(audioPath).then(() => {
    //       resolve(true);
    //     }).catch(() => {
    //       resolve(false);
    //     });
    //   });
    // }

    static getTimeString(time) {
        return moment().startOf('day').seconds(time).format('mm:ss');
    }
}
