import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import "./assets/_scss.scss";
import { Alchemy, Network } from "alchemy-sdk";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Lenis from '@studio-freight/lenis'
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import Gallery from "./pages/Gallery.js";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

function App() {

  const [balance, setBalance] = useState(0);
  const fetchBalance = async () => {
    try {
      const balanceResponse = await alchemy.core.getBalance('umadao.eth');
      const balanceInWei = parseFloat(balanceResponse.toString());
      const balanceInEther = balanceInWei / 1e18;
      setBalance(parseFloat(balanceInEther.toFixed(3)));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  const lenis = new Lenis({
    lerp: 0.05,
    smoothWheel: true,
    orientation: 'vertical',
  });

  lenis.on('scroll', (e) => {
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <div className="app">
      <Header balance={balance} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;