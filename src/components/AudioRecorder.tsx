import { useEffect } from "react";
import { useActor } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { motion } from "framer-motion";
import { useProcessVisualization } from "../context/ProcessVisualizationContext";
import { useMachineService } from "../context/GlobalContext";
import { machine } from "../state/machine";

export const AudioRecorder = ({
  className,
  onStop,
}: {
  className?: string;
  onStop: (b: Blob) => void;
}) => {
  const { setAudioClip, audioClip } = useProcessVisualization();

  const [state, send] = useActor(
    useMachineService().service as ActorRefFrom<typeof machine>
  );

  const isRecording = state.matches("recording");

  let mediaRecorder: MediaRecorder;
  let chunks: any[] = [];

  const stop = () => {
    mediaRecorder?.stop();
  };

  const onStopMediaRecorder = () => {
    const blob = new Blob(chunks, { type: "audio/mp3; codecs=opus" });
    chunks = [];
    setAudioClip(window.URL.createObjectURL(blob));
    onStop(blob);
  };

  const onStart = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })

        // Success callback
        .then((stream) => {
          console.log("on stream update...");

          mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.start();
          mediaRecorder.ondataavailable = (e) => {
            console.log("ondataavailable", e.data);
            chunks.push(e.data);
          };

          mediaRecorder.onstop = () => {
            console.log("mediarecorder onstop");
            onStopMediaRecorder();
          };
        })

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
    if (isRecording) {
      onStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  useEffect(() => {
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      {isRecording && (
        <>
          <motion.div className="relative mt-8 mb-6 w-full flex justify-center gap-1">
            <motion.div className="absolute h-1 opacity-30 w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent top-1/2 -translate-y-1/2"></motion.div>
            {[1, 2, 3].map((bar) => (
              <motion.div
                key={bar}
                animate={{ scaleY: [0.1, 0.3, 0.1] }}
                transition={{
                  times: [0, 0.5, 1],
                  delay: 0.1 * (bar + 1),
                  duration: 1,
                  repeat: Infinity,
                }}
                className="bg-pink-500 h-10 w-1 rounded-full"
              ></motion.div>
            ))}
            {[1, 2, 3, 4, 5].map((bar) => (
              <motion.div
                key={bar}
                animate={{ scaleY: [0.1, 1, 0.1] }}
                transition={{
                  times: [0, 0.5, 1],
                  delay: 0.1 * (bar + 4),
                  duration: 1,
                  repeat: Infinity,
                }}
                className="bg-pink-500 h-10 w-1 rounded-full"
              ></motion.div>
            ))}
            {[1, 2, 3].map((bar) => (
              <motion.div
                key={bar}
                animate={{ scaleY: [0.1, 0.3, 0.1] }}
                transition={{
                  times: [0, 0.5, 1],
                  delay: 0.1 * (bar + 6),
                  duration: 1,
                  repeat: Infinity,
                }}
                className="bg-pink-500 h-10 w-1 rounded-full"
              ></motion.div>
            ))}
          </motion.div>
          <button
            className=" bg-white py-2 px-3 rounded-full text-pink-500 hover:text-pink-700 active:text-pink-400"
            onClick={stop}
          >
            <div className="flex flex-row items-center gap-2">
              <span className="font-bold uppercase">Stop</span>
              <svg
                className="w-6"
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
            </div>
          </button>
        </>
      )}
      {/* {audioClip && <audio src={audioClip} controls></audio>} */}
    </div>
  );
};
