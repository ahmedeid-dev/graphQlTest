import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_USER } from './../../lib/GraphQl/Queries';
import { useNavigate, useParams } from 'react-router-dom';

export default function ShowOne() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    else {
      navigate(`/users/show/${id}`);
      return;
    }
  }, [])
  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_USER,
    { variables: { id: parseInt(id) } }
  )

  const [user, setUser] = useState({
    id: '',
    username: '',
  })
  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/users')
  }
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return <>

    <div className="flex flex-col gap-2">
      <p className="text-3xl font-bold border rounded-md p-3 m-3">ID: {user?.user?.id}</p>
      <p className="text-3xl font-bold border rounded-md p-3 m-3">User Name: {user?.user?.username}</p>
      <p className="text-3xl font-bold border rounded-md p-3 m-3">Type: {user?.user?.__typename}</p>
    </div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3" onClick={() => handleBack()}>Back</button>
  </>
}
