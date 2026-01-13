"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Terminal,
  AlignLeft,
  BookOpen,
  Star,
  MessageSquareWarning,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface InputField {
  id: string; // generated unique id
  variable: string; // inferred variable name or "Input"
  prompt: string; // prompt text inside injiza_amakuru("...")
  value: string; // current user value
}

export default function Home() {
  const [code, setCode] = useState<string>(
    `reka x = injiza_amakuru("Andika x: ")
reka y = injiza_amakuru("Andika y: ")

tangaza_amakuru("Igiteranyo: ", x + y)`
  );

  // Structured inputs derived from code
  const [requiredInputs, setRequiredInputs] = useState<InputField[]>([]);

  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse code to find injiza_amakuru calls
  useEffect(() => {
    // Regex to match: optional(var = ) injiza_amakuru("prompt")
    const regex =
      /(?:(reka|ntahinduka)\s+([a-zA-Z_]\w*)\s*=\s*)?injiza_amakuru\s*\(\s*(?:"([^"]*)"|'([^']*)')\s*\)/g;

    let match;
    const newInputs: InputField[] = [];
    let index = 0;

    while ((match = regex.exec(code)) !== null) {
      const varName = match[2] || `Input ${index + 1}`;
      const promptText = match[3] || match[4] || "Enter value";

      const existing = requiredInputs.find((i) => i.id === `input-${index}`);

      newInputs.push({
        id: `input-${index}`,
        variable: varName,
        prompt: promptText,
        value: existing ? existing.value : "",
      });
      index++;
    }

    if (
      JSON.stringify(newInputs.map((i) => ({ ...i, value: "" }))) !==
      JSON.stringify(requiredInputs.map((i) => ({ ...i, value: "" })))
    ) {
      setRequiredInputs(newInputs);
    }
  }, [code]);

  const handleInputChange = (id: string, newValue: string) => {
    setRequiredInputs((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  const handleRun = async () => {
    const emptyFields = requiredInputs.filter((i) => !i.value.trim());
    if (emptyFields.length > 0) {
      setError(
        `Please provide values for: ${emptyFields
          .map((i) => i.variable)
          .join(", ")}`
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput([]);

    const inputString = requiredInputs.map((i) => i.value).join("\n");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, input: inputString }),
      });

      const data = await res.json();

      if (res.ok) {
        const safeOutput = Array.isArray(data.output) ? data.output : [];
        setOutput(safeOutput);
        if (data.error) setError(data.error);
      } else {
        setError(data.error || "Failed to run code");
      }
    } catch (err) {
      setError("Network error or server failed to respond.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen w-full bg-neutral-950 flex flex-col text-slate-100 font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-neutral-950">
        <div className="flex items-end gap-2 pb-1">
          <div className="relative h-6 w-6">
            <Image src="/logo.svg" alt="Kin Logo" fill />
          </div>
          <h1 className="font-bold text-lg leading-none tracking-tight text-white/90 hidden sm:block">
            Editor
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 text-sm font-medium text-zinc-500">
            <Link
              href="https://kinlang.dev/docs"
              target="_blank"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <BookOpen size={14} />
              <span className="hidden md:inline">Docs</span>
            </Link>
            <Link
              href="https://github.com/kin-lang/kin"
              target="_blank"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <Github size={14} />
              <span className="hidden md:inline">Star</span>
            </Link>
            <Link
              href="https://github.com/kin-lang/editor/issues/new"
              target="_blank"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <MessageSquareWarning size={14} />
              <span className="hidden md:inline">Report Issue</span>
            </Link>
          </nav>

          <div className="h-6 w-px bg-white/5" />

          <button
            onClick={handleRun}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-full font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-sm"
          >
            <Play size={14} fill="currentColor" />
            {isLoading ? "Running..." : "Run"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Editor Panel */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full w-full relative bg-neutral-950">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  fontFamily:
                    "JetBrains Mono, Menlo, Monaco, Courier New, monospace",
                  padding: { top: 24, bottom: 24 },
                  renderLineHighlight: "none",
                  contextmenu: false,
                }}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="bg-white/5 hover:bg-white/20 transition-colors w-1"
          />

          {/* Sidebar Panel */}
          <ResizablePanel
            defaultSize={40}
            minSize={20}
            className="bg-neutral-950"
          >
            <ResizablePanelGroup direction="vertical">
              {/* Output Section */}
              <ResizablePanel defaultSize={65} minSize={20}>
                <div className="h-full flex flex-col bg-neutral-950">
                  <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 text-zinc-500 select-none bg-neutral-950">
                    <Terminal size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Output
                    </span>
                  </div>
                  <div className="flex-1 p-4 font-mono text-sm overflow-auto text-zinc-300 custom-scrollbar">
                    {output.length === 0 && !error && (
                      <span className="text-zinc-700 italic">
                        // Output will ensure here...
                      </span>
                    )}
                    {output.map((line, i) => (
                      <div key={i} className="mb-px whitespace-pre-wrap">
                        <span className="text-zinc-500 mr-2 select-none">
                          $
                        </span>
                        {line}
                      </div>
                    ))}
                    {error && (
                      <div className="mt-4 p-3 bg-white/5 border border-red-500/20 rounded-md text-red-400 text-xs whitespace-pre-wrap font-mono">
                        <span className="text-red-500 font-bold block mb-1">
                          Error:
                        </span>{" "}
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle
                withHandle
                className="bg-white/5 hover:bg-white/20 transition-colors h-1"
              />

              {/* Structured Input Form */}
              <ResizablePanel defaultSize={35} minSize={10}>
                <div className="h-full flex flex-col bg-neutral-950">
                  <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 text-zinc-500 select-none bg-neutral-950">
                    <AlignLeft size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Inputs
                    </span>
                  </div>
                  <div className="flex-1 p-4 overflow-auto bg-neutral-950">
                    {requiredInputs.length === 0 ? (
                      <div className="text-zinc-700 italic text-sm text-center mt-8 px-8">
                        No inputs detected.
                        <br />
                        Use{" "}
                        <code className="text-white bg-white/10 px-1 py-0.5 rounded text-xs mx-1">
                          injiza_amakuru()
                        </code>{" "}
                        to request input.
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {requiredInputs.map((field) => (
                          <div
                            key={field.id}
                            className="flex flex-col gap-2 group"
                          >
                            <label className="text-xs font-medium text-zinc-400 flex justify-between items-end group-focus-within:text-white transition-colors">
                              <span>{field.prompt}</span>
                              <span className="text-zinc-600 font-mono text-[10px] bg-white/5 px-1.5 py-0.5 rounded">
                                {field.variable}
                              </span>
                            </label>
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) =>
                                handleInputChange(field.id, e.target.value)
                              }
                              className="w-full bg-neutral-900 border border-white/10 rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-neutral-800 transition-all placeholder:text-zinc-700 font-mono"
                              placeholder="..."
                              autoComplete="off"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
