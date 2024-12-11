import React, { useEffect, useState, useContext, createContext } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ setState }) {
  const [loaded, setLoaded] = useState(false);
  const scriptContext = useContext(CloudinaryScriptContext);

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
          multiple:false,
          maxImageFileSize:2000000,
          folder:"avatars",
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

function CloudinaryScriptProvider({ children }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptProvider };
