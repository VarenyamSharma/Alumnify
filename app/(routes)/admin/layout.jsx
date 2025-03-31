import { ClerkProvider } from "@clerk/nextjs";

export default function AdminLayout({ children }) {
  return (
    <ClerkProvider>
      <div className="admin-layout">
        {children}
      </div>
    </ClerkProvider>
  );
} 