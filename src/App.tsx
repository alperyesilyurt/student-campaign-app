import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "./components/Navbar";
import "@/common/i18n/i18n";
import Signin from "@/modules/Auth";
import { useTranslation } from "react-i18next";
import Companies from "@/modules/Companies";
import Campaigns from "@/modules/Campaigns";
import Home from "@/modules/Home";
import Login from "../src/modules/Auth/Login";
import Register from "../src/modules/Auth/Register";

const queryClient = new QueryClient()

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
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
