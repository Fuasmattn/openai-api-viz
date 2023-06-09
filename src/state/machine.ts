import { createMachine } from "xstate";
import { PromptHistoryItem } from "../components/prompt/PromptHistory";
import { actions } from "./actions";
import { services } from "./services";

export enum StateEventTypes {
  UPDATE_PROMPT = "UPDATE_PROMPT",
  SUBMIT = "SUBMIT",
  START_RECORDING = "START_RECORDING",
  STOP_RECORDING = "STOP_RECORDING",
}

export interface StateContext {
  url: string;
  prompt: string;
  message: string;
  error: string | null;
  urlList: PromptHistoryItem[];
}

const initialContext: StateContext = {
  url: "/default.jpg",
  prompt: "",
  message: "",
  error: null,
  urlList: [
    {
      url: "/default.jpg",
      prompt: "Colorful cartoon portrait of stevie wonder",
    },
  ],
};

// TODO: improve types
export type StateEvents =
  | { type: StateEventTypes.SUBMIT; params?: any; data?: any }
  | { type: StateEventTypes.UPDATE_PROMPT; params?: any; data?: any }
  | { type: StateEventTypes.START_RECORDING; params?: any; data?: any }
  | { type: StateEventTypes.STOP_RECORDING; params?: any; data?: any };

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDpsIAbMAYgFUAFAEQEEAVAUQH1qAlAeQFlrGA2gAYAuolAAHAPaxsAF2xTc4kAA9EATgCsAZgIAWAIwAmABxDD5gGxCh+0wBoQAT0Q6hejcY22r+nYYA7FrGAL6hTmhYeITEZOQAypQAQjwAkoKiKtKyCkoq6giGhiEEQoGmxh5a+kLGVhr6Tq4IxlpWBIY6DTpGge5aWhrhkRg4+ESkFAmM9ByMrBzMAMJcHLRpAHIA4sJiSCA58orKB4XFpeWV1bX1jc2IWl0EVYFWfrq9VqZaIyBR41iaBg2zA+AATqg8rgADJSVAQPBQcgQJSxXAANykAGtCACYkRgWBQRCoSc4QikQg8Fj0GSlHs9tkZMd8mdEIZ3qYCJVGg12hpum8Hq0dJ4NJUdMEBXUrH98RNsESSWBIdCKYjcMjVeCpOCCBISFCAGZ65AEBVA1AgsGq+mw+GaqDUzFSOnQxlZA5HaEFDlcnnefT8npWYUuDm1HkaQIxkx2QZteVjAlK63E21qk4JACu6HQcFg5CZ3pZvvZRVMUae7SsnMG+n0xhFOkFBA0Vh0uiEQxqWiEph0yeiiuVmftADFUNgSDnwRQS5Iyyc-ZXqyV3vWak2RaZDAYfmH9F4Sv0dKZh4CCPP0HqnYlGFxqIsVmsNjtF4dl2zQOcShoCDrcodGMRsxTDDQRXaPQGkCbxTCsXQhm6S8CTkSFcFgdBwWwCR1UdJEUTRIhXVxC0UwmdDUEw7DcPwyktRdWl7U9fYl1yFcKzFfdj1MODGn8H5TA7EVin0MoEL3UCAmMXowgif4KMIKiaJwvDyQIrVyB1PUDSNORTXBc1LQIFSsLU+inSYt0WNET8fU4383ACAwJX4sChJEiMEC+MpvCEBofEMRoalQyiMPMuiTinGc5wXL12NZU4nIQBC9F6YpzECN4nnsFtvh5Lse2y4rj10cIFNwKQIDgFRLWZDifzURAAForBFNqylsbqeu6-wwtiKYGqS1dtAA-pig0Qwe2MWbHG8rsAKMBDbF0TlakbAbCXTFUsyUDUkWG8sUq6LRuVMC6xNjWbAh7EUqiEAh+PMC7eymra0xtUloVzfNCyOxzmqKQUtAIM64Mqb5jxA5sFt0MG1vsGMzr3YIPrHb7ounWd5wBprzhBsG+LMeoq0FWbRLaJ6QYuyVDFqH4tpvO9DtLRrkqB07zsu+nruMW6tCg0Cnr4mwLHaALtC2szaPU-bNKgPGOcKHcFrFHlbk7axKirIcFJMmWLKx2LcbZkaKy0QJxNjbQSkGcp-HahbGwIMVBzsZHLcCQwKtCIA */
    tsTypes: {} as import("./machine.typegen").Typegen0,
    schema: {
      context: {} as StateContext,
      events: {} as StateEvents,
    },
    predictableActionArguments: true,
    id: "machine",
    initial: "idle",
    context: initialContext,
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
    actions,
    services,
  }
);
