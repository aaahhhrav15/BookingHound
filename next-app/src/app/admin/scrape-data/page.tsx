"use client"
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody, 
  CardFooter, 
  Input,
  Listbox,
  ListboxItem,
  Button,
  Tab,
  Tabs,
} from "@nextui-org/react";
import axios from "axios";

const ScrapeData = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<undefined | string>(
    undefined
  );
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (searchString.trim() !== "") {
      searchCities(searchString);
    } else {
      setCities([]);
    }
  }, [searchString]);

  const searchCities = async (searchString: string) => {
    console.log("Searching for:", searchString);
    try {
      const response = await axios.get(
        `https://secure.geonames.org/searchJSON?q=${searchString}&maxRows=5&username=kishan&style=SHORT`
      );
      const parsed = response.data?.geonames;
      setCities(parsed?.map((city: { name: string }) => city.name) ?? []);
      console.log({ response });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const startScraping = () => {
    console.log("nothing");
  };

  return (
    <section>
      <Card className="m-10 grid grid-cols-3 gap-5">
        <CardBody className="col-span-2">
          <Tabs>
            <Tab key="location" title="Location">
              <Input
                type="text"
                label="Search for a location"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <div className="w-full min-h-[200px] max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-5">
                <Listbox onAction={(key) => setSelectedCity(key as string)}>
                  {cities.map((city) => (
                    <ListboxItem
                      key={city}
                      color="primary"
                      className="text-primary-500"
                    >
                      {city}
                    </ListboxItem>
                  ))}
                </Listbox>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
        <div className="col-span-2">
          <CardFooter className="flex flex-col gap-5">
            <div>
              {selectedCity && (
                <h1 className="text-xl">Scrape data for {selectedCity}</h1>
              )}
            </div>
            <Button
              onClick={startScraping}
              size="lg"
              className="w-2/5"
              color="primary"
            >
              Scrape
            </Button>
          </CardFooter>
        </div>
      </Card>
    </section>
  );
};

export default ScrapeData;
