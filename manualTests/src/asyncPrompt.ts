import Prompt from "https://deno.land/x/prompt@v1.0.0/mod.ts";

export default async function asyncPrompt(message: string) {
  const result = await Prompt.prompts([{ type: "text", name: "msg", message }]);

  return (result.msg as string) ?? "";
}
