import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import type { Role } from "../../auth/type";
import { Card } from "../../components/common/Card";
import clsx from "clsx";

// Role cards configuration
const roleCards: Array<{
  role: Role;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}> = [
  {
    role: "student",
    title: "Student / Faculty / Employee",
    description: "Submit and track your IT support tickets",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    role: "technician",
    title: "IT Technician",
    description: "Manage and resolve support tickets",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    role: "admin",
    title: "Administrator",
    description: "Manage users, analytics, and system settings",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-600",
  },
];

export default function Login() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: { pathname: string } } };

  const from = location.state?.from?.pathname || "/";

  function handleLogin(role: Role) {
    loginAs(role, "Demo User");

    // Route to default landing per role
    const routes: Record<Role, string> = {
      student: "/student/dashboard",
      technician: "/technician/queue",
      admin: "/admin/dashboard",
    };

    navigate(routes[role] || from, { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-400 shadow-lg shadow-primary/25 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome to OpsMind</h1>
          <p className="text-slate-400 mt-2">
            AI-Powered IT Support Management System
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Sign in to continue</h2>
              <p className="text-sm text-slate-500 mt-1">
                Choose your role to access the system
              </p>
            </div>

            {/* Role Cards */}
            <div className="space-y-3">
              {roleCards.map((card) => (
                <button
                  key={card.role}
                  onClick={() => handleLogin(card.role)}
                  className={clsx(
                    "w-full flex items-center gap-4 p-4 rounded-xl",
                    "border border-slate-200 bg-white",
                    "transition-all duration-200",
                    "hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                >
                  <div
                    className={clsx(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-white",
                      "bg-gradient-to-br shadow-lg",
                      card.gradient
                    )}
                  >
                    {card.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-slate-900">{card.title}</p>
                    <p className="text-sm text-slate-500">{card.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500">
          Demo mode: No real authentication required
        </p>
      </div>
    </div>
  );
}