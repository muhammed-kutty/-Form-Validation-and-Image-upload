import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./Redux/UserSlice";

const UserDetails = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:4001/")
        .then((res) => dispatch(register(res.data)))
        .catch((err) => console.log(err));
    };
  
    getData();
  }, [dispatch]);

  const { userDetails: userdetails } = useSelector((state) => state.user);

  let user =
    userdetails &&
    userdetails?.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <img
              style={{ width: 100 }}
              src={`http://localhost:4001/Images/${user?.image}`}
              alt=""
            />
          </td>
          <td>{user?.name}</td>
          <td>{user?.email}</td>
          <td>{user?.mobile}</td>
          <td>{user?.age}</td>
          <td>{user?.date}</td>
          <td>{user?.department}</td>
          <td>{user?.docters}</td>
          <td>{user?.gender}</td>
          <td>{user?.adress}</td>
          <td>{user?.intrestes}</td>
          <td>
            {user.langtitude}&{user.longtitude}
          </td>
        </tr>
      );
    });

  return (
    <div className="App custom-container">
      <h1>USer Details</h1>
      <div
        style={{
          width: "150px",
          backgroundColor: "black",
          margin: "30px 0 30px 80px",
          height: "45px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
        }}
      >
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          Goto Home
        </a>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SlNo.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>MobileNumber</th>
            <th>Age</th>
            <th>Date</th>
            <th>Department</th>
            <th>Docter</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Intrests</th>
            <th>Latitude&longitude</th>
          </tr>
        </thead>
        <tbody>{user}</tbody>
      </Table>
    </div>
  );
};

export default UserDetails;
