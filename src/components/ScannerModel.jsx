import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScannerModel = (barcodeScannerValue) => {
  return (
    <>
      <BarcodeScannerComponent
        onUpdate={(err, result) => {
          if (result) barcodeScannerValue.barcodeScannerValue(result.text);
        }}
      />
    </>
  );
};

export default ScannerModel;
