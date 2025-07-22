import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/albums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedAlbumId !== null) {
      axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}`)
        .then((res) => setPhotos(res.data))
        .catch((err) => console.error(err));
    }
  }, [selectedAlbumId]);

  return (
    <div className="app">
      <h1>📷 Gallery App</h1>
      <div className="albums">
        <h2>Albums</h2>
        <ul>
          {albums.map((album) => (
            <li
              key={album.id}
              className={album.id === selectedAlbumId ? "active" : ""}
              onClick={() => setSelectedAlbumId(album.id)}
            >
              {album.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="photos">
        <h2>Photos {selectedAlbumId && `from Album ${selectedAlbumId}`}</h2>
        <div className="photo-grid">
          {photos.map((photo) => (
            <div className="photo-card" key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
