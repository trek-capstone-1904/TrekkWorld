import React from "react";
import db from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Card, Image, Spinner, Modal } from "react-bootstrap";
import { PhotoLoad } from "../index";

export const TripAlbum = props => {
  const [value, loading, error] = useCollection(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("Images"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  function imageArr() {
    return value.docs.map(image => ({
      original: image.data().URL,
      media: "(max-width:10px"
    }));
  }

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    return (
      <div>
        <div style={{ maxWidth: "30vw", maxHeight: "40vh", minWidth: "20vw" }}>
          {imageArr().length > 0 && (
            <ImageGallery width="10rem" items={imageArr()} />
          )}
        </div>

        <hr />
        <div>
          {value && (
            <span>
              {value.docs.map(doc => (
                <Image
                  style={{ maxHeight: "7rem", margin: ".2rem" }}
                  key={doc.id}
                  src={doc.data().URL}
                  thumbnail
                />
              ))}
            </span>
          )}
        </div>
      </div>
    );
  }
};

export default TripAlbum;
