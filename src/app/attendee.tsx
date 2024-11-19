import React, { useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

// Corrected component name (capitalize Attendee)
const Attendee: React.FC = () => {
  const [barcode, setBarcode] = useState<Record<string, any> | null>(null);  // Corrected type
  const [error, setError] = useState<string | null>(null);

  // Handle the barcode result
  const handleBarcodeScan = (result: any) => {
    if (result) {
      try {
        setBarcode(JSON.parse(result.text)); // Set the scanned barcode text
      } catch (e) {
        setError("Failed to parse barcode data as JSON.");
      }
    }
  };

  // Handle errors
  const handleError = (err: any) => {
    setError(err.message); // Set the error message
    console.error("Barcode scan error:", err);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>

      {/* Barcode Scanner Component */}
      <BarcodeScannerComponent
        width="25%"
        height="25%"
        onUpdate={(err, result) => {
          if (err) {
            handleError(err);
          }
          if (result) {
            handleBarcodeScan(result);
          }
        }}
      />

      {/* Display Scanned Barcode */}
      {barcode && (
        <div>
          <h2>Scanned Barcode Data:</h2>
          {/* Display each individual field from the barcode JSON */}
          <div>
            <p><strong>ID:</strong> {barcode.id}</p>
            <p><strong>Name:</strong> {barcode.name}</p>
            <p><strong>Status:</strong> {barcode.isActive ? "Active" : "Inactive"}</p>
            <p><strong>Age:</strong> {barcode.details?.age}</p>
            <p><strong>Hobbies:</strong> {barcode.details?.hobbies?.join(", ")}</p>
          </div>
        </div>
      )}

      {/* Display Errors
      {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
};

export default Attendee;
