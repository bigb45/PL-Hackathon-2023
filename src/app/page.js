"use client";
import React, { useRef } from "react";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import FormRow from "@/components/FormRow";
import ProximitySelector from "@/components/ProximitySelector";
import FormSection from "@/components/FormSection";
import FormRowBlank from "@/components/FormRowBlank";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chatbot from "@/components/ChatBot";
import Container from "@/components/Container";
import GoogleMap from "@/components/Map";
import getCoords from "./api/Coords";
import axios from "axios";
import { render } from "react-dom";

export default function Home() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({});
  const [roomCount, setRoomCount] = useState(0);
  const [bedroomCount, setBedroomCount] = useState(0);
  const [age, setAge] = useState(0);
  const [households, setHouseholds] = useState(0);
  const [population, setPopulation] = useState(0);
  const [income, setIncome] = useState(0);
  const [beachProximity, setBeachProximity] = useState("");
  const [cityDistance, setCityDistance] = useState(0);
  const [request, setRequest] = useState({});
  const [chatting, setChatting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [started, setStarted] = useState(false);
  const [hasEstimate, setHasEstimate] = useState(false);
  let id = null;
  const botResponseRef = useRef(null);
  const isFormValid = () => {
    const hasLocation = Object.keys(coords).length > 0;
    const hasAddress = address.trim() !== "" && address !== null;

    return (
      (hasAddress || hasLocation) &&
      roomCount !== 0 &&
      roomCount !== "" &&
      bedroomCount !== 0 &&
      bedroomCount !== "" &&
      age !== 0 &&
      age !== ""
    );
  };
  return (
    <main
      className="flex flex-col items-center min-h-screen bg-background "
      id="home-section"
    >
      <div className="flex flex-col items-center w-full ">
        <div className=" sticky top-0 flex items-center justify-center w-full p-4 space-x-24 text-lg bg-primary h-fit text-onPrimary">
          <a href="/about">About</a>
          <a href="#home-section">Home</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="flex flex-col items-center w-full py-80 space-y-12 bg-background">
          <div className="flex flex-col items-center space-y-6">
            <p className="text-5xl font-bold ">Real Estate Price Estimator</p>
            <p className="text-2xl text-primary ">
              Get a realistic price estimate on your real estate.
            </p>
          </div>
          <button
            className="px-16 py-6  text-4xl font-bold text-white transition duration-500 ease-in-out transform bg-primary rounded-full hover:bg-primaryDark hover:scale-110 hover:shadow-2xl"
            onClick={() => {
              const section = document.getElementById("#section-1");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Get Started
          </button>
        </div>

        <div
          className={`flex flex-col items-center justify-center w-full overflow-scroll space-y-10 bg-onPrimary            
                max-h-[4000px] p-10              
          `}
          id="#section-1"
        >
          <Container title={"Fill out the details"}>
            <div className="mb-4 ">
              <FormSection title="LOCATION">
                <FormRow
                  title={"Address"}
                  hint={"Street address"}
                  isNumeric={false}
                  handleChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <p className="py-4 text-lg">Or use the map</p>
                <div className="w-full h-80">
                  <GoogleMap />
                </div>
              </FormSection>
              <FormSection title="HOUSE INFORMATION">
                <FormRow
                  title={"Room count"}
                  hint={"Total rooms"}
                  handleChange={(e) => {
                    setRoomCount(e.target.value);
                  }}
                />
                <FormRow
                  title={"Bedroom count"}
                  hint={"Number of bedrooms"}
                  handleChange={(e) => {
                    setBedroomCount(e.target.value);
                  }}
                />
                <FormRow
                  title={"House age"}
                  hint={"Age in years"}
                  handleChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </FormSection>

              {
                <div
                  className={`transition-all duration-700 ${
                    showAdvanced
                      ? "max-h-[1000px] overflow-hidden"
                      : "max-h-[0px] overflow-hidden"
                  }`}
                >
                  <FormSection title="NEIGHBOURHOOD INFORMATION">
                    <FormRow
                      title={"Population"}
                      hint={"Neighborhood population"}
                      required={false}
                      handleChange={(e) => {
                        setPopulation(e.target.value);
                      }}
                    />
                    <FormRow
                      title={"Household count"}
                      hint={"# of households"}
                      required={false}
                      handleChange={(e) => {
                        setHouseholds(e.target.value);
                      }}
                    />

                    <FormRow
                      title={"Average income"}
                      hint={"In thousnads of Dollars"}
                      required={false}
                      handleChange={(e) => {
                        setIncome(e.target.value);
                      }}
                    />
                  </FormSection>
                  <FormSection>
                    <FormRowBlank title="Proximity to the beach">
                      <ProximitySelector
                        handleChange={(selection) => {
                          setBeachProximity(selection);
                        }}
                      />
                    </FormRowBlank>

                    <FormRow
                      title="Distance to city"
                      hint="Nearest major city in miles"
                      required={false}
                      handleChange={(e) => {
                        setCityDistance(e.target.value);
                      }}
                    />
                  </FormSection>
                </div>
              }
              <div
                className="text-center "
                onClick={() => {
                  setShowAdvanced(!showAdvanced);
                }}
              >
                {showAdvanced ? (
                  <div>
                    <p className="text-zinc-500">Hide</p>
                    <FontAwesomeIcon
                      className="hover:animate-bounce"
                      icon={faAngleUp}
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-zinc-500">Advanced options</p>
                    <FontAwesomeIcon
                      className="hover:animate-bounce max-h-10 max-w-10"
                      icon={faAngleDown}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center w-full">
              <Button
                onClick={() => {
                  if (isFormValid()) {
                    getCoordinatesFromAddress();
                    setHasEstimate(true);
                  } else {
                    // Display a message if the form is not valid
                    alert("Please fill out all required fields.");
                  }
                }}
              >
                Estimate Price
              </Button>
            </div>

            <div
              className={`flex flex-col items-center space-y-4 pt-10 overflow-hidden ${
                hasEstimate ? "max-h-96 duration-700" : "max-h-0"
              }`}
            >
              <p className="text-4xl font-bold text-secondary ">
                Your house&apos;s estimated value is:
              </p>
              <p className="p-4 text-4xl font-bold text-primary">
                ${estimatedPrice}
              </p>
              <p className="text-lg text-primary">
                This is an estimate based on the information you provided.
              </p>
            </div>
          </Container>

          <div
            className={`flex flex-col items-center justify-center w-full space-y-10 bg-onPrimary p-10 py-[500px]`}
          >
            <p className="text-4xl font-bold text-secondary">
              Or talk to our chatbot for a tailored experience!
            </p>
            <Container>
              <div
                className={`items-center ${
                  chatting
                    ? "justify-end max-h-[500px] h-[500px] transition-all duration-700 ease-in-out"
                    : "justify-center max-h-[200px]"
                } my-4 py-2 px-5 flex flex-col rounded-lg w-full  overflow-scroll-y`}
              >
                {chatting ? (
                  <Chatbot id={id} />
                ) : (
                  <button
                    className="px-16 py-6  text-4xl font-bold text-white transition duration-500 ease-in-out transform bg-primary rounded-full hover:bg-primaryDark hover:scale-110 hover:shadow-2xl"
                    onClick={async () => {
                      await initChatbot();
                      setChatting(!chatting);
                    }}
                  >
                    Start chatting
                  </button>
                )}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </main>
  );

  async function initChatbot() {
    try {
      let startChat = await axios.get(
        "http://127.0.0.1:5000/start_conversation",
        "endpoint",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      id = "startChat.data.id;";
      console.log(id);

      if (startChat.data.message != "") {
        const botResponse = {
          role: "bot",
          content: startChat.data.message,
        };
      }
    } catch (error) {
      console.error("Error during Axios request:", error);
    }
  }

  async function getCoordinatesFromAddress() {
    let myRequest = {};
    setAddress(address.replace(" ", "+"));
    if (address) {
      var houseCoords = await getCoords(address);
      setCoords(houseCoords);
    }

    myRequest = {
      longitude: Number(coords.lat),
      latitude: Number(coords.lng),
      housing_median_age: Number(age),
      total_rooms: Number(roomCount),
      total_bedrooms: Number(bedroomCount),
      population: Number(population),
      households: Number(households),
      median_income: Number(income),
      ocean_proximity: beachProximity,
    };
    setRequest(myRequest);
    let price = await axios.post("http://127.0.0.1:5000/predict", myRequest);
    setEstimatedPrice(parseInt(price.data.prediction));
  }
}
