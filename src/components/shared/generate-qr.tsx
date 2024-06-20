"use client";

import { encrypt } from "@/lib/utils";
import QRCode, { type QRCodeProps } from "react-qr-code";

type Props = QRCodeProps & { ref?: React.Ref<QRCode> };

export default function GenerateQr(props: Props) {
  const value = encrypt(props.value);
  return (
    <div className="bg-white p-2">
      <QRCode {...props} value={value} />
    </div>
  );
}
