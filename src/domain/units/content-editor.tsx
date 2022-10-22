import * as React from "react"
import { Flex, Box, Text, Button } from "@chakra-ui/react"
import Editor, { Monaco } from "@monaco-editor/react"
import type { editor } from "monaco-editor"

import { useEditUnit } from "@/api/hooks"

import { EDITOR_THEME } from "./editor-theme"

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

  function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.defineTheme("dracula", EDITOR_THEME)
  }

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco) {
    monacoRef.current = editor
  }

  const onSubmit = () => {
    if (monacoRef.current) {
      mutation.mutate({ unitId, structure: monacoRef.current.getValue() })
    }
  }

  return (
    <Flex w="full" h="full" flexDir="column" border="1px">
      <Box w="full" flex="none" h="40px" borderBottom="1px">
        <Button variant="unstyled" h="100%" size="sm" onClick={onSubmit} borderRight="1px" rounded="none">
          <Text px={4}>Save</Text>
        </Button>
      </Box>
      <Box flex="auto" h="100%">
        <Editor
          theme="dracula"
          defaultLanguage="markdown"
          defaultValue={defaultValue}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            readOnly: false,
            minimap: {
              enabled: false,
            },
          }}
        />
      </Box>
    </Flex>
  )
}

export default React.memo(UnitContentEditor)
