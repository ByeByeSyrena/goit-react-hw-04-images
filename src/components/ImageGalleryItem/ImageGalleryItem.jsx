import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, id, onImageClick }) => {
  return (
    <li className={css.galleryItem} key={id} onClick={() => onImageClick(id)}>
      <img src={image} alt="cat" className={css.image} />
    </li>
  );
};

export default ImageGalleryItem;
