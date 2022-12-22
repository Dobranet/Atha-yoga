import React from 'react';
import { useEffect, useState } from "react";
import Logo from '../../components/Welcome';
import SplashScreens from '../../components/Welcome/SplashScreens/index.js';


const WelcomePage = () => {
  const [isLogo, setIsLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLogo(false), 2000);
  }, [])

  return isLogo ? <Logo /> : <SplashScreens />;
};

export default WelcomePage;