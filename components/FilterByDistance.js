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
  const [loggedinUser, setLoggedInUser] = useState("");
  // console.log(books, "<< list of books on app");

  //only calculate distance once
  useLayoutEffect(() => {
    calculateBookDistance();
  }, []);

  //
  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getAllUsers();
      console.log(item.uid, "<< book id");
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].uid, "<< users id");
        if (result[i].uid === item.uid) {
          setUserHasBook(result[i]);
        }
      }
    };
    fetchUserDetails();
  }, [item]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getUserDetails(user);
      if (result.uid === user) {
        setLoggedInUser(result);
      }
    };
    fetchUserDetails();
  }, [getUserDetails]);

  console.log(userHasBook.coordinates, "<< user that has book");

  console.log(loggedinUser.coordinates, "<< logged in user");

  // calculationg distance to each book
  const calculateBookDistance = () => {
    setDistance(
      convertDistance(
        getDistance(
          {
            latitude: loggedinUser.coordinates.latitude,
            longitude: loggedinUser.coordinates.longitude,
          },
          {
            latitude: String(userHasBook.coordinates.latitude),
            longitude: String(userHasBook.coordinates.longitude),
          }
        ),
        "mi"
      ).toFixed(2) + " mile's away"
    );
    //   books.map((book) => {
    //     return {
    //       ...book,
    //       distance:
    //         convertDistance(
    //           getDistance(
    //             {
    //               latitude: loggedinUser.address.geo.lat,
    //               longitude: loggedinUser.address.geo.lng,
    //             },
    //             {
    //               latitude: String(book.users.userHas.user[0].address.geo.lat),
    //               longitude: String(book.users.userHas.user[0].address.geo.lng),
    //             }
    //           ),
    //           "mi"
    //         ).toFixed(2) + " miles away",
    //     };
    //   })
  };

  //   console.log(books[1].users.userHas.user[0].address.geo, "<< other user");
  console.log(distance, `<< distance between this book and logged in user`);

  return <Text>{distance}</Text>;
};

export default FilterByDistance;
