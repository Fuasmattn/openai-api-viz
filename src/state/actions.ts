import { assign } from "xstate";
import { StateEvents, StateContext } from "./machine";

export const actions = {
  initialize: assign<StateContext, StateEvents>({
    prompt: (StateContext, event) =>
      event.params ? event.params.prompt : StateContext.prompt,
  }) as any,
  startImageGenerationLoading: assign<StateContext, StateEvents>({
    prompt: (StateContext, event) =>
      event.params ? event.params.prompt : StateContext.prompt,
    message: "requesting image generation",
  }) as any,
  handleImageGenerationSuccess: assign<StateContext, StateEvents>({
    url: (_, event) => event.data.url,
    error: null,
    message: "image generation successful",
  }) as any,
  handleImageGenerationFailure: assign<StateContext, StateEvents>({
    url: "",
    error: (_, event) => event.data.error,
    message: "image generation failed",
  }) as any,
  handleRecording: assign<StateContext, StateEvents>({
    message: "start recording",
  }) as any,
  startTranscriptionLoading: assign<StateContext, StateEvents>({
    message: "requesting transcription",
  }) as any,
  handleTranscriptionSuccess: assign<StateContext, StateEvents>({
    prompt: (_, event) => event.data.text,
    message: "transcription successful",
  }) as any,
  handleTranscriptionFailure: assign<StateContext, StateEvents>({
    prompt: "",
    message: "transcription failure",
  }) as any,
};
