import { StateContext, StateEvents } from "./machine";

export const services = {
  generateImage: (context: StateContext, event: any) => {
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
  transcribeRecording: (_: StateContext, event: StateEvents) => {
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
  completion: (context: StateContext, event: any) => {
    console.log("service chatCompletion", event, context);
    const prompt = event.params ? event.params.prompt : context.chatPrompt;
    return fetch("/api/completion", {
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
  voiceSynthesis: (context: StateContext, event: any) => {
    console.log("service voiceSynthesis", event, context);
    const input = event.params.prompt;
    return fetch("/api/speech", {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "content-type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },
};
