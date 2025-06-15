import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from 'axios';
import ImageGrid from './ImageGrid';
import PaginationControls from './PaginationControls';
import SearchBar from './SearchBar';
import DownloadButton from './DownloadButton';


const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const ImageSearchApp = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) fetchImages();
  }, [page, perPage]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query, per_page: perPage, page },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      });
      setImages(response.data.results);
      setError('');
      await axios.post('/api/searches', { query, timestamp: new Date() });
    } catch (err) {
      setError('API rate limit exceeded or failed request.');
    }
  };

  const handleSelect = (img) => {
    const exists = selectedImages.find((i) => i.id === img.id);
    setSelectedImages(
      exists ? selectedImages.filter((i) => i.id !== img.id) : [...selectedImages, img]
    );
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    const folder = zip.folder('images');
    for (const img of selectedImages) {
      const response = await fetch(img.urls.small);
      const blob = await response.blob();
      folder.file(`${img.id}.jpg`, blob);
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'images.zip');
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <SearchBar
        query={query}
        setQuery={setQuery}
        fetchImages={fetchImages}
        perPage={perPage}
        setPerPage={setPerPage}
      />

      {error && <p className="text-red-600">{error}</p>}

      <ImageGrid
        images={images}
        selectedImages={selectedImages}
        handleSelect={handleSelect}
      />

      <DownloadButton
        selectedCount={selectedImages.length}
        handleDownload={handleDownload}
      />

      <PaginationControls page={page} setPage={setPage} />
    </div>
  );
};

export default ImageSearchApp;