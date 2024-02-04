"use client"

import { EditorOptions } from '@/app/utils/types'
import Editor from '@monaco-editor/react'
import { Spinner } from 'flowbite-react'
import { FC } from 'react'

interface EditorProps extends EditorOptions{}

const KinEditor: FC<EditorProps> = ({height, width, defaultLanguage, theme, defaultValue}) => {
  return (
    <Editor loading={<Spinner size={'xl'} />} defaultLanguage='javascript'  height={"100vh"} theme='vs-dark' />
  )
}

export default KinEditor