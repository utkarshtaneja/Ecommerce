import { useEffect, useState } from "react";
import "./Header.css";
import image from "../../assets/image";

const headings = [
  "Explore our new collection",
  "Discover the latest technologies",
  "Find your perfect style",
  "Shop some exclusive deals",
];

const images = [image.laptop, image.mobile, image.camera, image.Header_head, image.Header_mouse, image.Header_speaker];

const Header = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentHeading, setCurrentHeading] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fullText = headings[currentHeading];
    const typingSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentHeading((prev) => (prev + 1) % headings.length);
      }

      setDisplayedText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1);
        } else {
          return fullText.slice(0, prev.length + 1);
        }
      });
    };

    const typingInterval = setInterval(handleTyping, typingSpeed);
    return () => clearInterval(typingInterval);
  }, [displayedText, currentHeading, isDeleting]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <img src={images[currentImage]} alt="" className="header-image" />
      </div>
      <div className="header-right">
        <div className="heading-container">
          <h2>{displayedText}</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;