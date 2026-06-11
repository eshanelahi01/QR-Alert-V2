"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

export default function CameraScanner({
  onScan,
}: {
  onScan: (qrCode: string) => void;
}) {
  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    // Delay ensures DOM is mounted
    const timeout = setTimeout(() => {
      const element = document.getElementById("reader");

      if (!element) return; // prevent crash

      scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 300,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          scanner?.clear().catch(() => {});
          onScan(decodedText);
        },
        () => {}
      );
    }, 300); // small delay fixes null issue

    return () => {
      clearTimeout(timeout);
      scanner?.clear().catch(() => {});
    };
  }, [onScan]);

  return <div id="reader"  />;
}