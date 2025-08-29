import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { villagersService } from "../../../services/villagersService";
import Table from "../../../components/table/Table";
import "./style.css";

function UsahaEkonomiMesjid({ isAuthenticated = false }) {
  console.log("UsahaEkonomiMesjid isAuthenticated:", isAuthenticated);
  const [villagers, setVillagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVillagers = async () => {
      try {
        const response = await villagersService.getVillagers();
        setVillagers(response.data); // response.data contains the villagers array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch villagers data.");
        setLoading(false);
      }
    };

    fetchVillagers();
  }, []); // Empty dependency array means this runs once on mount

  // Handle adding new data
  const handleAdd = async (newData) => {
    try {
      const newVillager = {
        ...newData,
        id: villagers.length ? Math.max(...villagers.map((v) => v.id)) + 1 : 1, // Simple ID generation
      };
      // Optionally, send to backend
      await villagersService.createVillager(newVillager);
      setVillagers([...villagers, newVillager]);
    } catch (err) {
      setError("Failed to add villager.");
    }
  };

  // Handle editing existing data
  const handleEdit = async (id, updatedData) => {
    try {
      const updatedVillager = { ...updatedData, id };
      // Optionally, send to backend
      await villagersService.updateVillager(id, updatedVillager);
      setVillagers(
        villagers.map((villager) =>
          villager.id === id ? updatedVillager : villager
        )
      );
    } catch (err) {
      setError("Failed to update villager.");
    }
  };

  const columns = [
    { key: "ID", label: "ID" },
    { key: "name", label: "Name" },
    { key: "neighborhood_id", label: "RT" }, // Adjust based on your data
  ];

  return (
    <div className="page-container">
      <div className="header">
        <h1>Usaha Ekonomi Mesjid</h1>

        {!isAuthenticated ? (
          <Link to="/login" className="btn-primary">
            Login as Admin
          </Link>
        ) : (
          <span className="welcome">✅ Welcome, Admin!</span>
        )}
      </div>

      <div className="report">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Table
            data={villagers}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
          />
        )}
      </div>
      <p>Ini adalah halaman detail tentang Usaha Ekonomi Mesjid.</p>
      <p>B2B tanpa bunga dengan sistem syariah.</p>
      <Link to="/" className="btn-primary">
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default UsahaEkonomiMesjid;
