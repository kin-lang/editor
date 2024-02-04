import KinEditor from "../components/common/editor";
import { EditorOptions } from "../utils/types";

const defaultOptions:EditorOptions = {
  height: "100vh",
  width: "100vw",
  defaultLanguage: "javascript",
  theme: "vs-dark",
  defaultValue: ""
}

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <KinEditor {...defaultOptions} />
    </main>
  );
}
