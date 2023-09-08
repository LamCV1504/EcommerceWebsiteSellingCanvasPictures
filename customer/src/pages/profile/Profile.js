import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Body from "./Body";

const Profile = () => {
  return (
    <div className="flex">
      <div className="h-screen overflow-y-hidden bg-[#ffffff] shadow-2xl">
        {/* <Sidebar></Sidebar> */}
      </div>
      <div className="flex flex-col flex-auto bg-lite">
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
