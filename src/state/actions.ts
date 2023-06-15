import { assign } from "xstate";
import { StateEvents, StateContext } from "./machine";

export const actions = {
  initialize: assign<StateContext, StateEvents>({
    message: "",
    prompt: (context, event) =>
      event.params ? event.params.prompt : context.prompt,
  }),
  startImageGenerationLoading: assign<StateContext, StateEvents>({
    prompt: (context, event) =>
      event.params ? event.params.prompt : context.prompt,
    message: "requesting image generation",
  }),
  handleImageGenerationSuccess: assign<StateContext, StateEvents>({
    url: (_, event) => event.data.url,
    error: null,
    message: "image generation successful",
  }),
  handleImageGenerationFailure: assign<StateContext, StateEvents>({
    url: "",
    error: (_, event) => event.data.error,
    message: "image generation failed",
  }),

  startChatCompletionLoading: assign<StateContext, StateEvents>({
    chat: (context, event) =>
      context.chat.concat({
        text: event.params ? event.params.prompt : context.prompt,
        source: "client",
        timestamp: new Date(),
      }),
    chatPrompt: (context, event) =>
      event.params ? event.params.prompt : context.prompt,

    message: "requesting chat response",
  }),
  handleChatCompletionSuccess: assign<StateContext, StateEvents>({
    chat: (context: StateContext, event: StateEvents) =>
      context.chat.concat({ text: event.data.text, timestamp: new Date() }),
    error: null,
    message: "chat response successful",
  }),
  handleChatCompletionFailure: assign<StateContext, StateEvents>({
    error: (_, event) => event.data.error,
    message: "chat response failed",
  }),

  handleFetchImage: assign<StateContext, StateEvents>({
    message: "fetching image",
  }),
  handleFetchImageSuccess: assign<StateContext, StateEvents>({
    error: null,
    message: "image fetching succesful",
  }),
  handleFetchImageFailure: assign<StateContext, StateEvents>({
    error: "failed to retrieve image from url",
    message: "image fetching failed",
  }),
  handleRecording: assign<StateContext, StateEvents>({
    message: "start recording",
  }),
  startTranscriptionLoading: assign<StateContext, StateEvents>({
    prompt: (_, event) => event.params.prompt,
    isChat: (_, event) => event.params.isChat ?? false,
    message: "requesting transcription",
  }),
  handleTranscriptionSuccess: assign<StateContext, StateEvents>({
    prompt: (_, event) => event.data.text,
    message: "transcription successful",
  }),
  handleTranscriptionFailure: assign<StateContext, StateEvents>({
    prompt: "",
    message: "transcription failure",
  }),

  startVoiceSynthesisLoading: assign<StateContext, StateEvents>({
    prompt: (_, event) => event.params.prompt,
    isChat: false,
    toVoice: true,
    voiceAvailable: false,
    message: "voice synthesis loading",
  }),
  handleVoiceSynthesisSuccess: assign<StateContext, StateEvents>({
    toVoice: false,
    voiceAvailable: true,
    message: "voice synthesis successful",
  }),
  handleVoiceSynthesisFailure: assign<StateContext, StateEvents>({
    toVoice: false,
    voiceAvailable: false,
    message: "voice synthesis failure",
  }),
} as any;
