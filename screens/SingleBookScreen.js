import * as React from "react";
import SingleBookPage from "../components/SingleBookPage";

export default function SingleBookScreen(props) {
  console.log(this.props);
  const { item } = route.params;
  return <SingleBookPage item={item} navigation={navigation} />;
}
