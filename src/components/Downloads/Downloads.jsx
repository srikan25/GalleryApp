import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Downloads.css";
import { getFolders } from "../../data/data";

function Downloads() {
  const [downloadsFolder, setDownloadsFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const videoRef = useRef(null);

  // console.log(downloadsFolder);

  useEffect(() => {
    async function fetchDownloads() {
      try {
        const data = await getFolders();
        setDownloadsFolder(data.downloadsFolder);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDownloads();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Downloads</h1>
      <div className="downloads">
        {downloadsFolder?.hits?.length > 0 ? (
          downloadsFolder?.hits?.map((singleItem) => (
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
          <p>No data found</p>
        )}
      </div>
    </div>
  );
}

export default Downloads;
