import * as React from "react"
import { Button } from "@chakra-ui/react"
import Editor, { Monaco } from "@monaco-editor/react"
import type { editor } from "monaco-editor"

import { useEditUnit } from "@/api/hooks"

const DEFAULT_TEMPLATE = `
your article content here...
`

type UnitContentEditorProps = {
  unitId: string
  defaultValue?: string
}

const UnitContentEditor: React.FC<UnitContentEditorProps> = ({ unitId, defaultValue = DEFAULT_TEMPLATE }) => {
  const mutation = useEditUnit()
  const monacoRef = React.useRef<editor.IStandaloneCodeEditor | null>(null)

  function handleEditorWillMount(monaco: Monaco) {}

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco) {
    monacoRef.current = editor
  }

  const onSubmit = () => {
    if (monacoRef.current) {
      mutation.mutate({ unitId, structure: monacoRef.current.getValue() })
    }
  }

  return (
    <>
      <Button onClick={onSubmit}>Edit Content</Button>
      <Editor
        height="90vh"
        defaultLanguage="markdown"
        defaultValue={defaultValue}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
      />
    </>
  )
}

export default React.memo(UnitContentEditor)
