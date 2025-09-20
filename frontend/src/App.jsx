import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import SignInForm from "./components/SignInForm";
import LoginForm from "./components/LoginForm";
import BookDetails from "./components/BooksDetails";
import AddBookForm from "./components/admin/AddBookForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import BorrowedBooks from "./components/BorrowedBooks";

function App() {
  const location = useLocation();

  // Hide Header on /signin route only
  const hideHeaderPaths = ["/signin", "/login", "/admin"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/books/:bookCode" element={<BookDetails />} />
        <Route path="/borrowed-books" element={<BorrowedBooks />} />
        
        <Route path="/addbook" element={<AddBookForm />} />

        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route path="/" element={<AdminDashboard />} />"
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/addbook" element={<AddBookForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
