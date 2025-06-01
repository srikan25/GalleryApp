import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Screenrecords.css";
import { getFolders } from "../../data/data";

function Screenrecordings() {
  const [screenrecordingsFolder, setScreenrecordingsFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef([]);

  // console.log(screenrecordingsFolder);

  useEffect(() => {
    async function fetchScreenrecordVideos() {
      try {
        const data = await getFolders();
        setScreenrecordingsFolder(data.screenRecordFolder);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchScreenrecordVideos();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Screen Recordings</h1>
      <div className="screen-records">
        {screenrecordingsFolder?.hits?.length > 0 ? (
          screenrecordingsFolder?.hits?.map((singleItem, index) => (
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
                  // autoPlay
                  loop
                  muted
                  // onMouseEnter={() => videoRef.current.play()}
                  // onMouseDown={() => videoRef.current.pause()}
                ></video>
              </Link>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
}

export default Screenrecordings;
