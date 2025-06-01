import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Documents.css";
import { getFolders } from "../../data/data";

function DocumentPictures() {
  const [documentPicturesFolder, setDocumentPicturesFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(instagramPicturesFolder);

  useEffect(() => {
    async function fetchDocumentPictures() {
      try {
        const data = await getFolders();
        setDocumentPicturesFolder(data.documentsFolder);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDocumentPictures();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Document Pictures</h1>
      <div className="documents">
        {documentPicturesFolder?.hits?.length > 0 ? (
          documentPicturesFolder?.hits?.map((singleItem) => (
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

export default DocumentPictures;
