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
        setVillagers(response.data); // Assuming response.data contains the villagers array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch villagers data.");
        setLoading(false);
      }
    };

    fetchVillagers();
  }, []); // Empty dependency array means this runs once on mount

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "someField", label: "Other Field" }, // Adjust based on your data
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
          <Table data={villagers} columns={columns} />
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
