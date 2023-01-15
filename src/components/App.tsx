import 'regenerator-runtime/runtime'
import React, { Component, useState, useRef, useEffect } from 'react';
import "./../assets/scss/App.scss";

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "sAXipCmhTF1WrjwM_EHJoEPk2517F3xe",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

function Int2Float32(bytes) {
    var sign = (bytes & 0x80000000) ? -1 : 1;
    var exponent = ((bytes >> 23) & 0xFF) - 127;
    var significand = (bytes & ~(-1 << 23));

    if (exponent == 128)
        return sign * ((significand) ? Number.NaN : Number.POSITIVE_INFINITY);

    if (exponent == -127) {
        if (significand === 0) return sign * 0.0;
        exponent = -126;
        significand /= (1 << 22);
    } else significand = (significand | (1 << 23)) / (1 << 23);

    return sign * significand * Math.pow(2, exponent);
}


export default function App() {
  const [balance, setBalance] = useState(0);
  const [owners, setOwners] = useState(0);
  const [uma, setUma] = useState(0);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rounds, setRounds] = useState([]);

  const checkBalance = async () => {
    try {
      const balance = await alchemy.core.getBalance('umadao.eth');
      var b = parseInt(balance) / 1000000000000000000
      setBalance(b.toFixed(3))
    } catch (error) {
      console.log(error);
    }
  }

  const checkOwners = async () => {
    try {
      const o = await alchemy.nft.getOwnersForContract('0x2381B67c6f1CB732fDf8b3B29d3260eC6F7420bC');
      setOwners(o.owners)
    } catch (error) {
      console.log(error);
    }
  }

  const checkCollection = async () => {
    try {
      const o = await alchemy.nft.getContractMetadata('0x2381B67c6f1CB732fDf8b3B29d3260eC6F7420bC');
      setUma(o.totalSupply)
    } catch (error) {
      console.log(error);
    }
  }

  const query = `query {
findByAddress(address: "0x2381b67c6f1cb732fdf8b3b29d3260ec6f7420bc") {
  name
  auctions {
    status
    votingEndTime
    proposalEndTime
    proposals {
      title
      address
      voteCount
    }
  }
}
}`;

const fetchRounds = async () => {
try {
  setLoading(true);
  const response = await fetch("https://prod.backend.prop.house/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });
  const result = await response.json();
  console.log(result)
  setData(result.data);

  console.log('currentProp', result.data.findByAddress.auctions.slice(-1))
  setRounds(result.data.findByAddress.auctions)

} catch (err) {
  setError(err);
} finally {
  setLoading(false);
}
};

  useEffect(() => {
    fetchRounds();
    checkBalance()
    checkOwners()
    checkCollection()
  }, []);

  // (function() {
  //     // Add event listener
  //     document.addEventListener("mousemove", parallax);
  //     const elem = document.querySelector("#mint");
  //     // Magic happens here
  //     function parallax(e) {
  //         let _w = window.innerWidth/2;
  //         let _h = window.innerHeight/2;
  //         let _mouseX = e.clientX;
  //         let _mouseY = e.clientY;
  //         let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
  //         let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
  //         let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
  //         let x = `${_depth3}, ${_depth2}, ${_depth1}`;
  //         console.log(x);
  //         elem.style.backgroundPosition = x;
  //     }
  //
  // })();

  // {
  //     rounds.length > 0 &&
  //     <section className="pastRounds hidden">
  //       <h2>Past rounds</h2>
  //
  //       <div className="container">
  //
  //     <div className="col">
  //       <div className="colHero">
  //         <h3>Round {rounds.length - 1}</h3>
  //       </div>
  //       <div className="colContent">
  //         {
  //           [].concat(rounds[rounds.length - 1].proposals.map((value, index) => {
  //            return (
  //              <div key={index}>
  //              {value.title}
  //              </div>
  //            )
  //           }))
  //         }
  //       </div>
  //     </div>
  //
  //     <div className="col">
  //     <div className="colHero">
  //       <h3>Round {rounds.length - 2}</h3>
  //     </div>
  //     <div className="colContent">
  //       {
  //         [].concat(rounds[rounds.length - 2].proposals.map((value, index) => {
  //          return (
  //            <div key={index}>
  //            {value.title}
  //            </div>
  //          )
  //         }))
  //       }
  //     </div>
  //     </div>
  //
  //     <div className="col">
  //     <div className="colHero">
  //       <h3>Round {rounds.length - 3}</h3>
  //     </div>
  //     <div className="colContent">
  //       {
  //         [].concat(rounds[rounds.length - 3].proposals.map((value, index) => {
  //          return (
  //            <div key={index}>
  //            {value.title}
  //            </div>
  //          )
  //         }))
  //       }
  //     </div>
  //     </div>
  //
  //     </div>
  //
  //     </section>
  // }
  //

  function CurrentRoundComponent() {

    if(data.findByAddress.auctions.slice(-1)[0].status == 'Open') {

      const d = new Date(data.findByAddress.auctions.slice(-1)[0].proposalEndTime);
      const format = {
        month: "long",
        day: "numeric"
      }
      return (
      <>
      <a href={'https://prop.house/uma/round-'+data.findByAddress.auctions.length} target="_blank" rel="nofollow">
      <h1>
        ROUND {data.findByAddress.auctions.length} is <span className="status">OPEN</span>
      </h1>
      <div class="deadline">
        accepting proposals until <b>{d.toLocaleString("en-US", format)}</b>
      </div>
      </a>
      </>
    )
    }

    if(data.findByAddress.auctions.slice(-1)[0].status == 'Voting') {

      const d = new Date(data.findByAddress.auctions.slice(-1)[0].votingEndTime);
      const format = {
        month: "long",
        day: "numeric"
      }
      return (
      <>
      <a href={'https://prop.house/uma/round-'+data.findByAddress.auctions.length} target="_blank" rel="nofollow">
      <h1>
        ROUND {data.findByAddress.auctions.length} is <span className="status">BEING VOTED</span>
      </h1>
      <div class="deadline">
        accepting votes until <b>{d.toLocaleString("en-US", format)}</b>
      </div>
      </a>
      </>
    )
    }

  }

  return (
  <div className="app">

        <header>
            <div className="treasury">
            <a href="https://etherscan.io/address/0x04bd511785f282a25039098fca5a421674c159ef" target="_blank" rel="nofollow">
              <span>Treasury</span>
              <div id="balance">
                <img src="img/icons/eth.svg" alt="ETH"/>{balance}
              </div>
            </a>
            </div>
            <div className="logo"><div className="logoContainer"><img src="./img/UMADAO.svg" alt="UMA DAO"/></div></div>
            <div className="social">
              <a href="https://discord.gg/ryZsjTaryF" target="_blank">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M98.1805 24.9821C90.9534 21.6733 83.3238 19.326 75.4866 18C74.4142 19.9172 73.4438 21.8896 72.5796 23.9092C64.2315 22.6513 55.7421 22.6513 47.394 23.9092C46.5294 21.8899 45.559 19.9174 44.487 18C36.6449 19.3372 29.0103 21.6901 21.7759 24.9994C7.41379 46.2483 3.52045 66.9695 5.46712 87.3966C13.8779 93.6109 23.292 98.3369 33.3002 101.369C35.5537 98.3384 37.5478 95.123 39.2613 91.7571C36.0068 90.5416 32.8655 89.0419 29.874 87.2755C30.6613 86.7044 31.4314 86.1161 32.1754 85.5451C40.88 89.6387 50.3807 91.7611 59.9998 91.7611C69.6189 91.7611 79.1196 89.6387 87.8242 85.5451C88.5769 86.1594 89.3469 86.7477 90.1256 87.2755C87.1283 89.0448 83.9813 90.5473 80.721 91.7658C82.4324 95.1301 84.4266 98.3428 86.6821 101.369C96.6988 98.3491 106.12 93.6253 114.532 87.4052V87.4052C116.817 63.7164 110.63 43.1856 98.1805 24.9821ZM41.7271 74.8341C36.3024 74.8341 31.8207 69.9112 31.8207 63.8549C31.8207 57.7986 36.1466 52.8324 41.7098 52.8324C47.2729 52.8324 51.72 57.7986 51.6248 63.8549C51.5296 69.9112 47.2556 74.8341 41.7271 74.8341ZM78.2725 74.8341C72.8392 74.8341 68.3748 69.9112 68.3748 63.8549C68.3748 57.7986 72.7007 52.8324 78.2725 52.8324C83.8443 52.8324 88.2568 57.7986 88.1616 63.8549C88.0664 69.9112 83.8011 74.8341 78.2725 74.8341Z" className="fill"/>
                </svg>
              </a>
              <a href="https://twitter.com/matascup" target="_blank">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100.793 38.9116C100.856 39.8229 100.856 40.7343 100.856 41.654C100.856 69.6788 79.5215 102 40.5101 102V101.983C28.9861 102 17.7014 98.699 8 92.475C9.67569 92.6766 11.3598 92.7774 13.0481 92.7816C22.5983 92.79 31.8755 89.5856 39.3888 83.685C30.3132 83.5128 22.3547 77.5953 19.5745 68.9565C22.7537 69.5696 26.0295 69.4437 29.1499 68.5911C19.2553 66.592 12.1367 57.8986 12.1367 47.8024V47.5336C15.085 49.1757 18.3859 50.0871 21.7625 50.1879C12.4433 43.9597 9.5707 31.562 15.1983 21.8691C25.9665 35.1192 41.8541 43.1743 58.9092 44.0269C57.1999 36.6605 59.5349 28.9414 65.045 23.7631C73.5873 15.7332 87.0222 16.1448 95.0521 24.6829C99.802 23.7463 104.355 22.0034 108.521 19.534C106.937 24.4435 103.624 28.6138 99.1972 31.2639C103.401 30.7683 107.509 29.6428 111.376 27.9251C108.529 32.192 104.942 35.9088 100.793 38.9116Z" className="fill"/>
                </svg>
              </a>
            </div>
        </header>

        <main>

        <section className="propHouse">

            {
                rounds.length > 0 &&
                <>
                  <CurrentRoundComponent/>
                </>
            }

        <h2>Rounds run on a weekly basis <span>via Prop House public infrastructure</span></h2>
          <a href="https://prop.house/uma" className="text-primary" target="_blank">
              <img src="img/bulb.png" alt="Prop House"/>
          </a>
        </section>

        <section className="content">
              <div className="container">
                  <div className="col">
                    <div className="colHero">
                      <h3>CC<span className='u'>0</span></h3>
                    </div>
                    <div className="colContent">
                    <p>Asking for permission to create is tedious</p>
                    <p><a href="https://creativecommons.org/share-your-work/public-domain/cc0/" target="_blank" rel="nofollow">What is CC0?</a></p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="colHero">
                      <h3><span className='u'>0</span><span className="s">%</span></h3>
                    </div>
                    <div className="colContent">
                    <p>No royalty fees on secondary sales</p>
                    <p>Why should there be a tax on liquidity?</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="colHero">
                      <h3>
                        <span className="spin">
                          <span className="item-hu"><span className='u'>{owners.length}</span> human<span className="l">s</span></span>
                          <span className="item-hu"><span className='u'>{uma}</span> UMA<span className="l">s</span></span>
                        </span>
                        </h3>
                    </div>
                    <div className="colContent">
                      <p>Next holders decided by current holders</p>
                      <p>1 UMA = 1 vote</p>
                      </div>
                  </div>
              </div>

              <div className="aspiring">
              <h3>Aspiring to be</h3>
              <span className="spin"><span className="item">decentralized</span><span className="item">autonomous</span> <span className="item">organized</span><span className="item">social</span><span className="item">fun</span></span>

              </div>
        </section>

        <section id="mint">
            <a href="https://gateway.ipfscdn.io/ipfs/QmYRUpn6nZjVrraGTTvHnFVAPAgiMoUvuPJAceTMMpBfCJ/nft-drop.html?contract=0x2381B67c6f1CB732fDf8b3B29d3260eC6F7420bC&chainId=1" target="_blank" rel="nofollow">
              <img src="./img/bubble.png" alt=""/>
              <span>Mint</span>
            </a>
        </section>

        <section className="faq">
          <div className="content">

          <h2>
              <span className='u'>F</span>requently <span className='u'>a</span>sked <span className='u'>q</span>uestions
          </h2>

          <div>
            <h3>I can't mint! How can I be put on the Allowlist?</h3>
            <p>Find a possible way to contribute, and propose your contribution on the <a href="https://prop.house/uma" className="text-primary">UMA Prop House</a>!</p>
            <p>If current holders like for it, you'll be able to join their ranks in exchange for your contributions.<br/>
            You'll get to mint an UMA and thus gain a vote for all further rounds! 1 UMA = 1 vote!</p>
          </div>
          <div>
            <h3>How are winning proposals selected?</h3>
            <p>Current holders vote on their favorite proposals each week. One UMA being equal to one vote.<br/>
            In case of ties, the tied proposals submitted earliest get priority. So the top 5 proposals as they show up on Prop House after a completed round, win.</p>
            <p>If you don't make it in a given round, resubmit your proposal! Resubmitting is easy and encouraged.</p>
          </div>
          <div>
            <h3>How many UMAs will there be?</h3>
            <p>Hopefully a lot.<br/>
            UMAs are meant to be inflationary, where the potential value lost to inflation will be more than made up for by the new contributions added to the ecosystem.</p>
            <p>I (Matas) will be reserving 10% of the supply.</p>
          </div>
          <div>
            <h3>Can I use UMA IP for my art/project/t-shirt store/game/etc?</h3>
            <p>Yes! UMA, originally created by Sun-Min Kim &amp; <a href="https://twitter.com/davidhorvath" className="text-primary" target="_blank">David Horvath</a>, is in the public domain.<br/>
            No copyright. CC0. (One of?)</p>
            <p>The first NFTs to open its art for commercial or any other use to the public</p>
          </div>
          <div>
            <h3>What's the best way to get involved?</h3>
            <p><a href="https://discord.com/invite/ryZsjTaryF" className="text-primary" target="_blank">Join the discord</a>, say hi! Propose a contribution through the <a href="https://prop.house/uma" className="text-primary" target="_blank">UMA Prop House</a>!<br/>Or&nbsp;<a href="https://twitter.com/matascup" className="text-primary" target="_blank">DM me on Twitter</a>, I'd be more than happy to help you get involved</p>
          </div>

          </div>

        </section>

        </main>

        <footer>
            <ul>
              <li>
              <a href="https://discord.gg/ryZsjTaryF" title="Discord" target="_blank" rel="nofollow">
                Discord
              </a>
              </li>
              <li>
                <a href="https://twitter.com/matascup" title="Twitter" target="_blank" rel="nofollow">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://etherscan.io/address/0x04bd511785f282a25039098fca5a421674c159ef" title="Etherscan" target="_blank" rel="nofollow">
                  Etherscan
                </a>
              </li>

            </ul>
            <div className="noCopyright">❌© NO COPYRIGHT</div>
        </footer>
      </div>
    )
}