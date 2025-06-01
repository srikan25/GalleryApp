import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Others.css";
import { getFolders } from "../../data/data";

function OtherPictures() {
  const [otherPicturesFolder, setOtherPicturesFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(otherPicturesFolder);

  useEffect(() => {
    async function fetchOtherPictures() {
      try {
        const data = await getFolders();
        setOtherPicturesFolder(data.othersFolder);
      } catch (err) {
        console.log("Error", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOtherPictures();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Other Albums</h1>
      <div className="others">
        {otherPicturesFolder?.hits?.length > 0 ? (
          otherPicturesFolder?.hits?.map((singleItem) => (
            <div key={singleItem.id} className="pics">
              <Link to={`image/${singleItem.id}`}>
                <img
                  src={singleItem.largeImageURL}
                  alt="whatsapp-image"
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

export default OtherPictures;
