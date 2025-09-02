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
        console.log("Fetched villagers:", response.data);
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
      console.log("data passed", newData);
      const newVillager = {
        ...newData,
        ID: villagers.length ? Math.max(...villagers.map((v) => v.ID)) + 1 : 1, // Simple ID generation
      };
      // Send to backend
      await villagersService.createVillager(newVillager);
      setVillagers([...villagers, newVillager]);
    } catch (err) {
      setError("Failed to add villager.");
    }
  };

  // Handle editing existing data
  const handleEdit = async (ID, updatedData) => {
    try {
      const updatedVillager = { ...updatedData, ID };
      // Send to backend
      await villagersService.updateVillager(ID, updatedVillager);
      setVillagers(
        villagers.map((villager) =>
          villager.ID === ID ? updatedVillager : villager
        )
      );
    } catch (err) {
      setError("Failed to update villager.");
    }
  };

  const columns = [
    { key: "ID", label: "ID" }, // First column, uneditable (handled by Table component)
    { key: "name", label: "Name" }, // Regular text input
    {
      key: "neighborhood_id",
      label: "RT",
      type: "dropdown",
      options: [
        { value: "01", label: "01" },
        { value: "02", label: "02" },
        { value: "03", label: "03" },
      ],
    }, // Dropdown for neighborhood_id
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
            isAdmin={isAuthenticated}
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
