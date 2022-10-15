import * as React from "react"
import { ThemeProvider } from "theme-ui"
import { SessionProvider } from "next-auth/react"
import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import type { Session } from "next-auth/index"

import { theme } from "@/theme"

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; dehydratedState: DehydratedState }>) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
