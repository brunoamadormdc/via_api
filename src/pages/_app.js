import Layout from "@/components/Layout/Layout"
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    viaLeoes: "#004840",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </ChakraProvider>
  )
}
