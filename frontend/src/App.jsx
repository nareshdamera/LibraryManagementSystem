import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import SignInForm from "./components/SignInForm";
import LoginForm from "./components/LoginForm";
import BookDetails from "./components/BooksDetails";

function App() {
  const location = useLocation();

  // Hide Header on /signin route only
  const hideHeaderPaths = ["/signin","/login"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/books/:bookId" element={<BookDetails />} />

      </Routes>
    </>
  );
}

export default App;
