import { useEffect } from "react";
import { useProcessVisualization } from "../../context/ProcessVisualizationContext";
import { useActor } from "@xstate/react";
import { useMachineService } from "../../context/GlobalContext";
import { ActorRefFrom } from "xstate";
import { EventTypes, machine } from "../../state/machine";

export const AudioRecorder = ({ className }: { className?: string }) => {
  const { setStartRecording, setAudioClip, audioClip } =
    useProcessVisualization();

    const [state, send] = useActor(useMachineService().service as ActorRefFrom<typeof machine>);

  const startRecording = state.matches("recording");
  const isRecording = state.matches("recording");

  let mediaRecorder: MediaRecorder;
  let chunks: any[] = [];

  const onStop = () => {
    mediaRecorder?.stop();
  };

  const onStopMediaRecorder = () => {
    const blob = new Blob(chunks, { type: "audio/mp3; codecs=opus" });
    chunks = [];
    setAudioClip(window.URL.createObjectURL(blob));

    send({ type: EventTypes.STOP_RECORDING, params: { blob } });
  };

  const onStart = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true,
          }
        )

        // Success callback
        .then((stream) => {
          console.log("on stream update...");

          mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          mediaRecorder.onstop = (e) => {
            console.log("mediarecorder onstop");
            onStopMediaRecorder();
          };
        })

        // Error callback
        .catch((err) => {
          mediaRecorder?.stop();
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      // setIsRecording(false);
      mediaRecorder?.stop();
      console.log("getUserMedia not supported on your browser!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (startRecording) {
      onStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startRecording]);

  useEffect(() => {
    return () => {
      onStop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        {isRecording && (
          <button
            className="w-8 h-8 text-pink-500 hover:text-pink-700 active:text-pink-400"
            onClick={onStop}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z"
              ></path>
            </svg>
          </button>
        )}
      </div>
      {audioClip && <audio src={audioClip} controls></audio>}
    </div>
  );
};
