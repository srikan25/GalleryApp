import { Link, useParams } from "react-router-dom";
import css from "./ImageDetails.module.css";
import CloseIcon from "@mui/icons-material/Close";
import WebIcon from "@mui/icons-material/Web";
import { getFolders } from "../../data/data";
import { useEffect, useState } from "react";

function ImageDetails({ folderName, folderURL }) {
  const [allPhotosData, setAllPhotosData] = useState([]);
  const [isLoading, setIsLoadiong] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const { id } = useParams();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  // console.log(id);

  useEffect(() => {
    const fetchAllPhotos = async () => {
      try {
        // setIsLoadiong(true)
        const data = await getFolders();
        setAllPhotosData(data[folderName].hits);
      } catch (err) {
        console.log("Error", err.message);
      } finally {
        setIsLoadiong(false);
      }
    };

    fetchAllPhotos();
  }, [folderName]);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  const imageData = allPhotosData.find((item) => item.id === Number(id));

  if (!imageData) {
    return <h1>Details Not Found</h1>;
  }
  console.log(imageData);

  return (
    <div className={css.detailsContainer}>
      <h1 className={css.title}>{imageData.tags.split(",")[0]}</h1>
      {imageData.type === "photo" ? (
        <img src={imageData.largeImageURL} alt={imageData.title} />
      ) : (
        <video
          src={imageData?.videos?.large?.url}
          alt={imageData.title}
          loop
          muted
          autoPlay
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        ></video>
      )}
      {/* <h2 className={css.description}>{imageData.description}</h2> */}
      <Link to={`/${folderURL}`}>
        <CloseIcon className={css.closeIcon} />
      </Link>
      <a
        href={
          imageData.type === "photo"
            ? imageData.webformatURL
            : imageData.videos.large.url
        }
        target="_blank"
      >
        <WebIcon className={css.webIcon} />
      </a>
    </div>
  );
}

export default ImageDetails;
