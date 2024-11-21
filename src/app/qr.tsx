import React, { useState, useEffect } from 'react';
import { useQRCode } from 'next-qrcode';

interface QRCodesProps {
  data: string[];
}

const QRCodes: React.FC<QRCodesProps> = ({ data }) => {
  const { Canvas } = useQRCode();
  
  // Parse and update data (
  const parsedData = data.map(item => JSON.parse(item));
  return parsedData;

  // return (
  //   <div>
  //     {data.map((item, index) => (
  //       <div key={index} style={{ marginBottom: '20px' }}>
  //         <h1>{item}</h1>
  //         {/* Generate QR code for each string in the array */}
  //         <Canvas
  //           text={item}
  //           options={{
  //             errorCorrectionLevel: 'M',
  //             margin: 3,
  //             scale: 4,
  //             width: 200,
  //             color: {
  //               dark: '#000000',
  //               light: '#FFFFFF',
  //             },
  //           }}
  //         />
  //       </div>
  //     ))}
  //   </div>);
};

export default QRCodes;
