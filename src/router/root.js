import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>

// Lazy 로딩할 페이지 컴포넌트 정의
const Main = lazy(() => import("../pages/Main"));
const Home = lazy(() => import("../pages/Home"));
const PostPage = lazy(() => import("../pages/PostPage"));
const SocialPage = lazy(() => import("../pages/SocialPage"));
const PlaylistDetail = lazy(() => import("../components/playlist/PlaylistDetail"));
const PlaylistPage = lazy(() => import("../pages/PlaylistPage"));
const PlaylistCreatePage = lazy(() => import("../pages/PlaylistCreatePage"));
const PlusMusic = lazy(() => import("../components/playlist/PlusMusic"));
const UserReport = lazy(() => import("../components/social/UserReport"));
const OAuthCallback = lazy(() => import("../components/auth/OAuthCallback"));
const Streaming = lazy(() => import("../components/social/Streaming"));
const Challenge = lazy(() => import("../components/social/Challenge"));
const FriendsList = lazy(() => import("../components/social/FriendsList"));
const Quiz = lazy(() => import("../components/social/Quiz"));
const CustomerSupport = lazy(() => import("../components/social/CustomerSupport"));
const QuizSOLOPlay = lazy(() => import("../components/social/QuizSOLOPlay"));
const QuizMULTIPlay = lazy(() => import("../components/social/QuizMULTIPlay"));
const ChallengeSOLOPlay = lazy(() => import("../components/social/ChallengeSOLOPlay"));
const ChallengeMULTIPlay = lazy(() => import("../components/social/ChallengeMULTIPlay"));
const ChatRoom = lazy(() => import("../components/social/ChatRoom"));
const AdminMain = lazy(() => import("../pages/AdminPage"));

const root = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Suspense fallback={Loading}><Main /></Suspense>}>
            <Route index element={<Suspense fallback={Loading}><Home /></Suspense>} />
            <Route path="post" element={<Suspense fallback={Loading}><PostPage /></Suspense>} />
            <Route path="social" element={<Suspense fallback={Loading}><SocialPage /></Suspense>} />
            <Route path="streaming" element={<Suspense fallback={Loading}><Streaming /></Suspense>} />
            <Route path="challenge" element={<Suspense fallback={Loading}><Challenge /></Suspense>} />
            <Route path="friendslist" element={<Suspense fallback={Loading}><FriendsList /></Suspense>} />
            <Route path="quiz" element={<Suspense fallback={Loading}><Quiz /></Suspense>} />
            <Route path="userreport" element={<Suspense fallback={Loading}><UserReport /></Suspense>} />
            <Route path="customersupport" element={<Suspense fallback={Loading}><CustomerSupport /></Suspense>} />
            <Route path="chat/:streamId" element={<Suspense fallback={Loading}><ChatRoom /></Suspense>} />
            <Route path="createplaylist" element={<Suspense fallback={Loading}><PlaylistCreatePage /></Suspense>} />
            <Route path="PlusMusic" element={<Suspense fallback={Loading}><PlusMusic /></Suspense>} />
            <Route path="playlist/:playlistId" element={<Suspense fallback={Loading}><PlaylistDetail key={window.location.pathname} /></Suspense>} />
            <Route path="PlaylistPage" element={<Suspense fallback={Loading}><PlaylistPage /></Suspense>} />
            <Route path="QuizSOLOPlay" element={<Suspense fallback={Loading}><QuizSOLOPlay /></Suspense>} />
            <Route path="QuizMULTIPlay" element={<Suspense fallback={Loading}><QuizMULTIPlay /></Suspense>} />
            <Route path="ChallengeSOLOPlay" element={<Suspense fallback={Loading}><ChallengeSOLOPlay /></Suspense>} />
            <Route path="ChallengeMULTIPlay" element={<Suspense fallback={Loading}><ChallengeMULTIPlay /></Suspense>} />
            <Route path="oauth-callback" element={<Suspense fallback={Loading}><OAuthCallback /></Suspense>} />
            <Route path="admin" element={<Suspense fallback={Loading}><AdminMain /></Suspense>} />
        </Route>
    )
);

export default root;