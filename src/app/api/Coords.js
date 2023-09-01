// pages/api/get-coordinates.js
import axios from "axios";

var getCoords = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCy129A92aYbS6qnodzLjaGFsytmgKiKYk`
    );

    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export default getCoords;
