import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  images: string[];
}

const GalleryContainer = styled.div`
  display: flex;
`;

const Thumbnail = styled.img`
  width: 60px; 
  height: 60px;
  margin-right: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover { border-color: #333; }
`;

const MainImage = styled.img`
  width: 400px; 
  height: auto;
  object-fit: cover;
`;

const ImageGallery: React.FC<Props> = ({ images }) => {
  const [active, setActive] = useState<string>(images[0] || '');

  return (
    <div>
      <MainImage src={active} alt="Producto" />
      <GalleryContainer>
        {images.map((img, idx) => (
          <Thumbnail
            key={idx}
            src={img}
            alt={`Vista ${idx + 1}`}
            onClick={() => setActive(img)}
          />
        ))}
      </GalleryContainer>
    </div>
  );
};

export default ImageGallery;