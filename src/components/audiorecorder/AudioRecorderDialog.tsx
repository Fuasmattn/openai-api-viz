import { motion } from "framer-motion";
import { AudioRecorder } from "./AudioRecorder";

interface Props {
  open?: boolean;
  isRecording: boolean;
  onStop: (b: Blob) => void;
}
const AudioRecorderDialog = ({ isRecording, onStop }: Props) => {
  if (!isRecording) {
    return null;
  }
  return (
    <div>
      {/* workaround for native dialog backdrop not working */}
      <div className="w-screen h-screen absolute top-[72px] left-0 bg-gray-800 opacity-50 z-10 backdrop-blur-sm backdrop-opacity-25"></div>
      <dialog
        className="px-8 py-6 top-1/2 -translate-y-1/2 z-10 text-center dark:bg-slate-50 dark:text-slate-950 rounded-xl"
        open={isRecording}
      >
        <h3>Recording your voice</h3>
        <AudioRecorder className="my-6" onStop={(b: Blob) => onStop(b)} />
      </dialog>
    </div>
  );
};

export default AudioRecorderDialog;
