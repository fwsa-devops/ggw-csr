"use client";

import {
  type IDetectedBarcode,
  Scanner,
  outline,
} from "@yudiel/react-qr-scanner";

type Props = {
  onScan: (result: IDetectedBarcode[]) => void;
};

export default function ScanQr(props: Props) {
  return (
    <Scanner
      onScan={props.onScan}
      allowMultiple={true}
      scanDelay={2000}
      components={{
        audio: true,
        onOff: false,
        torch: true,
        zoom: true,
        finder: true,
        tracker: outline,
      }}
    />
  );
}
