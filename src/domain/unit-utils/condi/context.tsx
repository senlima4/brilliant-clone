import * as React from "react"

export type CondiBlock = Record<string, boolean>

type CondiContextValue = {
  store: CondiBlock
  initCondi: (condiId: string) => void
  editCondi: (condiId: string, value: boolean) => void
}

const CondiContext = React.createContext<CondiContextValue>({
  store: {},
  initCondi: () => {},
  editCondi: () => {},
})

export const CondiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = React.useState<CondiBlock>({})

  const initCondi = React.useCallback((condiId: string) => {
    setStore((prevStore) => {
      return {
        ...prevStore,
        [condiId]: false,
      }
    })
  }, [])

  const editCondi = React.useCallback((condiId: string, value: boolean) => {
    setStore((prevStore) => {
      return {
        ...prevStore,
        [condiId]: value,
      }
    })
  }, [])

  const value = React.useMemo(() => ({ store, initCondi, editCondi }), [store, initCondi, editCondi])

  return <CondiContext.Provider value={value}>{children}</CondiContext.Provider>
}

export const useCondiContext = () => {
  const context = React.useContext(CondiContext)

  if (context === undefined) {
    throw new Error("useCondiContext must be used within a CondiProvider")
  }

  return context
}
