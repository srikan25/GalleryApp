import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import css from "./Videos.module.css";
import { getFolders } from "../../data/data";

function Videos() {
  const [videoFolder, setVideoFolder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef([]);

  // console.log(videoFolder);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = await getFolders();
        setVideoFolder(data.videoFolder);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (isLoading) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Videos</h1>
      <div className={css.video}>
        {videoFolder?.hits?.length > 0 ? (
          videoFolder?.hits?.map((singleItem, index) => (
            <div key={singleItem.id} className={css.pics}>
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

export default Videos;
