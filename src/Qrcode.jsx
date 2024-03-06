import React, { useState } from "react";

export const Qrcode = () => {
   const [img, setImg] = useState("assist/qrcode.png");

   const [loading, setLoading] = useState(false);
   const [qrData, setQrData] = useState("https://youtube.com/");
   const [qrSize, setQrSize] = useState("150");

   const generateQr = async () => {
      setLoading(true);
      try {
         const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
            qrData
         )}`;
         setImg(url);
      } catch (err) {
         console.log("error generating", err);
      } finally {
         setLoading(false);
      }
   };

   const downloadQr = () => {
      fetch(img)
         .then((res) => res.blob())
         .then((blob) => {
            const downloadBtn = document.createElement("a");
            downloadBtn.href = URL.createObjectURL(blob);
            downloadBtn.download = "qrcode.png";
            document.body.appendChild(downloadBtn);
            downloadBtn.click();
            document.body.removeChild(downloadBtn);
         })
         .catch((err) => {
            console.log("generating err", err);
         });
   };

   return (
      <div className="qrcode-container">
         <h2>QrCode Converter</h2>
         {loading && <p>Please Wait...</p>}
         {img && <img src={img} className="qrcode-img" />}
         <div>
            <label className="input-label">Qrcode converter</label>
            <input
               type="text"
               placeholder="Enter a data to converter"
               value={qrData}
               onChange={(e) => setQrData(e.target.value)}
            />
            <label className="input-label">Enter Img Size</label>
            <input
               type="text"
               placeholder="Enter Img Size"
               value={qrSize}
               onChange={(e) => setQrSize(e.target.value)}
            />

            <div className="button-container">
               <button onClick={generateQr}>Generate Qrcode</button>
               <button onClick={downloadQr} className="download-btn">
                  Download the Qrcode
               </button>
            </div>
         </div>
      </div>
   );
};
