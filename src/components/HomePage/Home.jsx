import { Link } from "react-router-dom";
import { getFolders } from "../../data/data.js";
import { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const data = await getFolders();

        setFolders(data.folders);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFolders();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div className="home">
      {folders.map((singleFolder, index) => (
        <div className="folder" key={index}>
          <Link to={`${singleFolder.name}`} className="image-link">
            <img
              src={singleFolder.images}
              alt={singleFolder.name}
              className="image"
            />
          </Link>

          <h2 className="folder-name">{singleFolder.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Home;
