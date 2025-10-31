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
import { SignInPage } from "@/pages/AuthPage/SignInPage";
import { SignUpPage } from "@/pages/AuthPage/SignUpPage";

export const AppRoute = () => {
  return (
    <Routes>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signUpForceRedirectUrl="/auth-callback"
            signInForceRedirectUrl="/auth-callback"
          />
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<PageLoader />}>
            <Protect fallback={<Navigate to="/sign-in" />}>
              <AdminPage />
            </Protect>
          </Suspense>
        }
      />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
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
              <Protect fallback={<Navigate to="/sign-in" />}>
                <ChatPage />
              </Protect>
            </Suspense>
          }
        />
        <Route
          path="/chat/:userId"
          element={
            <Suspense fallback={<PageLoader />}>
              <Protect fallback={<Navigate to="/sign-in" />}>
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
