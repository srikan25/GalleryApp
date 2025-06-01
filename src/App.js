import "./App.css";
import Camera from "./components/Camera/Camera";
import Home from "./components/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import Videos from "./components/Videos/Videos";
import Screenshots from "./components/Screenshot/Screenshot";
import Downloads from "./components/Downloads/Downloads";
import DCIM from "./components/DCIM/DCIM";
import WhatappPictures from "./components/Whatsapp/Whatsapp";
import InstagramPictures from "./components/Instagram/Instagram";
import Screenrecordings from "./components/Screenrecords/Screenrecords";
import DocumentPictures from "./components/Documents/Documents";
import OtherPictures from "./components/Others/Others";
import AllPics from "./components/AllPics/AllPics";
import ImageDetailsForAll from "./components/ImageDetailsForAll/ImageDetailsForAll";
import ImageDetails from "./components/ImageDetails/ImageDetails";
import FolderDetails from "./components/FolderDetails/FolderDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/All photos" element={<AllPics />} />
      <Route
        path="/Camera"
        element={<FolderDetails folderName="cameraFolder" />}
      />
      <Route
        path="/Videos"
        element={<FolderDetails folderName="videoFolder" />}
      />
      <Route
        path="/Screenshots"
        element={<FolderDetails folderName="screenshotsFolder" />}
      />
      <Route
        path="/Downloads"
        element={<FolderDetails folderName="downloadsFolder" />}
      />
      <Route path="/DCIM" element={<FolderDetails folderName="DCIMFolder" />} />
      <Route
        path="/Whatsapp Pictures"
        element={<FolderDetails folderName="whatsappFolder" />}
      />
      <Route
        path="/Instagram Pictures"
        element={<FolderDetails folderName="instagramFolder" />}
      />
      <Route
        path="/Screen Recordings"
        element={<FolderDetails folderName="screenRecordFolder" />}
      />
      <Route
        path="/Documents"
        element={<FolderDetails folderName="documentsFolder" />}
      />
      <Route
        path="/Other Albums"
        element={<FolderDetails folderName="othersFolder" />}
      />
      <Route
        path="All photos/image/:id"
        element={<ImageDetailsForAll folderName="AllPhotosData" />}
      />
      <Route
        path="Camera/image/:id"
        element={<ImageDetails folderName="cameraFolder" folderURL="Camera" />}
      />
      <Route
        path="Screenshots/image/:id"
        element={
          <ImageDetails
            folderName="screenshotsFolder"
            folderURL="Screenshots"
          />
        }
      />
      <Route
        path="Downloads/image/:id"
        element={
          <ImageDetails folderName="downloadsFolder" folderURL="Downloads" />
        }
      />{" "}
      <Route
        path="DCIM/image/:id"
        element={<ImageDetails folderName="DCIMFolder" folderURL="DCIM" />}
      />{" "}
      <Route
        path="Whatsapp Pictures/image/:id"
        element={
          <ImageDetails
            folderName="whatsappFolder"
            folderURL="Whatsapp Pictures"
          />
        }
      />
      <Route
        path="Instagram Pictures/image/:id"
        element={
          <ImageDetails
            folderName="instagramFolder"
            folderURL="Instagram Pictures"
          />
        }
      />{" "}
      <Route
        path="Documents/image/:id"
        element={
          <ImageDetails folderName="documentsFolder" folderURL="Documents" />
        }
      />{" "}
      <Route
        path="Other Albums/image/:id"
        element={
          <ImageDetails folderName="othersFolder" folderURL="Other Albums" />
        }
      />
      <Route
        path="Videos/image/:id"
        element={<ImageDetails folderName="videoFolder" folderURL="Videos" />}
      />
      <Route
        path="Screen Recordings/image/:id"
        element={
          <ImageDetails
            folderName="screenRecordFolder"
            folderURL="Screen Recordings"
          />
        }
      />
    </Routes>
  );
}

export default App;
