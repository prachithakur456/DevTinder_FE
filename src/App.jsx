import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from './components/Profile';
import Connection from "./components/Connection";
import Request from "./components/Request";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" Component={() => <Feed />} />
          <Route path="/login" Component={() => <Login />} />
          <Route path="/profile" Component={() => <Profile />} />
          <Route path="/connections" Component={() => <Connection />} />
          <Route path="/request" Component={() => <Request />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
