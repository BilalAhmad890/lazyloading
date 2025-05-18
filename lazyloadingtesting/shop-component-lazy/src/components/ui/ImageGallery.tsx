import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageGalleryProps {
  images: string[];
  productTitle: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productTitle }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    arrows: true,
    className: "w-full rounded-lg overflow-hidden bg-white shadow-sm"
  };
  
  // If no images are available, show a placeholder
  if (!images.length) {
    return <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"/>;
  }
  
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((image, index) => {
          // Prepend API URL if the image path is relative
          const fullImageUrl = image.startsWith('http') ? image : `${apiUrl}${image}`;
          
          return (
            <div key={`${productTitle} - pic${index + 1}`} className="outline-none">
              <img 
                src={fullImageUrl}
                alt={`${productTitle} - pic${index + 1}`}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageGallery;