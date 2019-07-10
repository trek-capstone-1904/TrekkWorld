import React from 'react';
import db from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { Card, Image, Spinner, Modal } from 'react-bootstrap';
import { PhotoLoad } from '../index';

export const TripAlbum = props => {
  const [value, loading, error] = useCollection(
    db
      .collection('Trips')
      .doc(props.tripId)
      .collection('Images'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  // console.log(value && value.docs());
  function imageArr() {
    return value.docs.map(image => ({
      original: image.data().URL,
      media: '(max-width:10px',
    }));
  }
  console.log(value && imageArr());
  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    return (
      <div>
        {/* {props.fellowTrekker && <PhotoLoad from="trip" tripId={props.tripId} />} */}
        {/* <Modal show={false}> */}
          <div
            style={{ maxWidth: '30vw', maxHeight: '40vh', minWidth: '20vw' }}
          >
            {imageArr().length > 0 && (
              <ImageGallery width="10rem" items={imageArr()} />
            )}
            {/* {imageArr().length === 0 && <div>Add Images to your trip!</div>} */}
          </div>
        {/* </Modal> */}
        {/* // <Card style={{ maxWidth: '33rem' }}>
      //   <Card.Header>Trip Album</Card.Header>
      //   <Card.Body> */}
        <hr />
        <div>
          {value && (
            <span>
              {value.docs.map(doc => (
                // console.log(doc.data().URL)
                <Image
                  style={{ maxHeight: '7rem', margin: '.2rem' }}
                  key={doc.id}
                  src={doc.data().URL}
                  thumbnail
                />
              ))}
            </span>
          )}
          {/* // </Card.Body> */}
          {/* // <Card.Footer> */}
          {/* {props.fellowTrekker && (
            <PhotoLoad from="trip" tripId={props.tripId} />
          )} */}
          {/* </Card.Footer> */}
          {/* </Card> */}
        </div>
      </div>
    );
  }
};

export default TripAlbum;
