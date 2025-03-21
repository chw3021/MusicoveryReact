import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
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

const root = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={Loading}>
          <Main />
        </Suspense>
      }
    >
      <Route
        index
        element={
          <Suspense fallback={Loading}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="post"
        element={
          <Suspense fallback={Loading}>
            <PostPage />
          </Suspense>
        }
      />
      <Route
        path="social"
        element={
          <Suspense fallback={Loading}>
            <PrivateRoute>
              <SocialPage />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="streaming"
        element={
          <Suspense fallback={Loading}>
            <PrivateRoute>
              <Streaming />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="challenge"
        element={
          <Suspense fallback={Loading}>
            <PrivateRoute>
              <Challenge />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="quiz"
        element={
          <Suspense fallback={Loading}>
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="songquiz"
        element={
          <Suspense fallback={Loading}>
            <PrivateRoute>
              <SongQuiz />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="userreport"
        element={
          <Suspense fallback={Loading}>
            <UserReport />
          </Suspense>
        }
      />
      <Route
        path="customersupport"
        element={
          <Suspense fallback={Loading}>
            <CustomerSupport />
          </Suspense>
        }
      />
      <Route
        path="chat/:streamId"
        element={
          <Suspense fallback={Loading}>
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="createplaylist"
        element={
          <Suspense fallback={Loading}>
            <PlaylistCreatePage />
          </Suspense>
        }
      />
      <Route
        path="PlusMusic"
        element={
          <Suspense fallback={Loading}>
            <PlusMusic />
          </Suspense>
        }
      />
      <Route
        path="playlist/:playlistId"
        element={
          <Suspense fallback={Loading}>
            <PlaylistDetail key={window.location.pathname} />
          </Suspense>
        }
      />
      <Route
        path="PlaylistPage"
        element={
          <Suspense fallback={Loading}>
            <PlaylistPage />
          </Suspense>
        }
      />
      <Route
        path="QuizSOLOPlay"
        element={
          <Suspense fallback={Loading}>
            <QuizSOLOPlay />
          </Suspense>
        }
      />
      <Route
        path="QuizMULTIPlay"
        element={
          <Suspense fallback={Loading}>
            <QuizMULTIPlay />
          </Suspense>
        }
      />
      <Route
        path="ChallengeSOLOPlay"
        element={
          <Suspense fallback={Loading}>
            <ChallengeSOLOPlay />
          </Suspense>
        }
      />
      <Route
        path="ChallengeMULTIPlay"
        element={
          <Suspense fallback={Loading}>
            <ChallengeMULTIPlay />
          </Suspense>
        }
      />
      <Route
        path="oauth-callback"
        element={
          <Suspense fallback={Loading}>
            <OAuthCallback />
          </Suspense>
        }
      />
      <Route
        path="admin"
        element={
          <Suspense fallback={Loading}>
            <AdminMain />
          </Suspense>
        }
      />

      <Route
        path="Signup"
        element={
          <Suspense fallback={Loading}>
            <SignupPage />
          </Suspense>
        }
      />

      <Route
        path="login"
        element={
          <Suspense fallback={Loading}>
            <LoginPage />
          </Suspense>
        }
      />

      <Route
        path="verify"
        element={
          <Suspense fallback={Loading}>
            <VerifyPage />
          </Suspense>
        }
      />

      <Route
        path="mypage"
        element={
          <Suspense fallback={Loading}>
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          </Suspense>
        }
      />
    </Route>
  )
);

export default root;
