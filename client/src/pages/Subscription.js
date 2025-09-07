import React from "react";

import CTASection from "../components/CTASection";
import "../styles/SubscriptionPage.css";

const SubscriptionPage = () => {
  return (
    <div className="subscription-page">
      <header className="subscription-header">
        <h1 className="subscription-title">Choose Your Plan</h1>
        <p className="subscription-subtitle">
          Find a subscription that fits your needs.
        </p>
      </header>

      

      <CTASection />
    </div>
  );
};

export default SubscriptionPage;