
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.machine.imageGenerationLoading:invocation[0]": { type: "done.invoke.machine.imageGenerationLoading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.machine.transcriptionLoading:invocation[0]": { type: "done.invoke.machine.transcriptionLoading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.machine.imageGenerationLoading:invocation[0]": { type: "error.platform.machine.imageGenerationLoading:invocation[0]"; data: unknown };
"error.platform.machine.transcriptionLoading:invocation[0]": { type: "error.platform.machine.transcriptionLoading:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "generateImage": "done.invoke.machine.imageGenerationLoading:invocation[0]";
"transcribeRecording": "done.invoke.machine.transcriptionLoading:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "handleImageGenerationFailure": "error.platform.machine.imageGenerationLoading:invocation[0]";
"handleImageGenerationSuccess": "done.invoke.machine.imageGenerationLoading:invocation[0]";
"handleRecording": "START_RECORDING";
"handleTranscriptionFailure": "error.platform.machine.transcriptionLoading:invocation[0]";
"handleTranscriptionSuccess": "done.invoke.machine.transcriptionLoading:invocation[0]";
"initialize": "RESET" | "UPDATE_PROMPT" | "xstate.init";
"startImageGenerationLoading": "SUBMIT" | "done.invoke.machine.transcriptionLoading:invocation[0]";
"startTranscriptionLoading": "STOP_RECORDING";
        };
        eventsCausingDelays: {

        };
        eventsCausingGuards: {

        };
        eventsCausingServices: {
          "generateImage": "SUBMIT" | "done.invoke.machine.transcriptionLoading:invocation[0]";
"transcribeRecording": "STOP_RECORDING";
        };
        matchesStates: "idle" | "imageGenerationFailure" | "imageGenerationLoading" | "imageGenerationSuccess" | "recording" | "transcriptionFailure" | "transcriptionLoading";
        tags: never;
      }
