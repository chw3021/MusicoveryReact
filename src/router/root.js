import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import VerifyPage from "../pages/VerifyPage";
import MyPage from "../pages/MyPage";
import PrivateRoute from "../components/auth/PrivateRoute";

const Loading = <div>Loading...</div>;

// Lazy 로딩할 페이지 컴포넌트 정의
const Main = lazy(() => import("../pages/Main"));
const Home = lazy(() => import("../pages/Home"));
const PostPage = lazy(() => import("../pages/PostPage"));
const SocialPage = lazy(() => import("../pages/SocialPage"));
const PlaylistDetail = lazy(() =>
  import("../components/playlist/PlaylistDetail")
);
const PlaylistPage = lazy(() => import("../pages/PlaylistPage"));
const PlaylistCreatePage = lazy(() => import("../pages/PlaylistCreatePage"));
const PlusMusic = lazy(() => import("../components/playlist/PlusMusic"));
const UserReport = lazy(() => import("../components/social/UserReport"));
const OAuthCallback = lazy(() => import("../components/auth/OAuthCallback"));
const Streaming = lazy(() => import("../components/social/Streaming"));
const Challenge = lazy(() => import("../components/social/Challenge"));
const Quiz = lazy(() => import("../components/social/Quiz"));
const SongQuiz = lazy(() => import("../components/social/SongQuiz"));
const CustomerSupport = lazy(() =>
  import("../components/social/CustomerSupport")
);
const QuizSOLOPlay = lazy(() => import("../components/social/QuizSOLOPlay"));
const QuizMULTIPlay = lazy(() => import("../components/social/QuizMULTIPlay"));
const ChallengeSOLOPlay = lazy(() =>
  import("../components/social/ChallengeSOLOPlay")
);
const ChallengeMULTIPlay = lazy(() =>
  import("../components/social/ChallengeMULTIPlay")
);
const ChatRoom = lazy(() => import("../components/social/ChatRoom"));
const AdminMain = lazy(() => import("../pages/AdminPage"));
// const SpotifyLoginPage = lazy(() => import("../pages/SpotifyLoginPage"));

function RootRoutes() {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="post" element={<PostPage />} />
          <Route
            path="social"
            element={
              <PrivateRoute>
                <SocialPage />
              </PrivateRoute>
            }
          />
          {/* ... 다른 라우트들도 동일한 패턴으로 ... */}
          <Route path="streaming" element={
            <PrivateRoute>
              <Streaming />
            </PrivateRoute>
          } />
          <Route path="challenge" element={
            <PrivateRoute>
              <Challenge />
            </PrivateRoute>
          } />
          <Route path="quiz" element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          } />
          <Route path="songquiz" element={
            <PrivateRoute>
              <SongQuiz />
            </PrivateRoute>
          } />
          <Route path="userreport" element={<UserReport />} />
          <Route path="customersupport" element={<CustomerSupport />} />
          <Route path="chat/:streamId" element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          } />
          <Route path="createplaylist" element={<PlaylistCreatePage />} />
          <Route path="PlusMusic" element={<PlusMusic />} />
          <Route path="playlist/:playlistId" element={
            <PlaylistDetail key={window.location.pathname} />
          } />
          <Route path="PlaylistPage" element={<PlaylistPage />} />
          <Route path="QuizSOLOPlay" element={<QuizSOLOPlay />} />
          <Route path="QuizMULTIPlay" element={<QuizMULTIPlay />} />
          <Route path="ChallengeSOLOPlay" element={<ChallengeSOLOPlay />} />
          <Route path="ChallengeMULTIPlay" element={<ChallengeMULTIPlay />} />
          <Route path="oauth-callback" element={<OAuthCallback />} />
          <Route path="admin" element={<AdminMain />} />
          <Route path="Signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="verify" element={<VerifyPage />} />
          <Route path="mypage" element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default RootRoutes;