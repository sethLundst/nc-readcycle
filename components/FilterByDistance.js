import React, { useLayoutEffect, useState } from "react";
// import * as geolib from 'geolib';
import { getDistance, convertDistance } from "geolib";
import BookList from "./BookList";
import books from "./bookdata";

const FilterByDistance = () => {
  const [bookData, setBookData] = useState([]);
  const [distance, setDistance] = useState();
  const loggedinUser = {
    id: 11,
    name: "Bruce Willis",
    username: "Brucey.Wucey",
    email: "bruce.willis@hotmail.biz",
    address: {
      street: "Liberty Street",
      suite: "Suite 198",
      city: "New York",
      zipcode: "31428-2261",
      geo: {
        lat: "51.7123",
        lng: "7.49147",
      },
    },
    phone: "074-638-3404",
  };

  console.log(books, "<< list of books on app");

  //only calculate distance once
  useLayoutEffect(() => {
    calculateBookDistance();
  }, []);

  //   console.log(books[1].users.userHas.user[0].address.geo, "<< other user")

  // calculationg distance to each book
  const calculateBookDistance = () => {
    setDistance(
      // convertDistance(
      //   getDistance(
      //     {
      //       latitude: loggedinUser.address.geo.lat,
      //       longitude: loggedinUser.address.geo.lng,
      //     },
      //     {
      //      latitude: String(book.users.userHas.user[0].address.geo.lat),
      //      longitude: String(book.users.userHas.user[0].address.geo.lng),
      //                     }
      //   ),
      //   "mi"
      // ).toFixed(2) + " mile's away"

      books.map((book) => {
        return {
          ...book,
          distance:
            convertDistance(
              getDistance(
                {
                  latitude: loggedinUser.address.geo.lat,
                  longitude: loggedinUser.address.geo.lng,
                },
                {
                  latitude: String(book.users.userHas.user[0].address.geo.lat),
                  longitude: String(book.users.userHas.user[0].address.geo.lng),
                }
              ),
              "mi"
            ).toFixed(2) + " miles away",
        };
      })
    );
  };

  //   console.log(books[1].users.userHas.user[0].address.geo, "<< other user");
  console.log(distance, `<< distance between this book and logged in user`);

  return <div>distance</div>;
};

export default FilterByDistance;
