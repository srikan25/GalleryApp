import { Link, useParams } from "react-router-dom";
import css from "./ImageDetailsForAll.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { getFolders } from "../../data/data";
import { useEffect, useState } from "react";

function ImageDetailsForAll({ folderName }) {
  const [allPhotosData, setAllPhotosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  // console.log(id);

  useEffect(() => {
    const fetchAllPhotos = async () => {
      try {
        const data = await getFolders();
        setAllPhotosData(data[folderName]);
      } catch (err) {
        console.log("Error", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPhotos();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  const imageData = allPhotosData.find((item) => item.id === Number(id));

  if (!imageData) {
    return <h1>Details Not Found</h1>;
  }

  return imageData.type === "image" ? (
    <div className={css.detailsContainer}>
      <h1 className={css.title}>{imageData.tags.split(",")[0]}</h1>
      <img src={imageData.image} alt={imageData.title} className={css.image} />
      <h2 className={css.description}>{imageData.description}</h2>
      <Link to={"/All photos"}>
        <CloseIcon className={css.closeIcon} />
      </Link>
    </div>
  ) : (
    <div className={css.detailsContainer}>
      <h1 className={css.title}>{imageData.tags.split(",")[0]}</h1>
      <video
        src={imageData.video}
        alt={imageData.title}
        className={css.video}
      ></video>
      <h2 className={css.description}>{imageData.description}</h2>
      <Link to={"/All photos"}>
        <CloseIcon className={css.closeIcon} />
      </Link>
    </div>
  );
}

export default ImageDetailsForAll;
