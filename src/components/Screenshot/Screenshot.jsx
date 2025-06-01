import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Screenshot.css";
import { getFolders } from "../../data/data";

function Screenshots() {
  const [screenshotsFolder, setScreenshotFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const videoRef = useRef(null);

  // console.log(screenshotsFolder);

  useEffect(() => {
    async function fetchScreenshots() {
      try {
        const data = await getFolders();
        setScreenshotFolder(data.screenshotsFolder);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchScreenshots();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Screenshots</h1>
      <div className="screenshots">
        {screenshotsFolder?.hits?.length > 0 ? (
          screenshotsFolder?.hits?.map((singleItem) => (
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
          <p>No images found</p>
        )}
      </div>
    </div>
  );
}

export default Screenshots;
