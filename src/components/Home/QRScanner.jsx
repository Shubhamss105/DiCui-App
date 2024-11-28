import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

const QRScanner = ({ onClose, onScan }) => {
  const [isScanned, setIsScanned] = useState(false);

  // Handle QR code result
  const handleQRCodeResult = ({ data }) => {
    console.log('Scanned Data:', data);  // Log the raw data
    if (!isScanned) {
      setIsScanned(true); // Prevent duplicate scans
      onScan(data); // Send the scanned data back to the parent
      onClose(); // Close the scanner after scan
    }
  };

  return (
    <View className="relative flex-1 justify-center items-center h-[400px] bg-black rounded-xl overflow-hidden">
      <RNCamera
        className="w-full h-full"
        onBarCodeRead={handleQRCodeResult} // Trigger the scan result handler
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]} // Only scan QR codes
      />
      {/* Close Button */}
      <TouchableOpacity onPress={onClose} className="absolute top-4 left-4 z-20">
        <Icon name="close" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default QRScanner;
