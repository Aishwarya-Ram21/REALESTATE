import React, { useEffect, useState, useContext, createContext } from "react";

// Create a context to manage the script loading state
const CloudinaryScript1Context = createContext();

function UploadWidget({ setState }) {
  const [loaded, setLoaded] = useState(false);
  const scriptContext = useContext(CloudinaryScript1Context);

  useEffect(() => {
    // Check if the script is already loaded
    if (!scriptContext.loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => {
          setLoaded(true);
          scriptContext.setLoaded(true);
        });
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
        scriptContext.setLoaded(true);
      }
    } else {
      setLoaded(true);
    }
  }, [scriptContext]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dyqerealk",
          uploadPreset: "estate",
          multiple:true,
          folder:"posts",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );

      myWidget.open();
    }
  };

  return (
    <button
      id="upload_widget"
      className="cloudinary-button"
      onClick={initializeCloudinaryWidget}
    >
      Upload
    </button>
  );
}

function CloudinaryScript1Provider({ children }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <CloudinaryScript1Context.Provider value={{ loaded, setLoaded }}>
      {children}
    </CloudinaryScript1Context.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScript1Provider };
