import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DCIM.css";
import { getFolders } from "../../data/data";

function DCIM() {
  const [DCIMFolder, setDCIMFolder] = useState([]);
  const [isLoading, setIsLoadiong] = useState(true);

  // console.log(DCIMFolder);

  useEffect(() => {
    async function fetchDCIM() {
      try {
        const data = await getFolders();
        setDCIMFolder(data.DCIMFolder);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadiong(false);
      }
    }
    fetchDCIM();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>DCIM</h1>
      <div className="dcim">
        {DCIMFolder?.hits?.length > 0 ? (
          DCIMFolder?.hits?.map((singleItem) => (
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

export default DCIM;
