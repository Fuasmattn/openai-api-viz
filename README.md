This project is created to have a showcase of the usage of OpenAi APIs in the web along live visualization of the high-level process.

## Getting Started

Create a `.env.local` file based on `.env.example` to provide your OpenAi environment variables for accessing the API.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3003](http://localhost:3003) with your browser to see the result.

> 💡 For autogeneration of state machine typings and visual editing and inspection of machine you can use the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=statelyai.stately-vscode).

## Current State

### AI Tooling Showcase

- [x] text to text (chat)
- [x] text to image
- [x] speech to image
- [x] speech to text
- [ ] speech to speech (whisper)
- [ ] speech to speech (other)
- [ ] speech to speech (browser API)
- [ ] eval open source models (whisper)
- [ ] text/speech to video
- [ ] text/speech to 3D model

### Visualization

- [x] XState Inspector
- [ ] Visualization of state machine with costs/privacy events on relevant transitions
- [ ] throttled transitions for demo

### Findings

- [ ] report pricing research findings
- [ ] report privacy research findings

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
