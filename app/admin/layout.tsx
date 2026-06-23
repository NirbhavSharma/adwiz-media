import { AuthProvider } from "../../lib/auth-context";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin | Adwiz Media"
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-wrapper">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
