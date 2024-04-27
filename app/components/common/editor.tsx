"use client"

import { EditorOptions } from '@/app/utils/types'
import { KinContext } from '@/components/kin.provider'
import Editor from '@monaco-editor/react'
import { Spinner } from 'flowbite-react'
import { useTheme } from 'next-themes'
import { FC, useContext, useEffect } from 'react'

interface EditorProps extends EditorOptions{
  defaultValue: string
}

const KinEditor: FC<EditorProps> = ({theme, defaultValue}) => {

  const context = useContext(KinContext)
  const {updateEditorValue} = context!

  const {theme: _theme} = useTheme()
  
  useEffect(()=>{

    if(!_theme){
      return
    }
    
  }, [_theme])

  const handleEditorChange = (value: string | undefined)=>{
    updateEditorValue(value ?? "")
  }
  
  return (
    <Editor onChange={handleEditorChange} value={defaultValue} loading={<Spinner size={'xl'} />} defaultValue={defaultValue} defaultLanguage='javascript'  height={"100vh"} theme={_theme == "light"? "light": "vs-dark"} />
  )
}

export default KinEditor