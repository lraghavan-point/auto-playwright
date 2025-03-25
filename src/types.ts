import { type TestType } from "@playwright/test";

export { type Page } from "@playwright/test";

export type Test = TestType<any, any>;

export type StepOptions = {
  debug?: boolean;
  model?: string;
  openaiApiKey?: string;
  openaiBaseUrl?: string;
  openaiDefaultQuery?: {};
  openaiDefaultHeaders?: {};
  instruction?: string;
};

export type TaskMessage = {
  task: string;
  snapshot: {
    dom: string;
  };
  options?: StepOptions;
  instruction?: string;
};

export type TaskResult = {
  assertion?: boolean;
  query?: string;
  errorMessage?: string;
  success?: boolean; // Add success
  error?: string; // Add error
};