import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_USERS_QUERY } from "./../../lib/GraphQl/Queries"
import DataTable from "./Components/Table"
import { useNavigate } from "react-router-dom"
export default function Users() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    else {
      navigate('/users');
      return;
    }
  }, [])
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {

  })
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/')

  }
  return <>
    <div className="flex justify-end p-4">

      <button
        onClick={() => handleLogout()}
        className="bg-blue-500 flex hover:bg-blue-700 text-white font-bold py-2 px-10 my-2 rounded">
        Logout
      </button>
    </div>

    <DataTable result={users?.listUsers?.data} />
  </>
}
