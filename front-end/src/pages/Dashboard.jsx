import React, { useEffect, useState } from "react";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [perPage, setPerPage] = useState(15);
  const [selected, setSelected] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [favoritesTab, setFavoritesTab] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) setUserEmail(email);
    else window.location.href = "/login";
  }, []);

  const fetchImages = async () => {
    try {
      const ACCESS_KEY = "RW789zI8qqHWvtS6cRoXvq94-zO6jCRdnPFUPtVFGfI";
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&client_id=${ACCESS_KEY}`
      );
      setImages(response.data.results);

      const email = localStorage.getItem("email");
      await axios.post("http://localhost:3000/api/searches", {
        email,
        query,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      alert("API error or limit reached");
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    const folder = zip.folder("images");

    const selectedImages = images.filter((img) => selected.includes(img.id));
    const promises = selectedImages.map(async (img) => {
      const response = await fetch(img.urls.small);
      const blob = await response.blob();
      folder.file(`${img.id}.jpg`, blob);
    });

    await Promise.all(promises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "downloaded_images.zip");
    });
  };

  const addToFavorites = async (img) => {
    const label = prompt("Add a label for this favorite:");
    if (!label) return;
    try {
      await axios.post("http://localhost:3000/api/favorites", {
        email: userEmail,
        imageId: img.id,
        imageUrl: img.urls.small,
        label,
      });
      alert("Added to favorites");
    } catch {
      alert("Error saving favorite");
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/favorites/${userEmail}`);
      setFavorites(res.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  useEffect(() => {
    if (favoritesTab && userEmail) fetchFavorites();
  }, [favoritesTab, userEmail]);

  useEffect(() => {
    const logoutUser = () => {
      alert("Logged out due to inactivity.");
      handleLogout();
    };
    let timeout = setTimeout(logoutUser, 30 * 60 * 1000);
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logoutUser, 30 * 60 * 1000);
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="top-bar">
        <div>
          <strong>Welcome:</strong> {userEmail}
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="search-bar">
        <input
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchImages}>Search</button>
        <select
          onChange={(e) => setPerPage(Number(e.target.value))}
          value={perPage}
        >
          {[5, 15, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button onClick={handleDownload}>Download Selected</button>
        <button onClick={() => setFavoritesTab(!favoritesTab)}>
          {favoritesTab ? "Back to Search" : "View Favorites"}
        </button>
        <span>Selected: {selected.length}</span>
      </div>

      {favoritesTab ? (
        <div className="image-grid">
          {favorites.map((fav) => (
            <div key={fav.imageId} className="image-wrapper">
              <img src={fav.imageUrl} alt={fav.label} />
              <div className="label">{fav.label}</div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="image-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              className="image-wrapper"
              style={{ position: "relative" }}
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector(".controls").style.display =
                  "block")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector(".controls").style.display =
                  "none")
              }
            >
              <img
                src={img.urls.small}
                alt={img.alt_description}
                style={{ width: "100%", borderRadius: "6px" }}
              />
              <div
                className="controls"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  display: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(img.id)}
                  onChange={() => toggleSelect(img.id)}
                />
                <button
                  onClick={() => addToFavorites(img)}
                  style={{
                    background: "#fff",
                    borderRadius: "4px",
                    marginLeft: "5px",
                    padding: "2px 6px",
                  }}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
