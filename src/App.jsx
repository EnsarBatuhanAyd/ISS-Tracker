import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import {
  Viewer,
  Entity,
  EntityDescription,
  Globe,
  PointGraphics,
  BillboardGraphics,

  
} from "resium";
import { Cartesian3, Color,  } from "cesium";
import img from "./iss.png";

function App() {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [altitude, setaltitude] = useState(0);
  const [velocity, setvelocity] = useState(0);
  const [progress, setProgress] = useState(0);

  
  async function fetchISSData() {
    // const resp = await fetch("#"); // debugging
    const resp = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await resp.json();
    setLongitude(Number(data.longitude));
    setLatitude(Number(data.latitude));
    setaltitude(Number(data.altitude).toFixed(0)*1000);
    setvelocity(Number(data.velocity));
    setProgress(0);
  }

  useEffect(() => {
    fetchISSData();
    setInterval(fetchISSData, 2000);
    setInterval(() => {
      setProgress((prev) => prev + 5);
    }, 100);
  }, []);

  // const position = Cartesian3.fromDegrees(latitude, longitude, 100);
  console.log(latitude, longitude ,altitude ,velocity);
  return (
    <Viewer
     full
      homeButton={false}
      navigationHelpButton={false}
      // imageryProviderViewModels={}
      geocoder={false}
      timeline={false}
     
      
    
    >
   
      {/* lighting and clock problem */}
      <Globe />
      
      <Entity
        name="ISS (International Space Station)"
        description=""
        position={Cartesian3.fromDegrees(longitude, latitude,altitude)}
        selected
      > 
    
      {/* <Polyline material={Color.YELLOW} trailTime={100} width={10} leadTime={10} resolution={2} position={Cartesian3.fromDegrees(longitude, latitude, 408000)} /> */}
      {/* <PathGraphics material={Color.YELLOW} trailTime={100} width={10} leadTime={10} resolution={2} /> */}
        
         <BillboardGraphics image={img} scale={0.2} ></BillboardGraphics>
        <PointGraphics
          pixelSize={5}
          color={Color.RED}
          outlineColor={Color.WHITE}
          outlineWidth={2}
        />{" "}
       
        {/* <ModelGraphics uri={modeliss} maximumScale={2000} />  */}
        <EntityDescription>
          <style>{`
    .livetext {
      color: red;
    }
    .seperator{
      color:red;
    }
  `}</style>
          <h2>International Space Station</h2>
          <p>Spacecraft</p>
          <p className="seperator">_______________________________________</p>
          <h3 className="livetext">Live Data</h3>
          <h3>Latitude: {latitude}</h3>
          <h3>Longitude: {longitude}</h3>
          <h3>Altitude: {altitude/1000} km</h3>
          <h3>Velocity: {velocity} km/s</h3>

          <p className="seperator">_______________________________________</p>
          <p>
            The International Space Station is a modular space station in low
            Earth orbit. It is a multinational collaborative project involving
            five participating space agencies: NASA, Roscosmos, JAXA, ESA, and
            CSA. The ownership and use of the space station is established by
            intergovernmental treaties and agreements
          </p>

          <ul>
            <li>Orbit Height : 408 km</li>
            <li>Speed On Orbit : 7.66 km/s</li>
            <li>Max Speed : 28,000 km/h</li>
            <li>Launch Date : November 20, 1998</li>
            <li>Cost : November 150 billion USD</li>
          </ul>
        </EntityDescription>
       
      </Entity >
      
      
    </Viewer >
  );
}

export default App;
