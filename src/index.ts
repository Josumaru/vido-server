import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { geminiPro } from '@genkit-ai/googleai';
import * as z from 'zod';
import { googleAI } from '@genkit-ai/googleai';
import googleCloud from '@genkit-ai/google-cloud';

configureGenkit({
  plugins: [
    googleAI(),
    googleCloud(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
  telemetry: {
    instrumentation: 'googleCloud',
    logger: 'googleCloud',
  },
});

export const assistantFlow = defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `you are not doctor but you can suggest an medicine for the ${subject} disease`,
      model: geminiPro,
      config: {
        temperature: 1,
      },
      output: {
        format:"text"
      }
    });

    return llmResponse.text();
  }
);

startFlowsServer();
