import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Whatsapp.css";
import { getFolders } from "../../data/data";

function WhatappPictures() {
  const [whatappPicturesFolder, setWhatappPicturesFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(whatappPicturesFolder);

  useEffect(() => {
    async function fetchWhatappPictures() {
      try {
        const data = await getFolders();
        setWhatappPicturesFolder(data.whatsappFolder);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWhatappPictures();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Whatsapp Pictures</h1>
      <div className="whatsapp">
        {whatappPicturesFolder?.hits?.length > 0 ? (
          whatappPicturesFolder?.hits?.map((singleItem) => (
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

export default WhatappPictures;
