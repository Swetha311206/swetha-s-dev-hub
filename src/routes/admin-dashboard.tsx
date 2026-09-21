import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Eye, LogOut, Mail, RefreshCw, Trash2, X } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Swetha G Portfolio" },
      {
        name: "description",
        content: "Administrator dashboard for reviewing and managing portfolio contact messages.",
      },
      { property: "og:title", content: "Admin Dashboard — Swetha G Portfolio" },
      {
        property: "og:description",
        content: "Administrator dashboard for reviewing and managing portfolio contact messages.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submitted_at: string;
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("contact_messages")
      .select("*")
      .order("submitted_at", { ascending: false });
    setLoading(false);
    if (loadError) {
      setError("You don't have permission to view messages with this account.");
      return;
    }
    setError("");
    setMessages(data ?? []);
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate({ to: "/admin-login" });
        return;
      }
      setEmail(data.session.user.email ?? "");
      await supabase.rpc("claim_admin");
      await load();
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, [load, navigate]);

  const handleDelete = async (id: string) => {
    const { error: deleteError } = await supabase.from("contact_messages").delete().eq("id", id);
    if (deleteError) {
      setError("The message could not be deleted. Please try again.");
      return;
    }
    setMessages((prev) => prev.filter((item) => item.id !== id));
    setSelected((prev) => (prev?.id === id ? null : prev));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin-login" });
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="mt-1 text-xs text-muted-foreground">Signed in as {email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={load}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              <RefreshCw className="size-4" /> Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
            >
              <LogOut className="size-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Total messages</p>
            <p className="mt-2 text-3xl font-bold">{messages.length}</p>
          </div>
          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Latest message</p>
            <p className="mt-2 text-sm font-medium">
              {messages[0] ? new Date(messages[0].submitted_at).toLocaleString() : "No messages yet"}
            </p>
          </div>
          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Unique senders</p>
            <p className="mt-2 text-3xl font-bold">
              {new Set(messages.map((item) => item.email)).size}
            </p>
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="card-surface mt-6 overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((item, index) => (
                  <tr key={item.id} className="border-t border-border hover:bg-secondary/50">
                    <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.subject}</td>
                    <td className="max-w-[16rem] truncate px-4 py-3 text-muted-foreground">
                      {item.message}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(item.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          aria-label="View message"
                          onClick={() => setSelected(item)}
                          className="rounded-lg border border-border p-2 transition-colors hover:border-primary hover:text-primary"
                        >
                          <Eye className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete message"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg border border-border p-2 text-destructive transition-colors hover:border-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                      No contact messages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
          <div className="card-surface w-full max-w-lg p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{selected.subject}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selected.name} · {new Date(selected.submitted_at).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-border p-2 transition-colors hover:border-primary"
              >
                <X className="size-4" />
              </button>
            </div>
            <a
              href={`mailto:${selected.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary"
            >
              <Mail className="size-4" /> {selected.email}
            </a>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {selected.message}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handleDelete(selected.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive"
              >
                <Trash2 className="size-4" /> Delete
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
