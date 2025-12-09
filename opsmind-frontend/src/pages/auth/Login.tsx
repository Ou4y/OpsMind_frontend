import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import type { Role } from "../../auth/type";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";

export default function Login() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const from = location.state?.from?.pathname || "/";

  function handleLogin(role: Role) {
    // For now we just set a generic name, later connect to real form + API
    loginAs(role, "Demo User");

    // Decide default landing route per role
    if (role === "student") {
      navigate("/student/dashboard", { replace: true });
    } else if (role === "technician") {
      navigate("/technician/queue", { replace: true });
    } else if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <Card className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-slate-900">OpsMind Login</h1>
        <p className="text-sm text-slate-600">
          For now, choose a role to simulate login. Later this will be replaced
          with real credentials and backend auth.
        </p>

        <div className="space-y-2">
          <Button
            fullWidth
            onClick={() => handleLogin("student")}
          >
            Continue as Student / Faculty / Employee
          </Button>
          <Button
            fullWidth
            variant="secondary"
            onClick={() => handleLogin("technician")}
          >
            Continue as IT Technician
          </Button>
          <Button
            fullWidth
            variant="ghost"
            onClick={() => handleLogin("admin")}
          >
            Continue as Admin
          </Button>
        </div>
      </Card>
    </div>
  );
}