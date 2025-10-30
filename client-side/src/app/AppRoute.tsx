import { AuthCallbackPage } from "@/pages/AuthCallbackPage/AuthCallbackPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { Layout } from "@/widgets/Layout/Layout";
import { AuthenticateWithRedirectCallback, Protect } from "@clerk/clerk-react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AdminPage,
  AlbumPage,
  ChatIdPage,
  ChatPage,
  HomePage,
  MadeForYouSongsPage,
  PageLoader,
  TrendingSongsPage,
} from "./LazyRoute";
import { AuthPage } from "@/pages/AuthPage/AuthPage";

export const AppRoute = () => {
  return (
    <Routes>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<PageLoader />}>
            <AdminPage />
          </Suspense>
        }
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/albums/:albumId"
          element={
            <Suspense fallback={<PageLoader />}>
              <AlbumPage />
            </Suspense>
          }
        />
        <Route
          path="/chat"
          element={
            <Suspense fallback={<PageLoader />}>
              <Protect fallback={<Navigate to="/auth" />}>
                <ChatPage />
              </Protect>
            </Suspense>
          }
        />
        <Route
          path="/chat/:userId"
          element={
            <Suspense fallback={<PageLoader />}>
              <Protect fallback={<Navigate to="/auth" />}>
                <ChatIdPage />
              </Protect>
            </Suspense>
          }
        />
        <Route
          path="/made-fo-you-songs"
          element={
            <Suspense fallback={<PageLoader />}>
              <MadeForYouSongsPage />
            </Suspense>
          }
        />
        <Route
          path="/trending-songs"
          element={
            <Suspense fallback={<PageLoader />}>
              <TrendingSongsPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
