"use client";
import React, { useEffect } from "react";
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
  const isFormValid = () => {
    const hasLocation = Object.keys(coords).length > 0;
    const hasAddress = address.trim() !== "" && address !== null;

    return (
      (hasAddress || hasLocation) &&
      roomCount !== 0 &&
      roomCount !== null &&
      bedroomCount !== 0 &&
      bedroomCount !== null &&
      age !== 0 &&
      age !== null
    );
  };
  return (
    <main className="flex flex-col items-center min-h-screen ">
      <div className="flex flex-col items-center w-full ">
        <div className="flex items-center justify-center w-full p-4 space-x-24 text-lg bg-primary h-fit text-onPrimary">
          <a href="/about">About</a>
          <a href="/home">Home</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="flex flex-col items-center w-full py-24 space-y-12 bg-background">
          <div className="flex flex-col items-center space-y-6">
            <p className="text-5xl font-bold ">Real Estate Price Estimator</p>
            <p className="text-2xl text-primary ">
              Get an estimated price on your dream home.
            </p>
          </div>
          <Button>Get Started</Button>
        </div>

        <div className="flex flex-col items-center justify-center w-full p-10 space-y-10 bg-onPrimary">
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
                      : "max-h-[0px] overflow-hidden "
                  }`}>
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
                }}>
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
                  } else {
                    // Display a message if the form is not valid
                    alert("Please fill out all required fields.");
                  }
                }}>
                Estimate Price
              </Button>
            </div>
          </Container>

          <Container title="Or speak to our chatbot for a more personalized experience">
            <div
              className={`items-center ${
                chatting
                  ? "justify-end max-h-[500px] h-[500px] transition-all duration-300 ease-in-out"
                  : "justify-center max-h-[100px]"
              } my-4 py-2 px-5 flex flex-col border border-gray rounded-lg w-full  overflow-scroll-y`}>
              {chatting ? (
                <Chatbot />
              ) : (
                <a
                  className="w-full text-6xl font-bold text-center text-gray align-text-center"
                  onClick={() => {
                    setChatting(!chatting);
                    initChatbot();
                  }}>
                  Start Chatting
                </a>
              )}
            </div>
          </Container>
          <Container title={"Your house's estimated value is:"}>
            <div className="flex flex-col items-center space-y-4">
              <p className="p-4 text-4xl font-bold text-primary">
                ${estimatedPrice}
              </p>
              <p className="text-lg text-primary">
                This is an estimate based on the information you provided.
              </p>
            </div>
          </Container>
        </div>
      </div>
    </main>
  );

  async function initChatbot() {
    let startChat = await axios.get(
      "http://127.0.0.1:5000/start_conversation",
      "endpoint",
      { headers: { "Content-Type": "application/json" } }
    );

    if (startChat.data.message != "") {
      const botResponse = {
        role: "bot",
        content: startChat.data.message,
      };
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
