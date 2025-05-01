import { Toaster } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

// A simple "Page Not Found" component to display for invalid routes
const NotFound = () => (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h2>
    <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Header />
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6">
          <div className="w-full max-w-6xl mx-auto">
            <Routes>
              {/* Define the route for the content component */}
              <Route path="/" element={<Content />} />
              <Route path="/content/:tab" element={<Content />} />
              {/* Fallback for 404 errors */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
      <Toaster position="bottom-center" /> {/* Toaster at the bottom of the screen */}
    </div>
  );
}
