import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { HistoryPage } from "./pages/HistoryPage";
import { HomePage } from "./pages/HomePage";
import { MapPage } from "./pages/MapPage";
import { CrimeDataPage } from "./pages/CrimeDataPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PostCodeProvider } from "./context/PostcodeHistoryContext";
import { RootLayout } from "./layout/RootLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="history" element={<HistoryPage />} />
      <Route path="crime-data/:postcodes" element={<CrimeDataPage />} />
      <Route path="map/:postcodes" element={<MapPage />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Route>
  )
);
function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <PostCodeProvider>
          <RouterProvider router={router} />
        </PostCodeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
