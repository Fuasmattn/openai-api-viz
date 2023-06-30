import { StateValue } from "xstate";
import { CardContent } from "./Card";

const getDescriptionForState = (state: string): string => {
  switch (state) {
    case "idle":
      return "Keep track of the current application state. Can be played as many times as wanted.";
    default:
      return "";
  }
};

const getURLForState = (state: string): string => {
  switch (state) {
    case "idle":
      return "./idle.jpg";
    case "fetchImage":
      return "./fetchImage.jpg";
    case "chatCompletionLoading":
      return "./chatCompletionLoading.jpg";
    case "imageGenerationLoading":
      return "./generateImage.jpg";
    default:
      return "./recording.jpg";
  }
};

const getCostForState = (state: string): number => {
  switch (state) {
    case "idle":
      return 0;
    case "fetchImage":
      return 0;
    case "chatCompletionLoading":
      return 5;
    case "imageGenerationLoading":
      return 2;
    default:
      return 0;
  }
};

const getTitleForState = (state: string): string => {
  switch (state) {
    case "idle":
      return "Waiting for Action";
    case "fetchImage":
      return "Fetch Image";
    case "chatCompletionLoading":
      return "Request Answer from AI";
    case "imageGenerationLoading":
      return "Generate Image";
    default:
      return "Default";
  }
};

const idleCard: CardContent = {
  title: getTitleForState("idle"),
  description: getDescriptionForState("idle"),
  url: "./idle.jpg",
  cost: 0,
  played: true,
};

export const createCardForState = (state?: StateValue): CardContent => {
  if (!state) {
    return idleCard;
  }
  return {
    title: getTitleForState(state.toString()),
    description: getDescriptionForState(state.toString()),
    url: getURLForState(state.toString()),
    cost: getCostForState(state.toString()),
    played: false,
  };
};
