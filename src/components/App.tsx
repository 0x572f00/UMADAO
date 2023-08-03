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
  setData(result.data);
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
        ROUND {data.findByAddress.auctions.length} is <br className="mobile"/><span className="status">OPEN</span>
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
        ROUND {data.findByAddress.auctions.length} <br className="mobile"/>is <span className="status">BEING VOTED</span>
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
            <div className="logo"><div className="logoContainer"><h1><img src="./img/UMADAO.svg" alt="UMA DAO"/></h1></div></div>
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

              <div className="umaImgs">
                  <img src="img/tokens/165.jpg" alt=""/>
                  <img src="img/tokens/166.jpg" alt=""/>
                  <img src="img/tokens/167.jpg" alt=""/>
                  <img src="img/tokens/168.jpg" alt=""/>
              </div>

              <div className="aspiring">
              <h3>Aspiring to be</h3>
              <span className="spin"><span className="item">decentralized</span><span className="item">autonomous</span> <span className="item">organized</span><span className="item">social</span><span className="item">fun</span></span>

              </div>
        </section>

        <section id="mint">
            <a href="https://ipfs.io/ipfs/bafybeiev2gmkthauyzpvagqcs77lhoo4aoe5cgb6xk76uy3gwfrfnrh644/nft-drop.html?contract=0x2381B67c6f1CB732fDf8b3B29d3260eC6F7420bC&chainId=1" target="_blank" rel="nofollow">
              <img src="./img/bubble.png" alt=""/>
              <span>Mint</span>
            </a>
        </section>

        <section className="faq">

          <div className="uma">
            <h1>UMA = <span className='u'>U</span>NIDENTIFIED <br/><span className='u'>M</span>YSTERY <span className='u'>A</span>NIMAL.</h1>
          </div>

          <div className="content">

          <div className="container">
              <div className="col">
                <div className="colHero">
                  <h3>CC<span className='u'>0</span></h3>
                </div>
                <div className="colContent">
                <p>"no copyright reserved"</p>
                </div>
              </div>
              <div className="col">
                <div className="colHero">
                  <h3>UMA DAO / UMA House</h3>
                </div>
                <div className="colContent">
                <p>UMA decentralized autonomous organization</p>
                </div>
              </div>
            </div>

          <h2>
              <span className='u'>F</span>requently <span className='u'>a</span>sked <span className='u'>q</span>uestions
          </h2>

          <div>
            <h3>What is UMA?</h3>
            <p><strong>UMA = UNIDENTIFIED MYSTERY ANIMAL.</strong> <br/>UMA is a no copyright ❌© character based on toys made in Japan by Sun-Min Kim + David Horvath. <br/>No copyright means you are free to reproduce, reuse, and repurpose UMA in your projects.</p>
            <p>UMA is licensed under CC0 and is in the public domain. Forever. For all.</p>
          </div>
          <div>
            <h3>What does it mean to be licensed under CCO?</h3>
            <p>CC0 is the "no copyright reserved" option in the Creative Commons toolkit. It effectively means relinquishing all copyright and similar rights to a work and dedicating those rights to the public domain. <br/>Again this means, Forever. For all.</p>
          </div>
          <div>
            <h3>What is a DAO?</h3>
            <p>A decentralized autonomous organization (DAO) is a system developed to distribute decision-making, management, and entity ownership. Instead of relying on a single individual or small collection of individuals to guide the entity's direction, a DAO intends to give every member a voice, vote, and opportunity to propose initiatives. <br/>In the UMA DAO, this is done through the UMA House on the Prop House infrastructure.</p>
          </div>
          <div>
            <h3>What is the UMA DAO / UMA House?</h3>
            <p>The UMA decentralized autonomous organization (DAO) exists to expand the UMA universe.  The UMA house was created by Matas to help the expansion, by incentivizing builders & creators to work on and with UMA.</p>
            <p>Rounds are run on a weekly basis & all winning proposals get rewarded with a UMA NFT each, which doubles as a vote for all future rounds.</p>
          </div>
          <div>
            <h3>How Do I Mint a UMA? I can't mint! <br/>How can I be put on the Allowlist?</h3>
            <p>Rounds are held weekly at UMA House, which is your opportunity to submit a proposal. Proposals are your opportunity to pitch your vision of how you would expand the UMA-verse. At the end of a round holders of a UMA NFT are able to vote on the top 5 proposals. Those top 5 proposals are then able to mint their UMA NFT which allows them to then vote in future rounds of the UMA House. <br/>This is how the UMA-verse expands and evolves over time through the creativity of the contributors' proposals.</p>
          </div>
          <div>
            <h3>How are winning proposals selected?</h3>
            <p>Current holders vote on their favorite proposals each week. One UMA being equal to one vote.</p>
            <p>In case of ties, the tied proposals submitted earliest get priority. So the top 5 proposals as they show up on Prop House after a completed round, win. <br/>1 UMA = 1 vote.</p>
            <p>Resubmit your proposal if you don't make it in a given round. <br/>Resubmitting is easy and encouraged.</p>
          </div>
          <div>
            <h3>What's the best way to get involved?</h3>
            <p>Join the <a href="https://discord.com/invite/ryZsjTaryF" className="text-primary" target="_blank" rel="nofollow">UMA discord</a>, and say hi! Propose a contribution through the <a href="https://prop.house/uma" className="text-primary" target="_blank"  rel="nofollow">UMA Prop House</a>! Or direct message <a href="https://twitter.com/matascup" className="text-primary" target="_blank" rel="nofollow">@Matas</a>, @razorsuns, or other UMA DAO members on Twitter, they will be more than happy to help you get involved.</p>
          </div>
          <div>
            <h3>How many UMAs will there be?</h3>
            <p>Hopefully a lot. UMAs are meant to be inflationary, where the potential value lost to inflation will be more than made up for by the new contributions added to the ecosystem. Matas will be reserving 10% of the supply.</p>
          </div>

          <h1 className="forever">
            UMA. Forever. For all.
          </h1>


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
