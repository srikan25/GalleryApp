async function getPictures(query) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=49074804-80305d16e00c36e04166869d0&q=${query}&image_type=photo&pretty=truex`
    );
    const pictures = await response.json();

    return pictures;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getVideos(query) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/videos/?key=49074804-80305d16e00c36e04166869d0&q=${query}`
    );
    const videos = await response.json();
    // console.log(screenRecordPictures.hits[0].videos.large.thumbnail);

    return videos;
  } catch (err) {
    console.log(err);
    return [];
  }
}

const displayImg = (folderName) => {
  if (folderName.hits[0].type === "photo") {
    return folderName.hits[0].largeImageURL;
  }
  return folderName.hits[0].videos.large.thumbnail;
};

export async function getFolders() {
  const cameraFolder = await getPictures("bikes");
  const videoFolder = await getVideos("flowers");
  const screenshotsFolder = await getPictures("nature");
  const downloadsFolder = await getPictures("animals");
  const DCIMFolder = await getPictures("city");
  const whatsappFolder = await getPictures("birds");
  const instagramFolder = await getPictures("rain");
  const screenRecordFolder = await getVideos("Autumn");
  const documentsFolder = await getPictures("documents");
  const othersFolder = await getPictures("mountains");

  const AllPhotosData = [
    ...othersFolder.hits.map((item) => ({
      ...item,
      type: "image",
      image: item.largeImageURL,
    })),
    ...videoFolder.hits.map((item) => ({
      ...item,
      type: "video",
      image: item.videos?.medium?.thumbnail,
      video: item.videos?.medium?.url,
    })),

    ...screenshotsFolder.hits.map((item) => ({
      ...item,
      type: "image",
      image: item.largeImageURL,
    })),

    ...downloadsFolder.hits.map((item) => ({
      ...item,
      type: "image",
      image: item.largeImageURL,
    })),
    ...cameraFolder.hits.map((item) => ({
      ...item,
      type: "image",
      image: item.largeImageURL,
    })),

    ...DCIMFolder.hits.map((item) => ({
      ...item,
      type: "image",
      image: item.largeImageURL,
    })),

    ...whatsappFolder.hits.map((item) => ({
      ...item,
      type: "image",
      image: item.largeImageURL,
    })),

    ...instagramFolder.hits.map((item) => ({
      ...item,
      type: "image",
      image: item.largeImageURL,
    })),

    ...screenRecordFolder.hits.map((item) => ({
      ...item,
      type: "video",
      image: item.videos?.medium?.thumbnail,
      video: item.videos?.medium?.url,
    })),

    ...documentsFolder.hits.map((item) => ({
      ...item,
      type: "image",
      image: item.largeImageURL,
    })),
  ];

  // console.log(AllPhotosData);

  const allImagesPreview =
    AllPhotosData[0].type === "video"
      ? AllPhotosData[0].videos.large.thumbnail
      : AllPhotosData[0].largeImageURL;

  const folders = [
    {
      name: "All photos",
      images: allImagesPreview,
    },
    {
      name: "Camera",
      images: displayImg(cameraFolder),
    },
    {
      name: "Videos",
      images: displayImg(videoFolder),
    },
    {
      name: "Screenshots",
      images: displayImg(screenshotsFolder),
    },
    {
      name: "Downloads",
      images: displayImg(downloadsFolder),
    },
    {
      name: "DCIM",
      images: displayImg(DCIMFolder),
    },
    {
      name: "Whatsapp Pictures",
      images: displayImg(whatsappFolder),
    },
    {
      name: "Instagram Pictures",
      images: displayImg(instagramFolder),
    },
    {
      name: "Screen Recordings",
      images: displayImg(screenRecordFolder),
    },
    {
      name: "Documents",
      images: displayImg(documentsFolder),
    },
    {
      name: "Other Albums",
      images: displayImg(othersFolder),
    },
  ];

  return {
    folders,
    cameraFolder,
    videoFolder,
    screenshotsFolder,
    downloadsFolder,
    DCIMFolder,
    whatsappFolder,
    instagramFolder,
    screenRecordFolder,
    documentsFolder,
    othersFolder,
    AllPhotosData,
  };
}

getFolders();
