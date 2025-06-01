import { useEffect, useState } from "react";
import { getFolders } from "../../data/data.js";
import { Link } from "react-router-dom";
import "./Camera.css";

function Camera() {
  const [cameraFolder, setCameraFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(cameraFolder);
  // console.log(isLoading);

  useEffect(() => {
    async function fetchCameraImages() {
      try {
        const data = await getFolders();
        setCameraFolder(data.cameraFolder);
      } catch (err) {
        console.log("Error", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCameraImages();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Camera Pictures</h1>
      <div className="camera">
        {cameraFolder?.hits?.length > 0 ? (
          cameraFolder.hits.map((singleItem) => (
            <div key={singleItem.id} className="pics">
              <Link to={`image/${singleItem.id}`}>
                <img
                  src={singleItem.largeImageURL}
                  alt=""
                  style={{ width: "100%" }}
                />
              </Link>
            </div>
          ))
        ) : (
          <p>No Images Found</p>
        )}
      </div>
    </div>
  );
}

export default Camera;
