import { assign } from "xstate";
import { StateEvents, StateContext } from "./machine";

export const actions = {
  initialize: assign<StateContext, StateEvents>({
    message: "",
    prompt: (StateContext, event) =>
      event.params ? event.params.prompt : StateContext.prompt,
  }),
  startImageGenerationLoading: assign<StateContext, StateEvents>({
    prompt: (StateContext, event) =>
      event.params ? event.params.prompt : StateContext.prompt,
    message: "requesting image generation",
  }),
  handleImageGenerationSuccess: assign<StateContext, StateEvents>({
    url: (_, event) => event.data.url,
    error: null,
    message: "image generation successful",
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
  handleImageGenerationFailure: assign<StateContext, StateEvents>({
    url: "",
    error: (_, event) => event.data.error,
    message: "image generation failed",
  }),
  handleRecording: assign<StateContext, StateEvents>({
    message: "start recording",
  }),
  startTranscriptionLoading: assign<StateContext, StateEvents>({
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
} as any;
