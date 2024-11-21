"use client";

import { type NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import Attendee from "./attendee";
import QRCodes from "./qr";

const Home: NextPage = () => {
  const [qrData, setQrData] = useState<string[]>([]);
  const [allKeys, setAllKeys] = useState<Set<string>>(new Set());

  // Function to remove empty fields from a single object
  const removeEmptyFields = (obj: any) => {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
        acc[key] = obj[key];
      }
      return acc;
    }, {} as Record<string, any>);
  };

  //Removing unnecessary fields
  const removeUnnecessaryKeys = (obj: any, keysToRemove: string[]) => {
    const filteredObj = { ...obj };
    keysToRemove.forEach((key) => {
      delete filteredObj[key];
    });
    return filteredObj;
  };

  // Function to get unique keys from all objects
  const getKeys = (data: any[]) => {
    const keySet = new Set<string>();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => keySet.add(key));
    });
    return keySet;
  };

  // Function to replace specific keys with new keys
  const replaceKeys = (data: any[], keyMapping: Record<string, string>) => {
    return data.map((item) => {
      const updatedItem: Record<string, any> = {};
      Object.keys(item).forEach((key) => {
        // Use the mapped key if it exists; otherwise, retain the original key
        const newKey = keyMapping[key] || key;
        updatedItem[newKey] = item[key];
      });
      return updatedItem;
    });
  };

  // Fetch data and update state
  const fetchData = async () => {
    try {
      const response = await fetch("https://sheetdb.io/api/v1/suk4789z30hwh");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      // Define keys to remove
      const keysToRemove = [
        "DO YOU WANT TO BE A PART SHOWCASE / EVENTS ?\n\nDo you want to be a part of Kalaiyugam's Events & Showcase",
        "Upload the transcation proof",
        "DID YOU SELECT DEBATE EVENT ?",
        "DO YOU WANT TO BE A PART OF WORKSHOP ? \n\nDo you",
        "Timestamp",
        "Upload the Transaction Proof",
        "Upload your ID card",
        "Would you like to be a panel member for the debate?\n\nTopic : Traditional Art Vs AI Infused Art",
        "If yes, which side of the argument are you will to support?",
        "What would be your argument for the side that you've chosen for the debate?",
        "Mobile Number (For further communication)",
      ];

      // Key mapping for replacement
      const keyMapping = {
        "Which organisation are a part of?": "Organization",
        "WHICH EVENT DO YOU WANT TO BE A PART OF ? [ A PERSON CAN PARTICIPATE IN ANY NUMBER OF EVENT]": "Events Interested",
        "WHICH EVENT DO YOU WANT TO BE A PART OF ? [ A PERSON CAN PARTICIPATE IN ANY NUMBER OF EVENT]\n\nWhich event do you want to be a part of? [A Person can participate in any number of event]": "Events Interested",
        "DO YOU WANT TO BE A PART OF THE DEBATE PANEL OR THE AUDIENCE WHOS VOTE WOULD DECIDE THE WINNER ?": "Debate Role",
        "Which event do you want to be a part of? [ A person can participate in any number of event ]": "Events Interested",
        Name: "Full Name",
        Year: "Academic Year",
        "Email Address": "email",
        "Department & Section\n( Example : IT-A )": "Department",
        "School / College Name": "Institution Name",
        "Department/Section": "Department",
        "Standard / Year": "Grade or Year",
      };

      // Clean data
      const cleanedData = data
        .map(removeEmptyFields)
        .map((item: any) => removeUnnecessaryKeys(item, keysToRemove))
        .map((item: any) => replaceKeys([item], keyMapping)[0]); // Replace keys

      // Convert each cleaned object into a string
      const stringArray = cleanedData.map((item: any) => JSON.stringify(item));

      // Extract and set unique keys
      const uniqueKeys = getKeys(cleanedData);
      setAllKeys(uniqueKeys);

      // Update state
      setQrData(stringArray);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

//Fetching the data 
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Event Management</title>
        <meta name="description" content="Generated by Krisha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Attendee />
      <QRCodes data={qrData} /> 
    </>
  );
};

export default Home;
