import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Attendee: React.FC = () => {
  const [barcode, setBarcode] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle the barcode result
  const handleBarcodeScan = (result: any) => {
    if (result) {
      try {
        setBarcode(JSON.parse(result.text)); // Parse and set JSON data
        setError(null); // Clear any previous error
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
          <div style={{ backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
            {Object.entries(barcode).map(([key, value], index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p>
                  <strong>{key}:</strong>
                </p>
                <p>{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Attendee;
