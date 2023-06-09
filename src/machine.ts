import { assign, createMachine } from "xstate";
import { PromptHistoryItem } from "./components/prompt/PromptHistory";

export enum EventTypes {
  UPDATE_PROMPT = "UPDATE_PROMPT",
  SUBMIT = "SUBMIT",
  START_RECORDING = "START_RECORDING",
  STOP_RECORDING = "STOP_RECORDING",
}

interface Context {
  url: string;
  prompt: string;
  message: string;
  error: string | null;
  urlList: PromptHistoryItem[];
}

// TODO: improve types
type Events =
  | { type: EventTypes.SUBMIT; params?: any; data?: any }
  | { type: EventTypes.UPDATE_PROMPT; params?: any; data?: any }
  | { type: EventTypes.START_RECORDING; params?: any; data?: any }
  | { type: EventTypes.STOP_RECORDING; params?: any; data?: any };

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDpsIAbMAYgFUAFAEQEEAVAUQH1qAlAeQFlrGA2gAYAuolAAHAPaxsAF2xTc4kAA9EATgBsAJgIAOHUIDMAFn0aNxnfv3GANCACeiY8f0EN5oQFZTuwwB2Yy0AX1DHNCw8QmIycgBlSgAhHgBJQVEVaVkFJRV1BABGHR0NAlKtHwstK30hUx9HFwQdH0CCLSEvHxLjIWD9HzCIkCicfCJSCgTGeg5GVg5mAGEuDlo0gDkAcWExJBAc+UVlQ8KSsoqdKpq6hqbnRGGfAiKijUD9YKLTMsDwpEMBNYmgYDswPgAE6oPK4AAyUlQEDwUHIECUsVwADcpABrQjjGJEMFgCHQ2GnRHI1EIPC49CUpT7fbZGQnfLnRBFfTvAzDL6BHw2YxFKrNRA6YyvP4fEKBDQ+IRCLSmQFjYHE7Ck8lgGFw6ko3BovVQqRQggSEiwgBm5uQBCJk21qHBkL1TIRSKNUDpOKkjLhLKyh2OcIK3N5RX5WkFwrsYseLV+ejayu+gXMpkVNnVTtBrrJ7v1pwSAFd0Og4LByMsEsxMgdJOzw1zitpykIeTp-D4+7ZpRKEMYrJ4e33Ar4ioEbho85rnTri56AGKobAkMtQih1hus0Mt04R9u1Ahdwy9-t2JOIXkEUwKqWK2yBXQmefRSbb9Dmn2JRhcNQSyrOsmy7Puza5EebaXOUlTVB27gPEOWhFK81TWJmaFdEUvgfiCBDfr+qK1sw9aNmyUGcqAFzuK8RiiqY2bdI+phDr0pidMM-QNDOGEjECn6EHIMK4LA6BQtgEgGt6JEYs6-oEo6C7CaJ4mSdJVKycafoMp6wZNkch7UWorg2AY5jaP4D4NF4Q7vOhUrCrGAzmP0xj4cSImoGJElSTJNLGuQprmpa1pyHaUIOvmBDeb5GkBT6ukBvpogQUZVFnDRZkePolmqqqk7ZmxTzDlUBDWDosFZrofaeZMcXqf5pxrhuW47mRe4hpBHJZaZCBDB0gRitOr61KU2hDu4WidK+-SmL4Qj6Kh0rhKMuBSBAcAqPmlG9ceAC0WhDgdryWBo3waN0vwPvUc6jDFcRgHtrbZcUtkVMqfgvkx0r6FNXj3g5pi-LUF2TgCD0qSSha6iWSiGqiL3QW9aG+BVAyirobhDEUQ5GKmuEXTx2g8q+9UFm6FJwuWlbVsjJmFEYCpvKUIOCpYfxTX2Z4fB8GEmL8KoUzDVMenCrWbtuDN9UzAzlJc7OXV4Oj2ToHQfBYAy6F4vLGJDgkEURUI+jLx5o68-Q-NjdF46VwzlJ8mHmH4oojiLjV+ZpCPaVAZttlzpXSsYbxDO43wLU5BsakJsVqV7EvrlLz0Hplx7tKmwSNDcguvnbLQhCHWj1LhbQ+Iq1Q9mtoRAA */
    tsTypes: {} as import("./machine.typegen").Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    predictableActionArguments: true,
    id: "machine",
    initial: "idle",
    context: {
      url: "/default.jpg",
      prompt: "",
      message: "",
      urlList: [
        {
          url: "/default.jpg",
          prompt: "Colorful cartoon portrait of stevie wonder",
        },
      ],
      error: null,
    },
    states: {
      idle: {
        entry: "initialize",
        on: {
          UPDATE_PROMPT: {
            target: "idle",
          },
          SUBMIT: {
            target: "imageGenerationLoading",
          },
          START_RECORDING: { target: "recording" },
        },
      },
      imageGenerationLoading: {
        entry: "startImageGenerationLoading",

        invoke: {
          src: "generateImage",
          onDone: {
            target: "imageGenerationSuccess",
            actions: "handleImageGenerationSuccess",
          },
          onError: {
            target: "imageGenerationFailure",
            actions: "handleImageGenerationFailure",
          },
        },
      },
      imageGenerationSuccess: {
        entry: "handleImageGenerationSuccess",
        always: "idle",
      },
      imageGenerationFailure: {
        entry: "handleImageGenerationFailure",
        always: "idle",
      },
      recording: {
        entry: "handleRecording",
        on: {
          STOP_RECORDING: {
            target: "transcriptionLoading",
          },
        },
      },
      transcriptionLoading: {
        entry: "startTranscriptionLoading",
        invoke: {
          src: "transcribeRecording",
          onDone: {
            target: "imageGenerationLoading",
            actions: "handleTranscriptionSuccess",
          },
          onError: {
            target: "transcriptionFailure",
            actions: "handleTranscriptionFailure",
          },
        },
      },
      transcriptionFailure: {
        entry: "handleTranscriptionFailure",
        always: "idle",
      },
    },
  },
  {
    actions: {
      initialize: assign<Context, Events>({
        prompt: (context, event) =>
          event.params ? event.params.prompt : context.prompt,
      }) as any,
      startImageGenerationLoading: assign<Context, Events>({
        prompt: (context, event) =>
          event.params ? event.params.prompt : context.prompt,
        message: "requesting image generation",
      }) as any,
      handleImageGenerationSuccess: assign<Context, Events>({
        url: (_, event) => event.data.url,
        error: null,
        message: "image generation successful",
      }) as any,
      handleImageGenerationFailure: assign<Context, Events>({
        url: "",
        error: (_, event) => event.data.error,
        message: "image generation failed",
      }) as any,
      handleRecording: assign<Context, Events>({
        message: "start recording",
      }) as any,
      startTranscriptionLoading: assign<Context, Events>({
        message: "requesting transcription",
      }) as any,
      handleTranscriptionSuccess: assign<Context, Events>({
        prompt: (_, event) => event.data.text,
        message: "transcription successful",
      }) as any,
      handleTranscriptionFailure: assign<Context, Events>({
        prompt: "",
        message: "transcription failure",
      }) as any,
    },
    services: {
      generateImage: (context: Context, event: any) => {
        const prompt = event.params ? event.params.prompt : context.prompt;
        return fetch("/api/generateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        })
          .then((res) => res.json())
          .then((data) => data)
          .catch((error) => {
            throw error;
          });
      },
      transcribeRecording: (_: Context, event: Events) => {
        console.log("service transcriptRecording", event);
        const formData = new FormData();
        formData.append("audio", event.params.blob, "audio.mp3");

        return fetch("/api/createTranscription", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => data)
          .catch((error) => {
            throw error;
          });
      },
    },
  }
);
