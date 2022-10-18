import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import type { Session } from "next-auth/index"

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; dehydratedState: DehydratedState }>) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
