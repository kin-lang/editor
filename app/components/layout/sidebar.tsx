"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from "react"

const SideBar = () => {

  const [selected, setSelected] = useState("helloWorld")

  return (
    <nav className="p-4">
      <div className="mt-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sample programs" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem onClick={()=>setSelected("helloworld")} value="helloWorld">Hello world</SelectItem>
            <SelectItem onClick={()=>setSelected("ifelse")} value="ifelse">If - Else</SelectItem>
            <SelectItem onClick={()=>setSelected("loops")} value="loops">Loops</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </nav>
  )
}

export default SideBar