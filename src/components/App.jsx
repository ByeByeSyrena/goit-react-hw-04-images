import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImgs } from '../api';
import { Audio } from 'react-loader-spinner';
import Button from './Button/Button';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

function App() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  const loadImages = useCallback(async (searchQuery, pageNum) => {
    setIsLoading(true);
    try {
      const fetchedImages = await fetchImgs(searchQuery, pageNum);
      const { hits, totalHits } = fetchedImages;
      setTotalHits(totalHits);
      setImages(prevImages => [...prevImages, ...hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchItem !== '' || page !== 1) {
      loadImages(searchItem, page);
    }
  }, [searchItem, page, loadImages]);

  useEffect(() => {
    if (images.length >= totalHits) {
      setAllImagesLoaded(true);
    } else {
      setAllImagesLoaded(false);
    }
  }, [images, totalHits]);

  const handleSubmit = searchQuery => {
    setSearchItem(searchQuery);
    setPage(1);
    setImages([]);
    setAllImagesLoaded(false);
    setSelectedImage(null);
  };

  const showMoreImages = () => {
    if (!allImagesLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const showSelectedImage = selectedImage => {
    setSelectedImage(selectedImage);
    toggleModal();
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={showSelectedImage} />
      )}
      {isLoading && (
        <Audio
          height={80}
          width={80}
          radius={9}
          color="green"
          ariaLabel="loading"
          wrapperStyle={{ position: 'absolute', top: '50%', left: '50%' }}
        />
      )}
      {images.length > 0 && (
        <Button
          text="Load more"
          disabled={allImagesLoaded}
          clickHandle={showMoreImages}
          isLoading={isLoading}
        />
      )}
      {showModal && (
        <Modal onClick={toggleModal}>
          {selectedImage && (
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          )}
        </Modal>
      )}
    </AppContainer>
  );
}

export default App;
