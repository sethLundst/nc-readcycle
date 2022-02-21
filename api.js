import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.googleapis.com",
});

// Function to get book data.
let ISBN = 9780735611313;
async function getBook() {
  const response = await api.get(
    `/books/v1/volumes?q=isbn:${ISBN}&key=AIzaSyAVVkhe8oG7Y5vOVfzbb4tiSNuq5r0mbhQ`
  );
  console.log(response.data.items[0].volumeInfo);
}
getBook(ISBN);
