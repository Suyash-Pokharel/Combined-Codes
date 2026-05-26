import { useState } from "react";
import MonthCalendar from "./components/MonthCalendar";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetails from "./components/UserDetails";

export type Page = "login" | "register" | "userdetails" | "calendar";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <Login onNavigate={(page: any) => setCurrentPage(page as Page)} />
        );
      case "register":
        return (
          <Register onNavigate={(page: any) => setCurrentPage(page as Page)} />
        );
      case "userdetails":
        return <UserDetails />;
      case "calendar":
        return <MonthCalendar />;
      default:
        return (
          <Login onNavigate={(page: any) => setCurrentPage(page as Page)} />
        );
    }
  };

  return (
    <div className="bg-background min-h-screen w-full flex flex-col items-center justify-start p-4 transition-colors duration-300">
      <nav className="flex gap-4 p-4 bg-surface rounded-lg shadow-md mb-8 w-full max-w-4xl justify-center">
        <button
          onClick={() => setCurrentPage("login")}
          className={`px-4 py-2 rounded ${currentPage === "login" ? "bg-primary text-white" : "text-text-main hover:bg-surface-highlight"}`}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage("register")}
          className={`px-4 py-2 rounded ${currentPage === "register" ? "bg-primary text-white" : "text-text-main hover:bg-surface-highlight"}`}
        >
          Register
        </button>
        <button
          onClick={() => setCurrentPage("userdetails")}
          className={`px-4 py-2 rounded ${currentPage === "userdetails" ? "bg-primary text-white" : "text-text-main hover:bg-surface-highlight"}`}
        >
          User Details
        </button>
        <button
          onClick={() => setCurrentPage("calendar")}
          className={`px-4 py-2 rounded ${currentPage === "calendar" ? "bg-primary text-white" : "text-text-main hover:bg-surface-highlight"}`}
        >
          Calendar
        </button>
      </nav>
      <div className="w-full grow flex items-center justify-center">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
