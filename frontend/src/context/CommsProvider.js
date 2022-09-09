import { useState } from 'react';
import CommsContext from './CommsContext';

function CommsProvider({ children }) {
  const [editStatus, setEditStatus] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [communications, setCommunications] = useState([]);
  const [formComm, setFormComm] = useState({
    name: '',
    email: '',
    cpf: '',
    latitude: '',
    longitude: '',
    croptype: '',
    harvestdate: '',
    lossevent: 'Chuva Excessiva'
  })

  const contextValue = {
    editStatus,
    idToUpdate,
    communications,
    formComm,
    setEditStatus,
    setIdToUpdate,
    setCommunications,
    setFormComm
  };

  return (
    <CommsContext.Provider value={ contextValue }>
      { children }
    </CommsContext.Provider>
  )
}

export default CommsProvider;