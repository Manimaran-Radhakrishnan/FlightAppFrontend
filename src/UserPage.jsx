import React, { useContext, useEffect, useState } from "react";
import logopng from "./assets/pngwing.png";
import { Modal, Button, Form } from "react-bootstrap";
import "./Search.css";
import { myContext } from "./App";
import axios from "axios";
import "./UserPage.css";
import { useNavigate } from "react-router-dom";

function UserPage(props) {
  const {
    username,
    setUsername,
    emailid,
    setemailid,
    loggedin,
    setLoggedin,
    userList,
    setUserList,
  } = useContext(myContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [show, setshow] = useState(true);

  const handleShowLogin = () => setShowLogin(true);
  const handleShowSignup = () => setShowSignup(true);

  const navigate = useNavigate();

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = async () => {
    try {
      const bookedList = await axios.post(
        "https://fligthback.onrender.com/api/getBooking",
        { username: username }
      );

      setUserList(bookedList.data.data);

      console.log("BL", bookedList);
      setshow(false);
    } catch (error) {
      console.log("error in fetching user details", error);
    }
  };
  console.log("ddddd", userList);

  console.log("UL", userList);
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedin(false);

    navigate("/loading");

    setTimeout(() => {
      navigate("/search");
    }, 4000);
  };

  const handleBack = () => {
    navigate("/loading");

    setTimeout(() => {
      navigate("/Search");
    }, 4000);
  };

  const handleChart = () => {
    navigate("/loading");

    setTimeout(() => {
      navigate("/userchart");
    }, 4000);
  };

  ////////////////////////////////////////////////////////////////////chart//////////////////

  return (
    <div className="">
      <div>
        <header>
          <div className="headbox d-flex">
            <div className="logo">
              {" "}
              <img className="logoimg" src={logopng} alt="" />
              <span className="brand">Maran_Airways </span>
            </div>

            <div className="logreg mx-5">
              <Button
                className=" mb-1 mt-1 mx-5 signup"
                variant="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button
                className=" mb-1 mt-1 mx-5 signup"
                variant="primary"
                onClick={handleBack}
              >
                Go Back
              </Button>
            </div>
          </div>
        </header>

        <main>
          <div className="userpagemain container-fluid text-center">
            <h1 className="geninfohead ">General Information</h1>

            <div className="geninfo container-fluid mx-auto">
              <table className="table table-bordered table-responsive">
                <tr>
                  <th> User Name </th>
                  <td> {username} </td>
                </tr>
                <tr>
                  <th> E-mail id</th>
                  <td> {emailid}</td>
                </tr>
              </table>
            </div>

            <div className="bookhistory containerfluid">
              <h1 className="bookhistit">Booking History</h1>
              

              {userList &&
                userList.map((item, index) => {
                  let p = 1;

                  return (
                    <div key={index} className="userdoc text-center container">
                      <h2 className="passdh">
                        <table className="table">
                          <tr>
                            <th>Booked Date </th>

                            <th>{item.bookedDate}</th>
                          </tr>
                        </table>
                      </h2>

                      <div className="bk1 mx-auto">
                        <table className="table table-bordered table-responsive ">
                          <tr>
                            <td>Airline</td>
                            <td>{item.airline} </td>
                          </tr>
                          <tr>
                            <td> Arrival Date</td>
                            <td> {item.departureDate}</td>
                          </tr>
                          <tr>
                            <td>Departure Date </td>
                            <td> {item.departureDate}</td>
                          </tr>
                          <tr>
                            <td> Departure Airport </td>
                            <td> {item.departureAirport}</td>
                          </tr>
                          <tr>
                            <td>Arrival Airport</td>
                            <td> {item.arrivalAirport}</td>
                          </tr>
                          <tr>
                            <td> Class</td>
                            <td> {item.cabinClass}</td>
                          </tr>

                          <tr>
                            <td> Flight Number</td>

                            <td> {item.flightNumber}</td>
                          </tr>
                        </table>
                      </div>
                      <div className="passengerlist container ">
                        <div className="passdetails container-fluid row ">
                          {item.passengerDetails.map((current, index) => {
                            return (
                              <div
                                className=" col-6 container-fluid bk2 mt-3"
                                key={index}
                              >
                                <h4 className="passdhead">PASSENGER DETAILS{p++}</h4>
                                <table className="table table-bordered table-responsive bktab">
                                  <tr>
                                    <td>Name</td>
                                    <td>{current.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Age</td>
                                    <td>{current.age}</td>
                                  </tr>
                                  <tr>
                                    <td>Gender</td>
                                    <td>{current.gender}</td>
                                  </tr>
                                  <tr>
                                    <td>Mobile</td>
                                    <td>{current.mobile}</td>
                                  </tr>
                                  <tr>
                                    <td>Email</td>
                                    <td>{current.email} </td>
                                  </tr>
                                  <tr>
                                    <td>Seat Number</td>
                                    <td>{current.seatNumber} </td>
                                  </tr>
                                </table>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserPage;
