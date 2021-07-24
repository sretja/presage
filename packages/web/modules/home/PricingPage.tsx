import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { PriceCard } from "./PriceCard";

export const PricingPage = ({}) => {
  const [price, setPrice] = useState(false);

  return (
    <div className="py-5 md:py-8">
      <h3 className="font-display">Ready to start with Presage?</h3>
      <p className="text-gray-600 my-2">
        Presage is free for individuals. Level up by going pro!
      </p>

      <div className="flex mt-4 mb-9">
        <p className={`pr-2 ${price ? "" : "font-bold"}`}>Monthly</p>
        <Switch
          checked={price}
          onChange={setPrice}
          className={
            "relative focus:outline-none inline-flex items-center h-6 bg-gray-800 rounded-full w-11"
          }
        >
          <span
            className={`${
              price ? "translate-x-6 " : "translate-x-1"
            } inline-block w-4 h-4 transform transition bg-white rounded-full`}
          />
        </Switch>

        <p className={`pl-2 ${!price ? "" : "font-bold"}`}>Annually</p>
      </div>

      <div className="md:flex block mt-9 gap-5">
        <PriceCard
          features={[
            "3 free journals",
            "Publish unlimited articles",
            "Read unlimited articles",
            "Saved drafts for articles",
            "Access to public API",
          ]}
          description="A platform for everyone of any skillset."
          title="Free Forever"
          cost={0}
          plan={price ? "yearly" : "monthly"}
        />
        <PriceCard
          features={[
            "Unlimited articles and journals",
            "Access to sponsor market",
            "Publish unlimited articles",
            "Read unlimited articles",
            "Saved drafts for articles",
            "Access to public API",
          ]}
          description="For power users trying to get the most out of Presage."
          title="Professionals"
          cost={price ? 5 : 50}
          plan={price ? "yearly" : "monthly"}
        />
      </div>
    </div>
  );
};