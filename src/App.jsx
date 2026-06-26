import { useEffect, useState } from "react";
import { useAuthSession } from "./hooks/useAuthSession";
import LoginPage from "./pages/LoginPage";
import ReportPage from "./pages/ReportPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [currentPage, setCurrentPage] = useState(() =>
    window.location.hash === "#admin" ? "admin" : "report",
  );
  const {
    authState,
    isAuthLoading,
    isLoginSubmitting,
    authNotice,
    login,
    logout,
    clearAuthNotice,
  } = useAuthSession();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash === "#admin" ? "admin" : "report");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-800">
            กำลังตรวจสอบ session...
          </p>
        </div>
      </div>
    );
  }

  if (!authState.token) {
    return (
      <LoginPage
        onLogin={login}
        isLoading={isLoginSubmitting}
        sessionNotice={authNotice}
        onDismissNotice={clearAuthNotice}
      />
    );
  }

  const openPage = (page) => {
    window.location.hash = page === "admin" ? "admin" : "";
    setCurrentPage(page);
  };

  if (currentPage === "admin") {
    return (
      <AdminPage
        authState={authState}
        onBack={() => openPage("report")}
        onLogout={logout}
      />
    );
  }

  return (
    <ReportPage
      authState={authState}
      onLogout={logout}
      onOpenAdmin={() => openPage("admin")}
    />
  );
}

export default App;
