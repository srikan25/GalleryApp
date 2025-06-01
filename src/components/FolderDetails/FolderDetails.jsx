import { useEffect, useRef, useState } from "react";
import { getFolders } from "../../data/data.js";
import { Link } from "react-router-dom";
import css from "./FolderDetails.module.css";
import { useLocation } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function FolderDetails({ folderName }) {
  const [folderDetails, setFolderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const videoRefs = useRef([]);
  const pathName = location.pathname.replace("/", "").replace("%20", " "); // but i like this
  const pathName2 = decodeURIComponent(location.pathname.slice(1)); //decodeURIComponent %20 --> " " and slice(1) removes first that is "/"

  // console.log(cameraFolder);
  // console.log(isLoading);

  useEffect(() => {
    async function fetchFolderDetails() {
      try {
        const data = await getFolders();
        setFolderDetails(data[folderName]);
      } catch (err) {
        console.log("Error", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFolderDetails();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{pathName2}</h1>
      <div className={css.folder}>
        {folderDetails?.hits?.length > 0 ? (
          folderDetails.hits.map((singleItem, index) => (
            <div key={singleItem.id} className={css.pics}>
              {singleItem.type === "photo" ? (
                <Link to={`image/${singleItem.id}`}>
                  <img
                    src={singleItem.largeImageURL}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Link>
              ) : (
                <Link
                  to={`image/${singleItem.id}`}
                  onMouseEnter={() => {
                    if (videoRefs.current[index]) {
                      try {
                        videoRefs.current[index].play();
                      } catch (err) {
                        console.error("Autoplay failed:", err);
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    if (videoRefs.current[index]) {
                      videoRefs.current[index].pause();
                    }
                  }}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={singleItem.videos.medium.url}
                    alt=""
                    style={{ width: "100%" }}
                    // autoPlay
                    loop
                    muted
                  ></video>
                </Link>
              )}
            </div>
          ))
        ) : (
          <p>No Images Found</p>
        )}
        <Link to={"/"}>
          <KeyboardBackspaceIcon className={css.backArrow} />
        </Link>
        {/* <Link>
          <AddAPhotoIcon className={css.addIcon} />
        </Link> */}

        <label htmlFor="file-input">
          <AddAPhotoIcon className={css.addIcon} />
          <input
            type="file"
            name="avatar"
            id="file-input"
            accept=".jpg,.jpeg,.png"
            // onChange={handleFileInputChange}
            className={css.srOnly}
          />
        </label>
      </div>
    </div>
  );
}

export default FolderDetails;
