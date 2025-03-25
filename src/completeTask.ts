import OpenAI from "openai";
import { type Page, TaskMessage, TaskResult } from "./types";
import { prompt } from "./prompt";
import { createActions } from "./createActions";

const defaultDebug = process.env.AUTO_PLAYWRIGHT_DEBUG === "true";

export const completeTask = async (
  page: Page,
  task: TaskMessage
): Promise<TaskResult> => {
  const openai = new OpenAI({
    apiKey: task.options?.openaiApiKey,
    baseURL: task.options?.openaiBaseUrl,
    defaultQuery: task.options?.openaiDefaultQuery,
    defaultHeaders: task.options?.openaiDefaultHeaders,
  });

  let lastFunctionResult: null | { query: string } = null;

  const actions = createActions(page);

  const debug = task.options?.debug ?? defaultDebug;

  const runner = openai.beta.chat.completions
    .runTools({
      model: task.options?.model ?? "gpt-4o",
      messages: [{ role: "user", content: prompt(task) }],
      tools: Object.values(actions).map((action) => ({
        type: "function",
        function: action,
      })),
    })
    .on("message", (message) => {
      if (debug) {
        console.log("> message", message);
      }

      if (
        message.role === "assistant" &&
        message.tool_calls &&
        message.tool_calls.length > 0 &&
        message.tool_calls[0].function.name === "resultQuery"
      ) {
        lastFunctionResult = JSON.parse(
          message.tool_calls[0].function.arguments
        );
      }
    });

  const finalContent = await runner.finalContent();

  if (debug) {
    console.log("> finalContent", finalContent);
  }

  // Only check for a result if the instruction suggests a query.
  if (task.instruction && task.instruction.toLowerCase().includes("get") && !lastFunctionResult) { // Added check
    throw new Error("Expected to have result");
  }

  if (debug) {
    console.log("> lastFunctionResult", lastFunctionResult);
  }

  return lastFunctionResult || { query: finalContent || undefined };
};