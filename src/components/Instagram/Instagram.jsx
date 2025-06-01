import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Instagram.css";
import { getFolders } from "../../data/data";

function InstagramPictures() {
  const [instagramPicturesFolder, setInstagramPicturesFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(instagramPicturesFolder);

  useEffect(() => {
    async function fetchInstagramPictures() {
      try {
        const data = await getFolders();
        setInstagramPicturesFolder(data.instagramFolder);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInstagramPictures();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Instagram Pictures</h1>
      <div className="instagram">
        {instagramPicturesFolder?.hits?.length > 0 ? (
          instagramPicturesFolder?.hits?.map((singleItem) => (
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

export default InstagramPictures;
