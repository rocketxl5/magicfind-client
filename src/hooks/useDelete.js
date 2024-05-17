import { useState } from 'react';
import axios from 'axios';

const useDelete = () => {
  const [loading, setLoading] = useState(false);

  const deleteItem = async (url) => {

    setLoading(true)

    await axios.delete(url)
      .then(res => console.log(res))
  }


  return { deleteItem }
}

export default useDelete
