import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../../firebase";

import { Spinner } from "react-bootstrap";
import TripResultCard from "../Helper/TripResultCard";

export const TripListItem = props => {
  const [value, loading, error] = useDocument(db.doc(`Trips/${props.tripId}`), {
    valueListenOptions: { includeMetadataChanges: true }
  });

  return (
    <>
      {error && <strong>Error: {error}</strong>}
      {loading && <Spinner animation="grow" variant="info" />}
      {value && (
        <TripResultCard
          userProfile={true}
          tripId={props.tripId}
          card={value.data()}
        />
      )}
    </>
  );
};

export default TripListItem;
