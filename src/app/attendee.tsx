import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Attendee: React.FC = () => {
  const [barcode, setBarcode] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [readQr, setReadQr] = useState<Record<string, any>[]>([]);
  const [scannedCodes, setScannedCodes] = useState<Set<string>>(new Set()); // To track scanned QR codes

  // Function to store the read QR
  const addObj = (newObj: Record<string, any>) => {
    // Generate a unique identifier for the scanned QR code (assuming JSON.stringify works for unique objects)
    const qrCodeString = JSON.stringify(newObj);

    // Check if the QR code has already been scanned
    if (scannedCodes.has(qrCodeString)) {
      setError("Attendee registered."); // Show error message
      return; // Do not add it again
    }

    // Add to the scanned list and update the state
    setReadQr((prevReadQr) => [...prevReadQr, newObj]);
    setScannedCodes(new Set(scannedCodes.add(qrCodeString))); // Add to the set of scanned codes
    setError(null); // Clear any previous errors
  };

  // Handle the barcode result
  const handleBarcodeScan = (result: any) => {
    if (result) {
      try {
        const parsedData = JSON.parse(result.text); // Parse the scanned QR code
        setBarcode(parsedData); // Update barcode state with scanned data

        // Call addObj to check and add the QR code if it's not a duplicate
        addObj(parsedData);
      } catch (e) {
        setError("Failed to parse barcode data as JSON.");
      }
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>

      {/* Barcode Scanner Component */}
      <BarcodeScannerComponent
        width="25%"
        height="300px"
        onUpdate={(err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            handleBarcodeScan(result); // Process the scan result
          }
        }}
      />

      {/* Display Scanned Barcode */}
      {barcode && (
        <div>
          <h2>Scanned QR Code Data:</h2>
          <div
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
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

      {/* Display error message if there's any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Optional: Display the list of scanned QR codes */}
      <pre>{JSON.stringify(readQr, null, 2)}</pre>
      <br/>
    </div>
  );
};

export default Attendee;
