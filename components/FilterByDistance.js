import React, { useLayoutEffect, useState, useContext, useEffect } from "react";
import { getAllUsers, getUserDetails } from "../db/firestore";
// import * as geolib from 'geolib';
import { getDistance, convertDistance } from "geolib";
import { UserContext } from "../contexts/User";

import { Text } from "react-native";

const FilterByDistance = ({ item }) => {
  const { user, setUser } = useContext(UserContext);
  const [distance, setDistance] = useState();
  const [userHasBook, setUserHasBook] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({coordinates: {
    longitude: "",
    latitude: ""
  }});
  // console.log(books, "<< list of books on app");

  //only calculate distance once
  useLayoutEffect(() => {
    const fetchUserDetails = async () => {

      const result = await getAllUsers();
      for (let i = 0; i < result.length; i++) {
        if (result[i].uid === item.uid) {
          setUserHasBook(result[i]);
      }
    };
    fetchUserDetails();
    calculateBookDistance(loggedInUser);
  }, []);

  // }, [getAllUsers, item]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getUserDetails(user);
      if (result.uid === user) {
        setLoggedInUser(result);
        console.log("here")
        console.log(loggedInUser)
      }
    };
    fetchUserDetails();
  }, [getUserDetails]);

  // calculationg distance to each book
  const calculateBookDistance = (user) => {
    setDistance(
      convertDistance(
        getDistance(
          {
            latitude: loggedInUser.coordinates.latitude,
            longitude: loggedInUser.coordinates.longitude,
          },
          {
            latitude: String(userHasBook.coordinates.latitude),
            longitude: String(userHasBook.coordinates.longitude),
          }
        ),
        "mi"
      ).toFixed(2) + " mile's away"
    );
  };

  //   console.log(books[1].users.userHas.user[0].address.geo, "<< other user");


  return <Text>{distance}</Text>;
};

export default FilterByDistance;
