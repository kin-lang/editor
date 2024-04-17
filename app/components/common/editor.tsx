"use client"

import { EditorOptions } from '@/app/utils/types'
import { KinContext } from '@/components/kin.provider'
import Editor from '@monaco-editor/react'
import { Spinner } from 'flowbite-react'
import { FC, useContext } from 'react'

interface EditorProps extends EditorOptions{
  defaultValue: string
}

const KinEditor: FC<EditorProps> = ({height, width, defaultLanguage, theme, defaultValue}) => {

  const contect = useContext(KinContext)
  const {updateEditorValue} = contect!
  const handleEditorChange = (value: string | undefined)=>{
    updateEditorValue(value ?? "")
  }
  
  return (
    <Editor onChange={handleEditorChange} value={defaultValue} loading={<Spinner size={'xl'} />} defaultValue={defaultValue} defaultLanguage='javascript'  height={"100vh"} theme={theme} />
  )
}

export default KinEditor