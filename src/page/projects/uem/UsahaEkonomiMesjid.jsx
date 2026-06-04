// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Alert,
//   CircularProgress,
//   Button,
//   Paper,
// } from "@mui/material";
// import { villagersService } from "../../../services/villagersService";
// //import Mu from "../../../components/table/MuiTable";
// import MuiTableComponent from "../../../components/table/MUITable";
// import { useAtomValue } from "jotai";
// import { isAuthenticatedAtom } from "../../../store/derivedAtoms";

// function UsahaEkonomiMesjid() {
//   const isAuthenticated = useAtomValue(isAuthenticatedAtom);
//   const [villagers, setVillagers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchVillagers();
//   }, []);

//   const fetchVillagers = async () => {
//     try {
//       const response = await villagersService.getVillagers();
//       setVillagers(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch villagers data.");
//       setLoading(false);
//     }
//   };

//   const handleAdd = async (newData) => {
//     try {
//       const newVillager = {
//         ...newData,
//         ID: villagers.length ? Math.max(...villagers.map((v) => v.ID)) + 1 : 1,
//       };
//       await villagersService.createVillager(newVillager);
//       setVillagers([...villagers, newVillager]);
//       return Promise.resolve();
//     } catch (err) {
//       setError("Failed to add villager.");
//       return Promise.reject(err);
//     }
//   };

//   const handleEdit = async (ID, updatedData) => {
//     try {
//       const updatedVillager = { ...updatedData, ID };
//       await villagersService.updateVillager(ID, updatedVillager);
//       setVillagers(
//         villagers.map((villager) =>
//           villager.ID === ID ? updatedVillager : villager
//         )
//       );
//       return Promise.resolve();
//     } catch (err) {
//       setError("Failed to update villager.");
//       return Promise.reject(err);
//     }
//   };

//   const handleDelete = async (ID) => {
//     try {
//       await villagersService.deleteVillager(ID);
//       setVillagers(villagers.filter((v) => v.ID !== ID));
//       return Promise.resolve();
//     } catch (err) {
//       setError("Failed to delete villager.");
//       return Promise.reject(err);
//     }
//   };

//   const columns = [
//     {
//       key: "ID",
//       label: "ID",
//       width: 80,
//     },
//     {
//       key: "name",
//       label: "Name",
//       width: 200,
//     },
//     {
//       key: "neighborhood_id",
//       label: "RT",
//       type: "dropdown",
//       options: [
//         { value: "01", label: "01" },
//         { value: "02", label: "02" },
//         { value: "03", label: "03" },
//       ],
//       width: 100,
//     },
//     {
//       key: "created_at",
//       label: "Created At",
//       format: (value) => new Date(value).toLocaleDateString(),
//       width: 150,
//     },
//   ];

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ my: 4 }}>
//         {/* Header */}
//         <Paper
//           elevation={0}
//           sx={{ p: 3, mb: 3, backgroundColor: "primary.main", color: "white" }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Box>
//               <Typography variant="h4" gutterBottom>
//                 Usaha Ekonomi Mesjid
//               </Typography>
//               <Typography variant="body1">
//                 B2B tanpa bunga dengan sistem syariah
//               </Typography>
//             </Box>
//             {!isAuthenticated ? (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 component={Link}
//                 to="/login"
//                 size="large"
//               >
//                 Login as Admin
//               </Button>
//             ) : (
//               <Typography
//                 variant="body1"
//                 sx={{ display: "flex", alignItems: "center" }}
//               >
//                 👋 Welcome, Admin!
//               </Typography>
//             )}
//           </Box>
//         </Paper>

//         {/* Error Alert */}
//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         {/* Table */}
//         <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom color="primary">
//             Villagers Data
//           </Typography>
//           <MuiTable
//             data={villagers}
//             columns={columns}
//             onAdd={handleAdd}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//             isAdmin={isAuthenticated}
//             isLoading={loading}
//           />
//         </Paper>

//         {/* Back Button */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//           <Button variant="outlined" component={Link} to="/">
//             ← Back to Home
//           </Button>
//           <Typography variant="body2" color="text.secondary">
//             Total Records: {villagers.length}
//           </Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

// export default UsahaEkonomiMesjid;

import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { villagersService } from "../../../services/villagersService";
import { loanService } from "../../../services/loanService";
import { infaqService } from "../../../services/infaqService";
import "./style.css";

// ─── helpers ──────────────────────────────────────────────────────────────────
const fmtRp = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
const MONTHS_FULL = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// ─── sub-components ───────────────────────────────────────────────────────────

/** Reusable confirm dialog */
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="uem-modal-overlay">
      <div className="uem-modal uem-modal--sm">
        <p className="uem-modal__msg">{message}</p>
        <div className="uem-modal__actions">
          <button className="uem-btn uem-btn--danger" onClick={onConfirm}>
            Ya, Hapus
          </button>
          <button className="uem-btn uem-btn--ghost" onClick={onCancel}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

/** Status badge */
function StatusBadge({ paid }) {
  return (
    <span
      className={`uem-badge ${paid ? "uem-badge--paid" : "uem-badge--active"}`}
    >
      {paid ? "✓ Lunas" : "Aktif"}
    </span>
  );
}

// ─── Tab: Warga (Villagers) ────────────────────────────────────────────────────
function WargaTab({ isAdmin }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", neighborhood_id: "01" });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [rtFilter, setRtFilter] = useState("all");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await villagersService.getVillagers();
      setData(res.data || []);
    } catch {
      setError("Gagal memuat data warga.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    try {
      if (editingId !== null) {
        await villagersService.updateVillager(editingId, form);
        setData(data.map((d) => (d.ID === editingId ? { ...d, ...form } : d)));
      } else {
        const newId = data.length ? Math.max(...data.map((d) => d.ID)) + 1 : 1;
        const newItem = { ...form, ID: newId };
        await villagersService.createVillager(newItem);
        setData([...data, newItem]);
      }
      setAdding(false);
      setEditingId(null);
      setForm({ name: "", neighborhood_id: "01" });
    } catch {
      setError("Gagal menyimpan data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await villagersService.deleteVillager(id);
      setData(data.filter((d) => d.ID !== id));
    } catch {
      setError("Gagal menghapus data.");
    }
    setConfirmDelete(null);
  };

  const filtered = data.filter((d) => {
    const matchName = d.name?.toLowerCase().includes(search.toLowerCase());
    const matchRt =
      rtFilter === "all" || String(d.neighborhood_id) === rtFilter;
    return matchName && matchRt;
  });

  return (
    <div className="uem-tab-content">
      {confirmDelete && (
        <ConfirmModal
          message={`Hapus warga "${confirmDelete.name}"?`}
          onConfirm={() => handleDelete(confirmDelete.id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <div className="uem-toolbar">
        <input
          className="uem-search"
          placeholder="🔍 Cari nama warga..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="uem-select"
          value={rtFilter}
          onChange={(e) => setRtFilter(e.target.value)}
        >
          <option value="all">Semua RT</option>
          <option value="01">RT 01</option>
          <option value="02">RT 02</option>
          <option value="03">RT 03</option>
        </select>
        {isAdmin && !adding && !editingId && (
          <button
            className="uem-btn uem-btn--primary"
            onClick={() => {
              setAdding(true);
              setForm({ name: "", neighborhood_id: "01" });
            }}
          >
            + Tambah Warga
          </button>
        )}
      </div>

      {error && <div className="uem-alert uem-alert--error">{error}</div>}

      <div className="uem-table-wrap">
        <table className="uem-table">
          <thead>
            <tr>
              <th style={{ width: 50 }}>No</th>
              <th>Nama</th>
              <th style={{ width: 70 }}>RT</th>
              {isAdmin && <th style={{ width: 120 }}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isAdmin ? 4 : 3} className="uem-td-center">
                  <span className="uem-spinner" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 4 : 3}
                  className="uem-td-center uem-text-muted"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filtered.map((item, idx) => (
                <tr
                  key={item.ID}
                  className={editingId === item.ID ? "uem-tr--editing" : ""}
                >
                  {editingId === item.ID ? (
                    <>
                      <td>{item.ID}</td>
                      <td>
                        <input
                          className="uem-input"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <select
                          className="uem-select uem-select--sm"
                          value={form.neighborhood_id}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              neighborhood_id: e.target.value,
                            })
                          }
                        >
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="uem-btn uem-btn--sm uem-btn--primary"
                          onClick={handleSave}
                        >
                          Simpan
                        </button>
                        <button
                          className="uem-btn uem-btn--sm uem-btn--ghost"
                          onClick={() => setEditingId(null)}
                        >
                          Batal
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <span className="uem-rt-badge">
                          RT {item.neighborhood_id}
                        </span>
                      </td>
                      {isAdmin && (
                        <td>
                          <button
                            className="uem-btn uem-btn--sm uem-btn--ghost"
                            onClick={() => {
                              setEditingId(item.ID);
                              setForm({
                                name: item.name,
                                neighborhood_id: item.neighborhood_id,
                              });
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            className="uem-btn uem-btn--sm uem-btn--danger-ghost"
                            onClick={() =>
                              setConfirmDelete({ id: item.ID, name: item.name })
                            }
                          >
                            🗑️
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))
            )}
            {isAdmin && adding && (
              <tr className="uem-tr--adding">
                <td>—</td>
                <td>
                  <input
                    className="uem-input"
                    placeholder="Nama lengkap"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </td>
                <td>
                  <select
                    className="uem-select uem-select--sm"
                    value={form.neighborhood_id}
                    onChange={(e) =>
                      setForm({ ...form, neighborhood_id: e.target.value })
                    }
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                  </select>
                </td>
                <td>
                  <button
                    className="uem-btn uem-btn--sm uem-btn--primary"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                  <button
                    className="uem-btn uem-btn--sm uem-btn--ghost"
                    onClick={() => setAdding(false)}
                  >
                    Batal
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="uem-count">Total: {filtered.length} warga</p>
    </div>
  );
}

// ─── Tab: Pinjaman (Loans) ─────────────────────────────────────────────────────
function PinjamanTab({ isAdmin }) {
  const [loans, setLoans] = useState([]);
  const [villagers, setVillagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rtFilter, setRtFilter] = useState("all");
  const [form, setForm] = useState({
    villager_id: "",
    loan_amount: "",
    loan_date: "",
    notes: "",
  });
  const [repaymentForms, setRepaymentForms] = useState({});

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [lRes, vRes] = await Promise.all([
        loanService.getLoans(),
        villagersService.getVillagers(),
      ]);
      setLoans(lRes.data || []);
      setVillagers(vRes.data || []);
    } catch {
      setError("Gagal memuat data pinjaman.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getVillager = (id) => villagers.find((v) => v.ID === Number(id));

  const handleAddLoan = async () => {
    if (!form.villager_id || !form.loan_amount || !form.loan_date) return;
    try {
      const newLoan = {
        ...form,
        loan_amount: Number(form.loan_amount),
        paid_amount: 0,
        is_paid: false,
      };
      const res = await loanService.createLoan(newLoan);
      setLoans([...loans, res.data || { ...newLoan, ID: Date.now() }]);
      setAdding(false);
      setForm({ villager_id: "", loan_amount: "", loan_date: "", notes: "" });
    } catch {
      setError("Gagal menambah pinjaman.");
    }
  };

  const handleDeleteLoan = async (id) => {
    try {
      await loanService.deleteLoan(id);
      setLoans(loans.filter((l) => l.ID !== id));
    } catch {
      setError("Gagal menghapus pinjaman.");
    }
    setConfirmDelete(null);
  };

  const handleAddRepayment = async (loanId) => {
    const rf = repaymentForms[loanId] || {};
    if (!rf.amount || !rf.payment_date) return;
    try {
      const repData = {
        amount: Number(rf.amount),
        payment_date: rf.payment_date,
        week_label: rf.week_label || "",
      };
      await loanService.createRepayment(loanId, repData);
      // Update local paid_amount
      setLoans(
        loans.map((l) => {
          if (l.ID !== loanId) return l;
          const newPaid = (l.paid_amount || 0) + Number(rf.amount);
          return {
            ...l,
            paid_amount: newPaid,
            is_paid: newPaid >= l.loan_amount,
          };
        }),
      );
      setRepaymentForms({ ...repaymentForms, [loanId]: {} });
    } catch {
      setError("Gagal mencatat pembayaran.");
    }
  };

  const filtered = loans.filter((l) => {
    const v = getVillager(l.villager_id);
    const matchName =
      v?.name?.toLowerCase().includes(search.toLowerCase()) || true;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "lunas" ? l.is_paid : !l.is_paid);
    const matchRt =
      rtFilter === "all" || String(v?.neighborhood_id) === rtFilter;
    return matchName && matchStatus && matchRt;
  });

  const totalPinjaman = filtered.reduce((s, l) => s + (l.loan_amount || 0), 0);
  const totalTerbayar = filtered.reduce((s, l) => s + (l.paid_amount || 0), 0);
  const totalSisa = totalPinjaman - totalTerbayar;

  return (
    <div className="uem-tab-content">
      {confirmDelete && (
        <ConfirmModal
          message="Hapus data pinjaman ini?"
          onConfirm={() => handleDeleteLoan(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Summary cards */}
      <div className="uem-summary-cards">
        <div className="uem-card uem-card--blue">
          <span className="uem-card__label">Total Pinjaman</span>
          <span className="uem-card__value">{fmtRp(totalPinjaman)}</span>
        </div>
        <div className="uem-card uem-card--green">
          <span className="uem-card__label">Total Terbayar</span>
          <span className="uem-card__value">{fmtRp(totalTerbayar)}</span>
        </div>
        <div className="uem-card uem-card--orange">
          <span className="uem-card__label">Sisa Tagihan</span>
          <span className="uem-card__value">{fmtRp(totalSisa)}</span>
        </div>
        <div className="uem-card uem-card--gray">
          <span className="uem-card__label">Peminjam Aktif</span>
          <span className="uem-card__value">
            {loans.filter((l) => !l.is_paid).length}
          </span>
        </div>
      </div>

      <div className="uem-toolbar">
        <input
          className="uem-search"
          placeholder="🔍 Cari nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="uem-select"
          value={rtFilter}
          onChange={(e) => setRtFilter(e.target.value)}
        >
          <option value="all">Semua RT</option>
          <option value="01">RT 01</option>
          <option value="02">RT 02</option>
          <option value="03">RT 03</option>
        </select>
        <select
          className="uem-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="lunas">Lunas</option>
        </select>
        {isAdmin && !adding && (
          <button
            className="uem-btn uem-btn--primary"
            onClick={() => setAdding(true)}
          >
            + Tambah Pinjaman
          </button>
        )}
      </div>

      {error && <div className="uem-alert uem-alert--error">{error}</div>}

      {/* Add loan form */}
      {isAdmin && adding && (
        <div className="uem-add-form">
          <h4>Tambah Pinjaman Baru</h4>
          <div className="uem-form-grid">
            <div className="uem-form-field">
              <label>Warga</label>
              <select
                className="uem-select"
                value={form.villager_id}
                onChange={(e) =>
                  setForm({ ...form, villager_id: e.target.value })
                }
              >
                <option value="">-- Pilih Warga --</option>
                {villagers.map((v) => (
                  <option key={v.ID} value={v.ID}>
                    {v.name} (RT {v.neighborhood_id})
                  </option>
                ))}
              </select>
            </div>
            <div className="uem-form-field">
              <label>Jumlah Pinjaman (Rp)</label>
              <input
                className="uem-input"
                type="number"
                placeholder="cth: 500000"
                value={form.loan_amount}
                onChange={(e) =>
                  setForm({ ...form, loan_amount: e.target.value })
                }
              />
            </div>
            <div className="uem-form-field">
              <label>Tanggal Pinjaman</label>
              <input
                className="uem-input"
                type="date"
                value={form.loan_date}
                onChange={(e) =>
                  setForm({ ...form, loan_date: e.target.value })
                }
              />
            </div>
            <div className="uem-form-field uem-form-field--full">
              <label>Keterangan</label>
              <input
                className="uem-input"
                placeholder="Keterangan tambahan (opsional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>
          <div className="uem-form-actions">
            <button
              className="uem-btn uem-btn--primary"
              onClick={handleAddLoan}
            >
              Simpan Pinjaman
            </button>
            <button
              className="uem-btn uem-btn--ghost"
              onClick={() => setAdding(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="uem-table-wrap">
        <table className="uem-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>No</th>
              <th>Nama</th>
              <th style={{ width: 60 }}>RT</th>
              <th>Tgl Pinjam</th>
              <th>Jml Pinjaman</th>
              <th>Terbayar</th>
              <th>Sisa</th>
              <th>Status</th>
              {isAdmin && <th style={{ width: 90 }}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isAdmin ? 9 : 8} className="uem-td-center">
                  <span className="uem-spinner" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 9 : 8}
                  className="uem-td-center uem-text-muted"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filtered.map((loan, idx) => {
                const v = getVillager(loan.villager_id);
                const sisa = (loan.loan_amount || 0) - (loan.paid_amount || 0);
                const pct = loan.loan_amount
                  ? Math.min(
                      100,
                      Math.round((loan.paid_amount / loan.loan_amount) * 100),
                    )
                  : 0;
                const rf = repaymentForms[loan.ID] || {};
                const isExpanded = expandedId === loan.ID;
                return (
                  <>
                    <tr
                      key={loan.ID}
                      className={isExpanded ? "uem-tr--expanded" : ""}
                      onClick={() => setExpandedId(isExpanded ? null : loan.ID)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{idx + 1}</td>
                      <td>
                        <strong>{v?.name || `ID ${loan.villager_id}`}</strong>
                      </td>
                      <td>
                        <span className="uem-rt-badge">
                          RT {v?.neighborhood_id}
                        </span>
                      </td>
                      <td className="uem-text-sm">{loan.loan_date}</td>
                      <td>{fmtRp(loan.loan_amount)}</td>
                      <td>
                        <div>{fmtRp(loan.paid_amount)}</div>
                        <div className="uem-progress">
                          <div
                            className="uem-progress__bar"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </td>
                      <td
                        className={
                          sisa > 0 ? "uem-text-orange" : "uem-text-green"
                        }
                      >
                        {fmtRp(sisa)}
                      </td>
                      <td>
                        <StatusBadge paid={loan.is_paid} />
                      </td>
                      {isAdmin && (
                        <td onClick={(e) => e.stopPropagation()}>
                          <button
                            className="uem-btn uem-btn--sm uem-btn--danger-ghost"
                            onClick={() => setConfirmDelete(loan.ID)}
                          >
                            🗑️
                          </button>
                        </td>
                      )}
                    </tr>
                    {isExpanded && (
                      <tr key={`${loan.ID}-expand`} className="uem-tr--detail">
                        <td colSpan={isAdmin ? 9 : 8}>
                          <div className="uem-expand">
                            <div className="uem-expand__info">
                              <span>
                                <strong>Keterangan:</strong> {loan.notes || "—"}
                              </span>
                            </div>
                            {isAdmin && !loan.is_paid && (
                              <div className="uem-repayment-form">
                                <h5>Catat Pembayaran</h5>
                                <div className="uem-form-inline">
                                  <input
                                    className="uem-input uem-input--sm"
                                    type="number"
                                    placeholder="Jumlah (Rp)"
                                    value={rf.amount || ""}
                                    onChange={(e) =>
                                      setRepaymentForms({
                                        ...repaymentForms,
                                        [loan.ID]: {
                                          ...rf,
                                          amount: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                  <input
                                    className="uem-input uem-input--sm"
                                    type="date"
                                    value={rf.payment_date || ""}
                                    onChange={(e) =>
                                      setRepaymentForms({
                                        ...repaymentForms,
                                        [loan.ID]: {
                                          ...rf,
                                          payment_date: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                  <input
                                    className="uem-input uem-input--sm"
                                    placeholder="Label (cth: Minggu 1)"
                                    value={rf.week_label || ""}
                                    onChange={(e) =>
                                      setRepaymentForms({
                                        ...repaymentForms,
                                        [loan.ID]: {
                                          ...rf,
                                          week_label: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                  <button
                                    className="uem-btn uem-btn--sm uem-btn--primary"
                                    onClick={() => handleAddRepayment(loan.ID)}
                                  >
                                    + Bayar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <p className="uem-count">
        Menampilkan {filtered.length} dari {loans.length} pinjaman
      </p>
    </div>
  );
}

// ─── Tab: Laporan (Monthly Report) ────────────────────────────────────────────
function LaporanTab() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await loanService.getMonthlySummary(year);
        setSummary(res.data);
      } catch {
        // Use placeholder structure if API not ready
        setSummary(null);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [year]);

  const monthlyData =
    summary?.months ||
    MONTHS.map((m) => ({
      month: m,
      new_loans: 0,
      repayments: 0,
      outstanding: 0,
    }));

  return (
    <div className="uem-tab-content">
      <div className="uem-toolbar">
        <label className="uem-label">Tahun:</label>
        <select
          className="uem-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {[2023, 2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="uem-alert uem-alert--error">{error}</div>}

      {loading ? (
        <div className="uem-td-center" style={{ padding: "2rem" }}>
          <span className="uem-spinner" />
        </div>
      ) : (
        <>
          {summary && (
            <div className="uem-summary-cards uem-summary-cards--4">
              <div className="uem-card uem-card--blue">
                <span className="uem-card__label">Total Pinjaman {year}</span>
                <span className="uem-card__value">
                  {fmtRp(summary.total_loans)}
                </span>
              </div>
              <div className="uem-card uem-card--green">
                <span className="uem-card__label">Total Pembayaran</span>
                <span className="uem-card__value">
                  {fmtRp(summary.total_repayments)}
                </span>
              </div>
              <div className="uem-card uem-card--orange">
                <span className="uem-card__label">Dana Di Luar</span>
                <span className="uem-card__value">
                  {fmtRp(summary.outstanding)}
                </span>
              </div>
              <div className="uem-card uem-card--green">
                <span className="uem-card__label">Jumlah Peminjam</span>
                <span className="uem-card__value">
                  {summary.total_borrowers}
                </span>
              </div>
            </div>
          )}

          <div className="uem-table-wrap">
            <table className="uem-table">
              <thead>
                <tr>
                  <th>Bulan</th>
                  <th>Pinjaman Baru</th>
                  <th>Pembayaran</th>
                  <th>Saldo Berjalan</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <strong>{MONTHS_FULL[i]}</strong>
                    </td>
                    <td>{fmtRp(row.new_loans)}</td>
                    <td className="uem-text-green">{fmtRp(row.repayments)}</td>
                    <td
                      className={row.outstanding > 0 ? "uem-text-orange" : ""}
                    >
                      {fmtRp(row.outstanding)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!summary && (
            <div className="uem-empty-state">
              <p>
                📊 Data laporan untuk tahun {year} belum tersedia atau API belum
                terhubung.
              </p>
              <p className="uem-text-muted">
                Laporan akan muncul otomatis setelah data pinjaman dimasukkan.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Tab: Infaq ────────────────────────────────────────────────────────────────
function InfaqTab({ isAdmin }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await infaqService.getSummary(year);
        setData(res.data);
      } catch {
        setData(null);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [year]);

  // Fallback placeholder from Excel data
  const placeholderRows = [
    {
      rt: "RT 01",
      months: [
        94400, 85600, 0, 0, 95000, 0, 64500, 0, 42500, 60000, 60000, 35000,
      ],
      total: 537000,
    },
    {
      rt: "RT 02",
      months: [128000, 0, 0, 0, 128000, 0, 89600, 0, 0, 0, 0, 0],
      total: 345600,
    },
    {
      rt: "RT 03",
      months: [70000, 0, 0, 0, 70000, 0, 49000, 0, 0, 0, 0, 0],
      total: 189000,
    },
  ];
  const rows = data?.rts || placeholderRows;

  return (
    <div className="uem-tab-content">
      <div className="uem-toolbar">
        <label className="uem-label">Tahun:</label>
        <select
          className="uem-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {[2023, 2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="uem-alert uem-alert--error">{error}</div>}

      {loading ? (
        <div className="uem-td-center" style={{ padding: "2rem" }}>
          <span className="uem-spinner" />
        </div>
      ) : (
        <>
          <div className="uem-info-banner">
            <span>
              📌 Data infaq sodaqoh warga RW 01 – Babakan Pedes, Desa
              Trunamanggala, Kec. Cimalaka, Kab. Sumedang
            </span>
          </div>
          <div className="uem-table-wrap uem-table-wrap--scroll">
            <table className="uem-table uem-table--compact">
              <thead>
                <tr>
                  <th>RT</th>
                  {MONTHS.map((m) => (
                    <th key={m}>{m}</th>
                  ))}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <strong>{row.rt}</strong>
                    </td>
                    {(row.months || []).map((v, j) => (
                      <td
                        key={j}
                        className={v > 0 ? "uem-text-green" : "uem-text-muted"}
                      >
                        {v > 0 ? fmtRp(v).replace("Rp\u00a0", "Rp ") : "—"}
                      </td>
                    ))}
                    <td>
                      <strong>{fmtRp(row.total)}</strong>
                    </td>
                  </tr>
                ))}
                <tr className="uem-tr--total">
                  <td>
                    <strong>Total</strong>
                  </td>
                  {MONTHS.map((_, j) => (
                    <td key={j}>
                      <strong>
                        {fmtRp(
                          rows.reduce((s, r) => s + (r.months?.[j] || 0), 0),
                        )}
                      </strong>
                    </td>
                  ))}
                  <td>
                    <strong>
                      {fmtRp(rows.reduce((s, r) => s + (r.total || 0), 0))}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {!data && (
            <p
              className="uem-text-muted"
              style={{ marginTop: "0.75rem", fontSize: "0.8rem" }}
            >
              * Menampilkan data contoh dari tahun 2025. Data live akan muncul
              setelah API infaq terhubung.
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
function UsahaEkonomiMesjid({ isAuthenticated = false }) {
  const [activeTab, setActiveTab] = useState("pinjaman");

  const tabs = [
    { id: "pinjaman", label: "📋 Pinjaman" },
    { id: "warga", label: "👥 Warga" },
    { id: "infaq", label: "💚 Infaq" },
    { id: "laporan", label: "📊 Laporan" },
  ];

  return (
    <div className="uem-page">
      {/* Header */}
      <div className="uem-header">
        <div className="uem-header__text">
          <h1>Usaha Ekonomi Mesjid</h1>
          <p>Riyadlus Sholihin · Babakan Pedes · Syariah B2B tanpa bunga</p>
        </div>
        <div className="uem-header__actions">
          {!isAuthenticated ? (
            <Link to="/login" className="uem-btn uem-btn--primary">
              🔑 Login Admin
            </Link>
          ) : (
            <span className="uem-badge uem-badge--admin">✅ Admin</span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="uem-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`uem-tab ${activeTab === t.id ? "uem-tab--active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="uem-panel">
        {activeTab === "warga" && <WargaTab isAdmin={isAuthenticated} />}
        {activeTab === "pinjaman" && <PinjamanTab isAdmin={isAuthenticated} />}
        {activeTab === "laporan" && <LaporanTab />}
        {activeTab === "infaq" && <InfaqTab isAdmin={isAuthenticated} />}
      </div>

      <div className="uem-footer-nav">
        <Link to="/" className="uem-btn uem-btn--ghost">
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default UsahaEkonomiMesjid;
