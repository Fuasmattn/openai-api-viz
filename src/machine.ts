import { assign, createMachine } from "xstate";
import { PromptHistoryItem } from "./components/prompt/PromptHistory";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDpsIAbMAYgFUAFAEQEEAVAUQH1qAlAeQFlrGA2gAYAuolAAHAPaxsAF2xTc4kAA9EATgBsAJgIAOHUIDMAFn0aNxnfv3GANCACeiY8f0EN5oQFZTuwwB2Yy0AX1DHNCw8QmIycgBlSgAhHgBJQVEVaVkFJRV1BABGHR0NAlKtHwstK30hUx9HFwQdH0CCLSEvHxLjIWD9HzCIkCicfCJSCgTGeg5GVg5mAGEuDlo0gDkAcWExJBAc+UVlQ8KSsoqdKpq6hqbnRGGfAiKijUD9YKLTMsDwpEMBNYmgYDswPgAE6oPK4AAyUlQEDwUHIECUsVwADcpABrQjjGJEMFgCHQ2GnRHI1EIPC49CUpT7fbZGQnfLnRBFfTvAzDL6BHw2YxFKrNRA6YyvP4fEKBDQ+IRCLSmQFjYHE7Ck8lgGFw6ko3BovVQqRQggSEiwgBm5uQBCJk21qHBkL1TIRSKNUDpOKkjLhLKyh2OcIK3N5RX5WkFwrsYseLV+ejayu+gXMpkVNnVTtBrrJ7v1pwSAFd0Og4LByMsEsxMgdJOzw1zitpykIeTp-D4+7ZpRKEMYrJ4e33Ar4ioEbho85rnTri56AGKobAkMtQih1hus0Mt04R9u1Ahdwy9-t2JOIXkEUwKqWK2yBXQmefRSbb9Dmn2JRhcNQSyrOsmy7Puza5EebaXOUlTVB27gPEOWhFK81TWJmaFdEUvgfiCBDfr+qK1sw9aNmyUGcqAFzuK8RiiqY2bdI+phDr0pidMM-QNDOGEjECn6EHIMK4LA6BQtgEgGt6JEYs6-oEo6C7CaJ4mSdJVKycafoMp6wZNkch7UWorg2AY5jaP4D4NF4Q7vOhUrCrGAzmP0xj4cSImoGJElSTJNLGuQprmpa1pyHaUIOvmBDeb5GkBT6ukBvpogQUZVFnDRZkePolmqqqk7ZmxTzDlUBDWDosFZrofaeZMcXqf5pxrhuW47mRe4hpBHJZaZCBDB0gRitOr61KU2hDu4WidK+-SmL4Qj6Kh0rhKMuBSBAcAqPmlG9ceAC0WhDgdryWBo3waN0vwPvUc6jDFcRgHtrbZcUtkVMqfgvkx0r6FNXj3g5pi-LUF2TgCD0qSSha6iWSiGqiL3QW9aG+BVAyirobhDEUQ5GKmuEXTx2g8q+9UFm6FJwuWlbVsjJmFEYCpvKUIOCpYfxTX2Z4fB8GEmL8KoUzDVMenCrWbtuDN9UzAzlJc7OXV4Oj2ToHQfBYAy6F4vLGJDgkEURUI+jLx5o68-Q-NjdF46VwzlJ8mHmH4oojiLjV+ZpCPaVAZttlzpXSsYbxDO43wLU5BsakJsVqV7EvrlLz0Hplx7tKmwSNDcguvnbLQhCHWj1LhbQ+Iq1Q9mtoRAA */
    tsTypes: {} as import("./machine.typegen").Typegen0,
    predictableActionArguments: true,
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDpsIAbMAYgGUBVAIQFkBJAFQG0AGAXUVAAcB7WNgAu2frh4gAHogCM7AGyyCAFgVKAHBpUBWdgGYATDp0AaEAE9EKo6p3rDATn32F7XQF8P5tFjyFiMipmAEEAJWYAfTCAUQBhAHkwgBFGADkAcQ5uJBABIVFxSRkEeSVVdVktXQNjM0s5fWVHFUMAdkMFHWMnDX19Lx8MHHwiNBgMsHwAJ1RC3AAZflQIPChyCHEA3AA3fgBrQl8RgPGwSZm5sUXl1dwoBDw99CvxbOzJfJFr4rkdNp0BAUbVkLRUIMcfUh5isCB0TQI7CRjlkshqbRU7EMgxAx38Y1QEymYFm8yWKzW5BJ0340wIvBIcwAZrTkAQ8aNsGcLiTXjcKfdHrt+C95u8uJ9BN8irkSrJ-oDgaCVODQVCNDDrMYCDpdFUFIZ9FpDIZZG0cRzToTzsTSddKABXdDoOCwcixSgxNgS3Jfea-UptWx9fSYxw6UHseVtTUIJrKDoqDTwmwKI0mi3DfFc608u3iABiqGwJAd0woHq9H19Uv9srkQcMBBDYYjjij-1jnWU3f0HfDzjaXUzflG5fQtLu60r3pyfFrP3rpXljkRVUMyaRbnBCljGmU4JRGIU2mT+g6I5OBGEs1wsHQ02wvDJt0pm05wsO7KzoxvqDvD5Pi+AoPE8Ip8uKc55AuMqgCURj6M2SaOBiLj9Cisi7g0cIIn0rQqm02jsEGOiXvif4AY+z7XOSU5UtMNJ0gyzKst+o6EBR95UcBU5Cs8EFcNW84FIucGIAhSEaChNjwvoGFYbChqru2IIqKiBhVDYZG-reXFAdcRYlmWFYxJ6s6SiJsHSIgyZNiCBqKGiA5yV25S9v2OiDsOOK4PwEBwJIloWdKEhLgAtApiBhYCjixbFBgYm0IIuOa3i4j+ASkGAwV1mJCCOAazaGAYbidFGSKyK5CZJk4GFtmoKjaVaRKXDxaw5aJ1mlJ0q6yCaNjySYRqxioKEEIRsUKA1mHaOGTUEi1vLzI6zquh1VlyrZBCDvY+gGuGpoxthEYxaNCgoR0hg2CC805ot+a4IZpblutoV5VU3Tbeeu37d0ZojfIqjOChxjyG2aLzeOk7tTWllvV1fXnQQfVXXJqJdPCGrYeGOrni4hruFdoKkWllrXrpgHUeItEw8JIUBq0I2QkChqhhujjtN082cZT8xPcZr0BvYbQEO0oZtC0G5XdoXZGqLXSmqN8jFewLReF4QA */
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
            cond: (context, event) => event.params,
          },
          SUBMIT: {
            target: "imageGenerationLoading",
            cond: (context) => context.prompt,
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
        on: {
          RESET: "idle",
        },
      },
      imageGenerationFailure: {
        entry: "handleImageGenerationFailure",
        on: {
          RESET: "idle",
        },
      },
      recording: {
        entry: "handleRecording",
        on: {
          STOP_RECORDING: {
            target: "transcriptionLoading",
            cond: (context, event) => event.params && event.params.blob,
          },
          RESET: "idle",
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
        on: {
          RESET: "idle",
        },
      },
    },
  },
  {
    actions: {
      initialize: assign({
        prompt: (context, event) => (event.params ? event.params.prompt : ""),
      }),
      startImageGenerationLoading: assign({
        prompt: (context, event) =>
          // TODO: improve and call separate action with params or context instead?
          event.params ? event.params.prompt : context.prompt,
        message: "requesting image generation",
      }),
      handleImageGenerationSuccess: assign({
        url: (context, event) => event.data.url,
        error: null,
        message: "image generation successful",
      }),
      handleImageGenerationFailure: assign({
        url: "",
        error: (context, event) => event.data.error,
        message: "image generation failed",
      }),
      handleRecording: assign({
        message: "start recording",
      }),
      startTranscriptionLoading: assign({
        message: "requesting transcription",
      }),
      handleTranscriptionSuccess: assign({
        prompt: (context, event) => event.data.text,
        message: "transcription successful",
      }),
      handleTranscriptionFailure: assign({
        prompt: "",
        message: "transcription failure",
      }),
    },
    services: {
      generateImage: (context, event) => {
        console.log("service generateImage");
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
      transcribeRecording: (context, event) => {
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
