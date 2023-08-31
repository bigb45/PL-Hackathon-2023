"use client";
import React from "react";
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

export default function Home() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className=" w-full items-center flex flex-col">
        <div className="bg-primary w-full h-fit flex space-x-24 justify-center text-onPrimary text-lg items-center p-4">
          <a href="/about">About</a>
          <a href="/home">Home</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="flex flex-col items-center space-y-12 bg-background w-full py-24">
          <div className="flex flex-col items-center space-y-6">
            <p className=" text-5xl font-bold">Real Estate Price Estimator</p>
            <p className="text-primary text-2xl ">
              Get an estimated price on your dream home.
            </p>
          </div>
          <Button>Get Started</Button>
        </div>

        <div className="flex-col space-y-10 p-10 w-full items-center flex justify-center bg-onPrimary">
          <Container title={"Fill out the details"}>
            <div className="mb-4 ">
              <FormSection title="LOCATION">
                <FormRow
                  title={"Address"}
                  hint={"Street address"}
                  isNumeric={false}
                />
                <FormRow title={"Zipcode"} hint={"Zipcode"} />
                <FormRow
                  title={"City"}
                  hint={"City name"}
                  isNumeric={false}
                  required={false}
                />
                <div className="w-full h-80">
                  <GoogleMap />
                </div>
              </FormSection>
              <FormSection title="HOUSE INFORMATION">
                <FormRow title={"Room count"} hint={"Total rooms"} />
                <FormRow title={"Bedroom count"} hint={"Number of bedrooms"} />
                <FormRow title={"House age"} hint={"Age in years"} />
              </FormSection>

              {
                <div
                  className={`transition-all duration-700 ${
                    showAdvanced
                      ? "max-h-[1000px] overflow-hidden"
                      : "max-h-[0px] overflow-hidden "
                  }`}
                >
                  <FormSection title="NEIGHBOURHOOD INFORMATION">
                    <FormRow
                      title={"Population"}
                      hint={"Neighborhood population"}
                      required={false}
                    />
                    <FormRow
                      title={"Household count"}
                      hint={"# of households"}
                      required={false}
                    />

                    <FormRow
                      title={"Average income"}
                      hint={"In thousnads of Dollars"}
                      required={false}
                    />
                  </FormSection>
                  <FormSection>
                    <FormRowBlank title="Proximity to the beach">
                      <ProximitySelector />
                    </FormRowBlank>

                    <FormRow
                      title="Distance to city"
                      hint="Nearest major city in miles"
                    />
                  </FormSection>
                </div>
              }
              <div
                className=" text-center "
                onClick={() => {
                  setShowAdvanced(!showAdvanced);
                  console.log(showAdvanced);
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

            <div className="w-full flex justify-center">
              <Button>Estimate Price</Button>
            </div>
          </Container>

          <Container title="Or speak to our chatbot for a more personalized experience">
            <div className="items-center justify-end my-4 py-2 px-5 flex flex-col border border-gray rounded-lg w-full h-[500px] overflow-scroll-y">
              <Chatbot />
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}
