import React, { useState } from 'react';
import './TrackerPortal.css';

const TrackerPortal = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [currentStep, setCurrentStep] = useState(null);

  // Simulated order tracking statuses
  const steps = [
    'Order Placed',
    'Processing Order',
    'Quality Check',
    'Dispatch Order',
    'Received Order',
  ];

  const handleTrack = () => {
    if (!trackingNumber) {
      alert('Please enter a tracking number.');
      return;
    }

    // Simulate fetching order status
    const simulatedStatus = Math.floor(Math.random() * steps.length); // Random step
    setCurrentStep(simulatedStatus); // Update the current step
  };

  return (
    <div className="tracker-container">
      <h1 className="tracker-title">Track your shipment</h1>
      <div className="tracker-input-wrapper">
        <input
          type="text"
          className="tracker-input"
          placeholder="Type your tracking number here"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button className="tracker-button" onClick={handleTrack}>
          Track
        </button>
      </div>
      <p className="tracker-helper-text">
        Separate multiple tracking numbers with a space or comma.
      </p>

      {/* Tracking Steps */}
      {currentStep !== null && (
        <div className="progress-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`progress-step ${
                index <= currentStep ? 'active' : ''
              }`}
            >
              <div className="icon-wrapper">
                <span className="step-icon">{index + 1}</span>
              </div>
              <p className="step-label">{step}</p>
              {index < steps.length - 1 && <div className="line" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackerPortal;
