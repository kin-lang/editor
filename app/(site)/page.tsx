"use client";

import { useContext, useEffect } from "react";
import KinEditor from "../components/common/editor";
import NavBar from "../components/layout/navbar";
import SideBar from "../components/layout/sidebar";
import { EditorOptions } from "../utils/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { KinContext } from "@/components/kin.provider";
import { Button } from "@/components/ui/button";
import { Play, Eraser } from "lucide-react";

const defaultOptions: EditorOptions = {
  height: "100%",
  width: "100%",
  defaultLanguage: "javascript",
  theme: "vs-dark",
};

export default function Home() {
  const context = useContext(KinContext);

  const { editorValue } = context!;

  return (
    <main className="h-screen overflow-hidden">
      <NavBar />
      <ResizablePanelGroup
        className="bg-black/10 h-[calc(100vh-100px)]"
        direction="horizontal"
      >
        <ResizablePanel defaultSize={20} className="">
          <SideBar />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-white/70" />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} className="">
              <KinEditor {...defaultOptions} defaultValue={editorValue} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <div className="px-4 mt-3 pb-4 flex flex-row justify-end gap-8 mr-10">
                <Button
                  className="float-right flex items-center gap-2"
                  variant="secondary"
                >
                  <Eraser className="h-4 w-4" />
                  Clear
                </Button>
                <Button className="float-right flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Run
                </Button>
              </div>
              <div className="p-4">
                <span className="text-sm font-extralight">
                  the output will be shown here
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
