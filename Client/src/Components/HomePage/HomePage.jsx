import React from "react";
import HeroCrousel from "./HeroCrousel";
import Overview from "./Overview";
import FeaturedProducts from "./FeaturedProducts";
import ProductsSection from "./ProductsSection";
import ContactUs from "./ContactUs";
import Statistics from "./Statistics";
import ProductPromo from "./ProductPromo";
import { ClerkLoaded } from "@clerk/clerk-react";
import { Fade } from "react-awesome-reveal";
export default function HomePage() {
  return (
    <div>
      <ClerkLoaded>
        <Fade>
          <HeroCrousel />
          <Overview />
          <FeaturedProducts />
          <ProductsSection />
          <ProductPromo />
          <ContactUs />
          <Statistics />
        </Fade>
      </ClerkLoaded>
    </div>
  );
}
