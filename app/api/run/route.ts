import { NextRequest, NextResponse } from "next/server";
import { Parser, Interpreter } from "@kin-lang/kin";
import { createWebEnv } from "@/lib/runtime";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, input } = body;

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const inputQueue = input ? input.split("\n") : [];
    const outputList: string[] = [];

    const env = createWebEnv(inputQueue, outputList);
    const parser = new Parser();

    try {
      const program = parser.produceAST(code);
      const result = Interpreter.evaluate(program, env);

      let resultString = "";
      if (result.type !== "null") {
        resultString = (result as any).value?.toString() ?? result.type;
      }

      return NextResponse.json({
        output: outputList,
        result: resultString,
      });
    } catch (runtimeError: any) {
      return NextResponse.json(
        {
          output: outputList,
          error: runtimeError.message || "Unknown Runtime Error",
        },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error: " + err.message },
      { status: 500 }
    );
  }
}
