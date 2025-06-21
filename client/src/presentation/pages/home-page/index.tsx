import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const HomePage = (): React.JSX.Element => {
  const userData = useSelector((state: any) => state.user);

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  return <h1>HomePage</h1>;
};

export default HomePage;
