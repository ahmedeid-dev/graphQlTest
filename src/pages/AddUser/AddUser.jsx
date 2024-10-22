import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_USER } from '../../lib/GraphQl/Mutations';
import Account from './Components/Account';
import Tags from './Components/Roles';
import SwitchLabels from './Components/Switch';
export default function AddUser() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    else {
      navigate('/users/add');
      return;
    }
  }, [])
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState([]);

  const [isCustomer, setIsCustomer] = React.useState(false)
  const [isDelivery, setIsDelivery] = React.useState(false)
  const [roles, setRoles] = useState([]);
  const [customer, setData] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setRoles(role?.map((role) => role?.id));
  }, [role]);
  const [saveUser, { loading, error, data }] = useMutation(ADD_USER, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      alert("User added successfully!");
      navigate('/users')
    },
    onError: (err) => {
      alert("User not added!");
      window.location.reload();
      // console.error('Error:', err);
    },
  });
  const handleAdd = (e) => {
    e.preventDefault();

    const input = {
      username,
      password,
      roles,
      accountId: customer,
      active: isActive,
      branches: [],
    };
    saveUser({ variables: { input } });
  };

  const handleBack = () => {
    navigate('/users')
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <>
    <div className="grid place-items-center  my-16">
      <div className="w-full border rounded-md p-4">
        <form
          onSubmit={handleAdd}
          className="bg-white overflow-hidden grid grid-cols-2 gap-4 shadow-md rounded  px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex w-full col-span-2 justify-end">
            <SwitchLabels setIsActive={setIsActive} isActive={isActive} />

          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>

          <div className="mb-6">
            <Tags setRole={setRole} role={role} setIsCustomer={setIsCustomer} setIsDelivery={setIsDelivery} />
          </div>

          <div className="mb-6">
            <Account setData={setData} customer={customer} option={isCustomer ? "isCustomer" : isDelivery ? "isDelivery" : null} />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full col-span-2"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Add'}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-4">
              {error.message}
            </p>
          )}

          {data?.login?.token && (
            <p className="text-green-500 text-center mt-4">
              Success
            </p>
          )}
          <button className="bg-red-500 w-[100%] col-span-2 m-auto hover:bg-red-700  text-white font-bold py-2 px-4 rounded " onClick={() => handleBack()}>Back</button>
        </form>
      </div>
    </div>

  </>
}
