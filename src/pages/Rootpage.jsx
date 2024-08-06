import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Rootpage = () => {

  const [brandInfo, setBrandInfo] = useState({});

  const getBrandInfo = async () => {
    try {
      const response = await axios.get("http://localhost:2002/gms/api/v1/brand/get-brand-info");
      setBrandInfo({
        ...response.data,
        bankAccounts: JSON.parse(response.data.bankAccounts),
        mediaLink: JSON.parse(response.data.mediaLink)
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBrandInfo();
  }, []);

  return (
    <>
      <Header logoURL={brandInfo.logo} />
      <Outlet />
      <Footer logoURL={brandInfo.logo} brandInfo={brandInfo} />
    </>
  );
};

export default Rootpage;
