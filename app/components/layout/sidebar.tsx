"use client";
import { samplePrograms } from "@/app/utils/data";
import { Program } from "@/app/utils/types";
import { KinContext } from "@/components/kin.provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useContext, useState } from "react";

const SideBar = () => {
  const [selected, setSelected] = useState<Program | undefined>(undefined);

  const context = useContext(KinContext);

  const { editorValue, updateEditorValue } = context!;

  const changeSample = (value: string) => {
    const program = samplePrograms.find((program) => program.name === value);
    setSelected(program);
    updateEditorValue(program?.code ?? "");
  };

  return (
    <nav className="p-4">
      <div className="mt-4">
        <Select onValueChange={(e) => changeSample(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sample programs" />
          </SelectTrigger>
          <SelectContent>
            {samplePrograms.map((program, index) => (
              <SelectItem key={index} value={program.name}>
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
};

export default SideBar;
