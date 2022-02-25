import * as React from "react";
import SingleBookPage from "../components/SingleBookPage";

export default function SingleBookScreen({ route }) {
  const { item } = route.params;
  return <SingleBookPage item={item} />;
}
