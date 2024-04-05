import { DestinationDetailsType,PackageIteniaryType,DetailedIntinearyType,DestinationItineraryType } from "@/types/trips";

import { Page } from "puppeteer";

interface PackageInfo {
    id: string | null;
    name: string;
    nights: number;
    days: number;
  
    inclusions: string[];
    price: number;
}

interface PackageDetailsType {
    description: string;
    images: string[];
    themes: string[];
    detailedIntineary: DetailedIntinearyType[];
    destinationItinerary: DestinationItineraryType[];
    destinationDetails: DestinationDetailsType[];
    packageIteniary: PackageIteniaryType[];
}

export const startPackageScraping = async(page : Page, pkg : PackageInfo) =>{
    console.log("in start package scraping");
    const packageDetails = await page.evaluate(() => {
      const packageDetails: PackageDetailsType = {
        description: "",
        images: [],
        themes: [],
        detailedIntineary: [],
        destinationItinerary: [],
        destinationDetails: [],
        packageIteniary:[],
      };

      const packageElement = document.querySelector("#main-container");
      const descriptionSelector = packageElement?.querySelector("#pkgOverView");
      const regex = new RegExp("Yatra", "gi");
      descriptionSelector?.querySelector(".readMore")?.click();
      packageDetails.description = packageElement
      ?.querySelector("#pkgOverView p")
      ?.innerHTML.replace(regex, "BookingHound") as string;
      return packageDetails;
      
    });
}