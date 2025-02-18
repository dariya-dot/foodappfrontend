import React,{forwardRef} from "react";
import "./Appstore.css";
const Appstore = forwardRef((props,ref) => {
  return (
    <>
      <div className="Appstoresection" ref={ref}>
        <center>
          {" "}
          <h1>For the Better Experience </h1>
          <h1>download Our App</h1>
        </center>
        <center className="storeImag">
          <img className="image" src="../../../play store.png" />
          <img src="../../../app store.png" />
        </center>
      </div>
      
    </>
  );
});

Appstore.displayName = "Appstore";
export default Appstore