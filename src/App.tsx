import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import { extendTheme } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import Companies from "@/modules/Companies";
import Campaigns from "@/modules/Campaigns";
import CampaignDetail from "@/modules/CampaignDetail";
import Home from "@/modules/Home";
import Login from "../src/modules/Auth/Login";
import Register from "../src/modules/Auth/Register";
import Footer from "@/components/Footer";

import "./App.css";
import "@/common/i18n/i18n";

const queryClient = new QueryClient();

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: any;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#278fff",
  },
};

const theme = extendTheme({ colors });

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaign/:id" element={<CampaignDetail />} />
          </Routes>
          <Footer></Footer>
        </QueryClientProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default App;
