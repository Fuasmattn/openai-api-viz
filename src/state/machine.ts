import { createMachine } from "xstate";
import { PromptHistoryItem } from "../components/PromptHistory";
import { actions } from "./actions";
import { services } from "./services";

export enum StateEventTypes {
  UPDATE_PROMPT = "UPDATE_PROMPT",
  SUBMIT = "SUBMIT",
  START_RECORDING = "START_RECORDING",
  STOP_RECORDING = "STOP_RECORDING",
  SUBMIT_COMPLETION = "SUBMIT_COMPLETION",
  START_VOICE_SYNTHESIS = "START_VOICE_SYNTHESIS",
  FETCH_IMAGE_SUCCESS = "FETCH_IMAGE_SUCCESS",
  FETCH_IMAGE_FAILURE = "FETCH_IMAGE_FAILURE",
}

type ChatMessageSource = "client";

export interface ChatMessage {
  text: string;
  source?: ChatMessageSource;
  timestamp: Date;
}

export interface StateContext {
  url: string;
  prompt: string;
  chatPrompt: string;
  chat: ChatMessage[];
  // TODO:
  isChat: boolean;
  toVoice: boolean;
  voiceAvailable: boolean;

  message: string;
  error: string | null;
  urlList: PromptHistoryItem[];
}

const initialContext: StateContext = {
  url: "/cyberpunk.jpg",
  prompt: "",
  chatPrompt: "",
  message: "",
  isChat: false,
  toVoice: false,
  voiceAvailable: false,
  chat: [],
  error: null,
  urlList: [
    {
      url: "/cyberpunk.jpg",
      prompt: "cyberpunk city at night, cinematic",
    },
  ],
};

// TODO: improve types
export type StateEvents =
  // | { type: "" }
  | { type: ""; params?: any; data?: any }
  | { type: StateEventTypes.SUBMIT; params?: any; data?: any }
  | { type: StateEventTypes.UPDATE_PROMPT; params?: any; data?: any }
  | { type: StateEventTypes.SUBMIT_COMPLETION; params?: any; data?: any }
  | { type: StateEventTypes.START_VOICE_SYNTHESIS; params?: any; data?: any }
  | { type: StateEventTypes.START_RECORDING; params?: any; data?: any }
  | { type: StateEventTypes.STOP_RECORDING; params?: any; data?: any }
  | { type: StateEventTypes.FETCH_IMAGE_SUCCESS; params?: any; data?: any }
  | { type: StateEventTypes.FETCH_IMAGE_FAILURE; params?: any; data?: any };

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDpsIAbMAYgFUAFAEQEEAVAUQH1qAlAeQFlrGA2gAYAuolAAHAPaxsAF2xTc4kAA9EATgDsQggEYATABYNANj2mtWgMwaDAVgA0IAJ6Ij1gwXtD7n08YGQgAc1gC+Yc5oWHiExGTkAMqUAEI8AJKCoirSsgpKKuoIehbBBFoaQtZCllr2NsFGzm4ItkblwfZG9n7WwVrBARFRGDj4RKQUiYz0HIysHMwAwlwctOkAcgDiwmJIILnyisr7RSWmZRVVNVb1fU2uiHrWegTafhbn9sElwyDRYziaBgWzA+AATqh8rgADJSVAQPBQcgQJRxXAANykAGtCADYkRgWBQRCocc4QikQg8Fj0GSlLtdjkZEcCqcnqYNPZvEY9PU9BoNJ4hQZmohrFovKYjJYfl0LFpTEq-vjxtgiSSwJDoRTEbhkVrwVJwQQJCQoQAzY3IAiqoGoEFgrX02HwvVQamYqR06GM7L7Q7Qwocrk8vlaAUikVihAGTwEXw-DQmTxGH56LQq0YE9UO4lO7XHRIAV3Q6DgsHITIDLKD7OKgy0BAMBgG2iMQj0jS5MbqryVpiEOnsSsMwWCWZiao1BZdADFUNgSMXwRRq5Ja8dgw3LM3W8nggYM5zpTHPNy+Z0jB3pf0hEZJ4CCBawHIsOkieQ58xGEsABKsOkPD0FsbDJEsSzMIkiTrgcm5sqARTWLyBAmIMwQaCUoRGAYGgxj4rzJgYwRVPYBjSlUBiPgSL5vpgH55l+P7-oBwGgawc70OkMKUIssGBlu9bIa8aEXJhXbIbhMaDk2OHdH0ZFDloMrUeMtHvkSJZlhWVb+hueSCYhiDjrovjWMhgr9AMkr4VUqEeLylQ2PUliqYQ6n0USC5Liua56XBBkIWoxkkQmvQmBoVn9KKjwIIOZR2PYfI3hUaZ6G5BCrugxrukkjBcNQCzLKs6zbPx8EnEZxTHgQnjET044DOYMY-KhnTKVyDkSpyGVyJCuCwOg4LYBIOpukiKJokQXq4ra2bjH1qADUNI1jZS+qerSLp+ns+mspVwWtChokYVhkl4bFcYiXoRh1BhtjdaYvX9YNw2jeS436uQhrGqa5pyFa4I2naBCLctb1re6m3ettojlYFB1IcdkViWdOEXS0EoXj0tQOMYIRmM9S2vatxzecuq66btAX7duJlheZEVRTZsW2E2ZilC20rWH4mZ-LgUgQHAKh2syCPbgAtKYMZSwmQjywrisK3zIxTnEkxi7T9baKY9nmUIZjjkEoQxmm7MHnYcpc9YT2RP8832o6pKQ0imt1lVzx1AQg5CEEN2WIKhhnrYtUDJ4tw3rY9gZbmTvOtCWnlrA8A1uL9YCgEzaCj0gpDtUfK9iUzY44K1SHo0D52yDsf5s7ZOLhTYBu4Zh0Z14uFcvYuc2J2TiXY05RpZKJE6ORGUeQxMDN0FRSDOU1nGyR8uVDFLQ6E297jmjkXmePr4aXmicVtPiOIN8ZQ-KYNvIbyFSYabAxvDKEZCuGGFUVXDvPvvnl5uTvkn23F3fs3RngG0MJyVs+EB44UaF0F4nZBy21Vk+LKOVXapy1h7LG3t5Z+2foHVemhuQjhHAbG8lQyJE3BqTJQuoMF7XdodHCwdXjIRsNUFM5lzDUJJu9JQ-9VyAPrOfAgl9r7XgzIHM8NhUK3kPGJSU3QIgRCAA */
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
          START_VOICE_SYNTHESIS: { target: "voiceSynthesisLoading" },
          SUBMIT_COMPLETION: { target: "chatCompletionLoading" },
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
        always: "fetchImage",
      },

      imageGenerationFailure: {
        entry: "handleImageGenerationFailure",
        always: "idle",
      },

      chatCompletionLoading: {
        entry: "startChatCompletionLoading",

        invoke: {
          src: "completion",
          onDone: {
            target: "chatCompletionSuccess",
          },
          onError: {
            target: "chatCompletionFailure",
            actions: "handleChatCompletionFailure",
          },
        },
      },

      chatCompletionSuccess: {
        entry: "handleChatCompletionSuccess",
        always: "idle",
      },

      chatCompletionFailure: {
        entry: "handleChatCompletionFailure",
        always: "idle",
      },

      fetchImage: {
        entry: "handleFetchImage",
        on: {
          FETCH_IMAGE_SUCCESS: {
            target: "fetchImageSuccess",
          },
          FETCH_IMAGE_FAILURE: {
            target: "fetchImageFailure",
          },
        },
      },
      fetchImageSuccess: {
        entry: "handleFetchImageSuccess",
        always: "idle",
      },
      fetchImageFailure: {
        entry: "handleFetchImageFailure",
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
      transcriptionSuccess: {
        always: [
          {
            cond: (context: StateContext, event: StateEvents) => context.isChat,
            target: "chatCompletionLoading",
          },
          {
            cond: (context: StateContext, event: StateEvents) =>
              !context.isChat && context.toVoice,
            target: "voiceSynthesisLoading",
          },
          {
            target: "imageGenerationLoading",
          },
        ],
      },
      transcriptionFailure: {
        entry: "handleTranscriptionFailure",
        always: "idle",
      },
      transcriptionLoading: {
        entry: "startTranscriptionLoading",
        invoke: {
          src: "transcribeRecording",
          onDone: {
            target: "transcriptionSuccess",
            actions: "handleTranscriptionSuccess",
          },
          onError: {
            target: "transcriptionFailure",
            actions: "handleTranscriptionFailure",
          },
        },
      },

      voiceSynthesisLoading: {
        entry: "startVoiceSynthesisLoading",
        invoke: {
          src: "voiceSynthesis",
          onDone: {
            target: "voiceSynthesisSuccess",
            actions: "handleVoiceSynthesisSuccess",
          },
          onError: {
            target: "voiceSynthesisFailure",
            actions: "handleVoiceSynthesisFailure",
          },
        },
      },

      voiceSynthesisFailure: {
        entry: "handleVoiceSynthesisFailure",
        always: "idle",
      },

      voiceSynthesisSuccess: {
        entry: "handleVoiceSynthesisSuccess",
        always: "idle",
      },
    },
  },
  {
    actions,
    services,
  }
);
