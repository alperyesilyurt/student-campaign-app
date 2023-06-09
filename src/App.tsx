import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";

import { store } from "@/store/store";
import { Provider } from "react-redux";

import { NavigationRoutes } from "./NavigationRoutes";
import ErrorFallback from "@/components/ErrorFallback";
import "./App.css";
import "@/common/i18n/i18n";
import theme from "@/common/theme/theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <NavigationRoutes />
          </QueryClientProvider>
        </ChakraProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
