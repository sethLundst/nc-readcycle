import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.googleapis.com",
});


const ISBN = 9780191623042;
const apiKey = "AIzaSyAVVkhe8oG7Y5vOVfzbb4tiSNuq5r0mbhQ";

export default async function getBook(ISBN) {
  try {
    const response = await api.get(
      `/books/v1/volumes?q=isbn:${ISBN}&key=${apiKey}`
    );
    // console.log(response.data.items[0].volumeInfo);
  } catch (err) {
    console.log(err);
  }
}

getBook(ISBN);

