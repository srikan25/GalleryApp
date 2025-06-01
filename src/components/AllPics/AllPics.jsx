import { useEffect, useRef, useState } from "react";
import { getFolders } from "../../data/data";
import "./Allpics.css";
import { Link } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AllPics() {
  const videoRefs = useRef([]);
  const [allPhotosData, setAllPhotosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(allPhotosData);

  useEffect(() => {
    const fetchAllPhotos = async () => {
      try {
        const data = await getFolders();
        setAllPhotosData(data.AllPhotosData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPhotos();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All albums</h1>
      <div className="allPics">
        {allPhotosData.length > 0 ? (
          allPhotosData.map((singleItem, index) =>
            singleItem.type === "image" ? (
              <div key={singleItem.id} className="pics">
                <Link to={`image/${singleItem.id}`}>
                  <img
                    src={singleItem.image}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Link>
              </div>
            ) : (
              <div key={singleItem.id} className="pics">
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
                    loop
                    muted
                  ></video>
                </Link>
              </div>
            )
          )
        ) : (
          <h1
            style={{
              textAlign: "right",
              color: "darkblue",
              fontSize: "25px",
              fontWeight: "bold",
              marginRight: "auto",
            }}
          >
            No data found
          </h1>
        )}

        <Link to={"/"}>
          <ArrowBackIcon className="back-arrow" />
        </Link>

        <label htmlFor="file-input">
          <AddPhotoAlternateIcon className="add-icon" />
          <input
            type="file"
            name="avatar"
            id="file-input"
            accept=".jpg,.jpeg,.png"
            // onChange={handleFileInputChange}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
}

export default AllPics;
