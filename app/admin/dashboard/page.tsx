"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Sparkles,
  PhoneCall,
  Star,
  Trophy,
  XCircle,
  Search,
  LogOut,
  CheckCircle2,
  Inbox,
  RefreshCw
} from "lucide-react";
import { useAuth } from "../../../lib/auth-context";

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  createdAt: string;
  updatedAt: string;
};

const statusOptions = ["new", "contacted", "qualified", "won", "lost"] as const;

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<Record<string, string>>({});
  const [updating, setUpdating] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const refreshTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchLeads = useCallback(async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads ?? []);
      }
    } catch {
      // Silently fail on auto-refresh
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchLeads();
      refreshTimer.current = setInterval(fetchLeads, 30000);
    }

    return () => {
      if (refreshTimer.current) clearInterval(refreshTimer.current);
    };
  }, [user, fetchLeads]);

  async function updateStatus(leadId: string) {
    if (!user || !pendingStatus[leadId]) return;

    setUpdating(leadId);

    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: pendingStatus[leadId] })
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === leadId
              ? { ...lead, status: pendingStatus[leadId] as Lead["status"], updatedAt: new Date().toISOString() }
              : lead
          )
        );
        setPendingStatus((prev) => {
          const next = { ...prev };
          delete next[leadId];
          return next;
        });
        showToast("Status updated successfully");
      }
    } catch {
      showToast("Failed to update status");
    } finally {
      setUpdating(null);
    }
  }

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  }

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch {
      return "—";
    }
  }

  function formatDateTime(iso: string) {
    try {
      return new Date(iso).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "—";
    }
  }

  // Filter leads
  const filtered = leads.filter((lead) => {
    const matchesSearch =
      !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.interest.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Compute stats
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    won: leads.filter((l) => l.status === "won").length,
    lost: leads.filter((l) => l.status === "lost").length
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      {/* Nav */}
      <nav className="admin-nav">
        <div className="admin-nav-brand">
          <div className="admin-nav-mark">A</div>
          <span className="admin-nav-title">Adwiz Media Dashboard</span>
        </div>
        <div className="admin-nav-right">
          <span className="admin-nav-email">{user.email}</span>
          <button
            className="admin-signout"
            onClick={async () => {
              await signOut();
              router.replace("/admin");
            }}
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Leads</h1>
          <p>{leads.length} total enquiries tracked</p>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card stat-total">
            <div className="stat-card-label"><Users size={14} /> Total</div>
            <div className="stat-card-value">{stats.total}</div>
          </div>
          <div className="stat-card stat-new">
            <div className="stat-card-label"><Sparkles size={14} /> New</div>
            <div className="stat-card-value">{stats.new}</div>
          </div>
          <div className="stat-card stat-contacted">
            <div className="stat-card-label"><PhoneCall size={14} /> Contacted</div>
            <div className="stat-card-value">{stats.contacted}</div>
          </div>
          <div className="stat-card stat-qualified">
            <div className="stat-card-label"><Star size={14} /> Qualified</div>
            <div className="stat-card-value">{stats.qualified}</div>
          </div>
          <div className="stat-card stat-won">
            <div className="stat-card-label"><Trophy size={14} /> Won</div>
            <div className="stat-card-value">{stats.won}</div>
          </div>
          <div className="stat-card stat-lost">
            <div className="stat-card-label"><XCircle size={14} /> Lost</div>
            <div className="stat-card-value">{stats.lost}</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="table-toolbar">
          <div className="search-input-wrapper">
            <Search />
            <input
              className="search-input"
              type="text"
              placeholder="Search leads by name, company, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <button
            className="admin-signout"
            onClick={() => { setFetching(true); fetchLeads(); }}
            title="Refresh leads"
            style={{ padding: "0.45rem" }}
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="leads-table-wrapper">
          <div className="leads-table-scroll">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Interest</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {fetching ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`skel-${i}`}>
                      <td colSpan={6}>
                        <div className="skeleton-row">
                          <div className="skeleton-cell" />
                          <div className="skeleton-cell" />
                          <div className="skeleton-cell" />
                          <div className="skeleton-cell" />
                          <div className="skeleton-cell" />
                          <div className="skeleton-cell" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-state">
                        <Inbox />
                        <h3>{search || statusFilter !== "all" ? "No matching leads" : "No leads yet"}</h3>
                        <p>{search || statusFilter !== "all" ? "Try adjusting your search or filter." : "Leads will appear here when visitors submit the contact form."}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead) => (
                    <>
                      <tr key={lead.id} onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}>
                        <td>
                          <div className="lead-name">{lead.name}</div>
                        </td>
                        <td><span className="lead-company">{lead.company}</span></td>
                        <td><span className="lead-email">{lead.email}</span></td>
                        <td>{lead.interest}</td>
                        <td>
                          <span className={`status-badge status-badge-${lead.status}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td><span className="lead-date">{formatDate(lead.createdAt)}</span></td>
                      </tr>

                      {expandedId === lead.id && (
                        <tr key={`detail-${lead.id}`} className="lead-detail-row">
                          <td colSpan={6}>
                            <div className="lead-detail-content">
                              <div className="lead-detail-grid">
                                <div className="lead-detail-field">
                                  <span className="lead-detail-label">Phone</span>
                                  <span className="lead-detail-value">{lead.phone || "—"}</span>
                                </div>
                                <div className="lead-detail-field">
                                  <span className="lead-detail-label">Source</span>
                                  <span className="lead-detail-value">{lead.source}</span>
                                </div>
                                <div className="lead-detail-field">
                                  <span className="lead-detail-label">Created</span>
                                  <span className="lead-detail-value">{formatDateTime(lead.createdAt)}</span>
                                </div>
                                <div className="lead-detail-field">
                                  <span className="lead-detail-label">Updated</span>
                                  <span className="lead-detail-value">{formatDateTime(lead.updatedAt)}</span>
                                </div>
                              </div>

                              {lead.message && (
                                <div style={{ marginBottom: "1rem" }}>
                                  <span className="lead-detail-label" style={{ marginBottom: "0.4rem", display: "block" }}>Message</span>
                                  <div className="lead-detail-message">{lead.message}</div>
                                </div>
                              )}

                              <div className="lead-detail-actions">
                                <select
                                  className="status-select"
                                  value={pendingStatus[lead.id] ?? lead.status}
                                  onChange={(e) =>
                                    setPendingStatus((prev) => ({ ...prev, [lead.id]: e.target.value }))
                                  }
                                >
                                  {statusOptions.map((s) => (
                                    <option key={s} value={s}>
                                      {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  className="update-status-btn"
                                  disabled={
                                    updating === lead.id ||
                                    !pendingStatus[lead.id] ||
                                    pendingStatus[lead.id] === lead.status
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatus(lead.id);
                                  }}
                                >
                                  {updating === lead.id ? (
                                    <div className="login-spinner" style={{ width: 14, height: 14 }} />
                                  ) : (
                                    <>
                                      <CheckCircle2 size={14} />
                                      Update
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          {toast}
        </div>
      )}
    </>
  );
}
