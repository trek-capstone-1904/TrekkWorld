import React, {useContext} from 'react'
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import "firebase/firestore";
const Firestore = React.createContext();


function CountriesSelect (props) {
  console.log(Firestore)
  const { Countries } = useContext(Firestore);
  const [value, loading, error] = useCollection(Countries);
  if (error) throw error;
  if (loading) return null;
  console.log("Countries", value.docs.map(d => d.data().name));
  return (
    <select {...props}>
      <option>Select...</option>
      {value.docs.map(doc => (
        <option key={doc.id} value={doc.id}>
          {doc.data().name}
        </option>
      ))}
    </select>
  );
}

export default CountriesSelect


