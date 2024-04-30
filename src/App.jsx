// libs
import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./services/queryClinet";

// Global CSS
import GlobalStyles from "./styles/GlobalStyles";

import { DarkModeProvider } from "./context/DarkModeContext";
import { wait } from "./utils/helpers";

// pages
import AppLayout from "./ui/AppLayout";
const Dashboard = lazy(() => wait(150).then(() => import("./pages/Dashboard")));
const Bookings = lazy(() => wait(150).then(() => import("./pages/Bookings")));
const Cabins = lazy(() => wait(150).then(() => import("./pages/Cabins")));
const Users = lazy(() => wait(150).then(() => import("./pages/Users")));
const Settings = lazy(() => wait(150).then(() => import("./pages/Settings")));
const Account = lazy(() => wait(150).then(() => import("./pages/Account")));
const Login = lazy(() => wait(150).then(() => import("./pages/Login")));
const PageNotFound = lazy(() => wait(150).then(() => import("./pages/PageNotFound")));
const Booking = lazy(() => wait(150).then(() => import("./pages/Booking")));
const Checkin = lazy(() => wait(150).then(() => import("./pages/Checkin")));
import ProtectedRoute from "./ui/ProtectedRoute";

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to={"dashboard"} />} />

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:id" element={<Booking />} />
              <Route path="checkin/:id" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
