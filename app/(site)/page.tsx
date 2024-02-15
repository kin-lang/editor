import KinEditor from "../components/common/editor";
import NavBar from "../components/layout/navbar";
import SideBar from "../components/layout/sidebar";
import { EditorOptions } from "../utils/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const defaultOptions:EditorOptions = {
  height: "100%",
  width: "100%",
  defaultLanguage: "javascript",
  theme: "vs-dark",
  defaultValue: "// ANDIKA CODE MU KINYARWADA"
}

export default function Home() {
  return (
    <main className="h-screen">
      <NavBar />
      <ResizablePanelGroup className="bg-black/10 h-[calc(100vh-80px)]" direction="horizontal">
        <ResizablePanel className="max-w-xs">
          <SideBar />
        </ResizablePanel>
        <ResizableHandle className="bg-white/70" />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel className="">
              <KinEditor {...defaultOptions} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="h-[100px]">
              OUT PUT
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
