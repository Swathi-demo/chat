import React, { useEffect, useState } from 'react';

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos from the server
    fetch('/import-photos')
      .then((response) => response.json())
      .then((data) => setPhotos(data.photos))
      .catch((error) => console.error('Error fetching photos:', error));
  }, []);

  return (
    <div>
      <h2>Your Google Photos</h2>
      <div className="photo-gallery">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.baseUrl} alt={photo.filename} />
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
