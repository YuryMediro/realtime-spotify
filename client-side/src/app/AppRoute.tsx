import { AdminPage } from "@/pages/AdminPage/AdminPage";
import { AlbumPage } from "@/pages/AlbumPage/AlbumPage";
import { AuthCallbackPage } from "@/pages/AuthCallbackPage/AuthCallbackPage";
import { ChatIdPage } from "@/pages/ChatPage/ChatIdPage";
import { ChatPage } from "@/pages/ChatPage/ChatPage";
import { HomePage } from "@/pages/HomePage/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { MadeForYouSongsPage } from "@/pages/SongsPage/MadeForYouSongsPage";
import { TrendingSongsPage } from "@/pages/SongsPage/TrendingSongsPage";
import { Layout } from "@/widgets/Layout/Layout";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";

export const AppRoute = () => {
  return (
    <Routes>
      <Route
        path={"/sso-callback"}
        element={
          <AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
          />
        }
      />
      <Route path={"/auth-callback"} element={<AuthCallbackPage />} />
      <Route path={"*"} element={<NotFoundPage />} />
      <Route path={"/admin"} element={<AdminPage />} />

      <Route element={<Layout />}>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/albums/:albumId"} element={<AlbumPage />} />
        <Route path={"/chat"} element={<ChatPage />} />
        <Route path={"/chat/:userId"} element={<ChatIdPage />} />
        <Route path={"/made-fo-you-songs"} element={<MadeForYouSongsPage />} />
        <Route path={"/trending-songs"} element={<TrendingSongsPage />} />
      </Route>
    </Routes>
  );
};
