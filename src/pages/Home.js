import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import "../assets/_scss.scss";
import CurrentRoundComponent from "../components/CurrentRound"
import FAQ from "../components/FAQ"
import { Alchemy, Network } from "alchemy-sdk";
import Fade from 'react-reveal/Fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
// import { Link } from "react-router-dom";

const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

const Home = () => {
    const [owners, setOwners] = useState(0);
    const [uma, setUma] = useState(0);
    const [rounds, setRounds] = useState([]);
    const [data, setData] = useState([]);
    const [props, setProps] = useState([]);
    const [lastMintedNFTs, setLastMintedNFTs] = useState([]);

    const fetchCollection = async () => {
        try {
            const collectionResponse = await alchemy.nft.getContractMetadata('0x2381B67c6f1CB732fDf8b3B29d3260eC6F7420bC');
            setUma(parseFloat(collectionResponse.totalSupply || '0')); // Handle undefined value
        } catch (error) {
            console.error(error);
        }
    }

    const fetchOwners = async () => {
        try {
            const ownersResponse = await alchemy.nft.getOwnersForContract('0x2381B67c6f1CB732fDf8b3B29d3260eC6F7420bC');
            setOwners(ownersResponse.owners.length); // Use ownersResponse.owners.length
        } catch (error) {
            // console.error(error);
        }
    }

    const fetchLastMintedNFTs = async () => {
        try {
            const collectionAddress = '0x2381B67c6f1CB732fDf8b3B29d3260eC6F7420bC';
            const totalSupply = uma;

            if (totalSupply > 0) {
                const lastMintedNFTsArray = [];

                for (let tokenId = totalSupply - 8; tokenId <= totalSupply - 1; tokenId++) {
                    const nftMetadata = await alchemy.nft.getNftMetadata(collectionAddress, tokenId);
                    lastMintedNFTsArray.push(nftMetadata);
                }

                setLastMintedNFTs(lastMintedNFTsArray);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRounds = async () => {
        try {
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
              voteCountFor
              tldr
            }
          }
        }
        }`;
            const response = await fetch("https://prod.backend.prop.house/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query })
            });
            const result = await response.json();
            console.log('result', result)
            setData(result.data);
            setRounds(result.data.findByAddress.auctions)

            const auctions = result.data.findByAddress.auctions;
            const winners = []

            for (let i = auctions.length - 1; i >= 0; i--) {
                const item = auctions[i];

                if (item.status === "Closed") {
                    const numProposals = item.proposals.length;

                    if (numProposals < 5) {
                        for (let i = item.proposals.length - 1; i >= 0; i--) {
                            const prop = item.proposals[i]
                            if (prop.voteCountFor > 0) {
                                winners.push(prop)
                            }
                        }
                    } else {
                        const sortedProposals = item.proposals
                            .filter(prop => prop.voteCountFor > 0)
                            .sort((a, b) => b.voteCountFor - a.voteCountFor);
                        for (let k = 0; k < Math.min(5, sortedProposals.length); k++) {
                            console.log(sortedProposals[k])
                            winners.push(sortedProposals[k]);
                        }
                    }
                }
            }
            setProps(winners)
        } catch (err) {
            console.log(err)
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        fetchRounds();
        fetchOwners();
        fetchCollection();
        fetchLastMintedNFTs();
    }, []);

    useEffect(() => {
        if (uma > 0) {
            fetchLastMintedNFTs();
        }
    }, [uma]);

    return (
        <main>
            <section id="propHouse">
                <div className='container'>
                    <div className='hero'>
                        {rounds.length > 0 && <CurrentRoundComponent data={data} />}
                    </div>
                    <Fade top>
                        <h2>Rounds run on a weekly basis <Fade bottom delay="500"><span>via Prop House public infrastructure</span></Fade></h2>
                    </Fade>

                    <a href="https://prop.house/uma" className="bulb" target="_blank" rel="noopener noreferrer">
                        <Fade bottom delay="800">
                            <img src="img/bulb.png" alt="Prop House" />
                        </Fade>
                    </a>

                </div>

                <div className="background">
                    <img src="img/bg-hero-3.svg" alt="" className="noMobile" />
                    <img src="img/bg-hero-2.svg" alt="" className="mobile" />
                </div>
            </section>

            <section id="about" className="content">
                <div className="container">
                    <div className="col">
                        <Fade top>
                            <div className="colHero">
                                <h3>CC<span className='u'>0</span></h3>
                            </div>
                        </Fade>
                        <Fade bottom delay="300">
                            <div className="colContent">
                                <p>Asking for permission to create is tedious</p>
                                <p><a href="https://creativecommons.org/share-your-work/public-domain/cc0/" target="_blank" rel="nofollow">no copyright reserved?</a></p>
                            </div>
                        </Fade>
                    </div>
                    <div className="col">
                        <Fade top>
                            <div className="colHero">
                                <h3><span className='u'>0</span><span className="s">%</span></h3>
                            </div>
                        </Fade>
                        <Fade bottom delay="300">
                            <div className="colContent">
                                <p>No royalty fees on secondary sales</p>
                                <p>Why should there be a tax on liquidity?</p>
                            </div>
                        </Fade>
                    </div>
                    <div className="col">
                        <Fade top>
                            <div className="colHero">
                                <Swiper
                                    className='uh'
                                    direction={'vertical'}
                                    effect={'fade'}
                                    slidesPerView={1}
                                    loop={true}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 2700,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[EffectFade, Autoplay]}
                                >
                                    <SwiperSlide>
                                        <h3>
                                            <span className='u'>{owners}</span> human<span className="l">s</span>
                                        </h3>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <h3>
                                            <span className='u'>{uma}</span> UMA<span className="l">s</span>
                                        </h3>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </Fade>
                        <Fade bottom delay="300">
                            <div className="colContent">
                                <p>Next holders decided by current holders</p>
                                <p>1 UMA = 1 vote</p>
                            </div>
                        </Fade>
                    </div>
                </div>

                <div className="background">
                    <img src="img/bg-hero-4.svg" alt="" className="noMobile" />
                </div>

            </section>

            <div className="aspiring">
                   <span className="notYet">aspiring to be</span>
                    <Swiper
                        className='asp'
                        direction={'vertical'}
                        effect={'fade'}
                        slidesPerView={1}
                        loop={true}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2700,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[EffectFade, Autoplay]}
                    >
                        <SwiperSlide><h1>decentralized</h1></SwiperSlide>
                        <SwiperSlide><h1>autonomous</h1></SwiperSlide>
                        <SwiperSlide><h1>organized</h1></SwiperSlide>
                        <SwiperSlide><h1>social</h1></SwiperSlide>
                        <SwiperSlide><h1>fun</h1></SwiperSlide>
                    </Swiper>
                </div>

            <section id="props" className="content">
                <span className="bc"><span>last proposals</span></span>
                <div className='lastProps'>
                    <Fade bottom cascade>
                        <ul>
                            {props.slice(0, 5).map((p, index) => (
                                <li key={index}>
                                    <h4><span>{props.length - index}. </span>{p.title}</h4>
                                    <p>{p.tldr}</p>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                    <Fade bottom cascade>
                        <ul>
                            {props.slice(5, 10).map((p, index) => (
                                <li key={index}>
                                    <h4><span>{props.length - index - 5}. </span>{p.title}</h4>
                                    <p>{p.tldr}</p>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>

                {/* <div className='bc'>
                <button className='button'>
                        <svg className="button__shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <path className="button__path" d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0 z" />
                        </svg>
                        <span className="button__content">
                            DISCOVER MORE PROPOSALS
                        </span>
                </button>
                </div> */}

                {lastMintedNFTs.length > 0 && (
                    <Fade bottom cascade>
                        <div className="umaImgs">
                            {Array.from(lastMintedNFTs).reverse().map((nft, index) => (
                                <img
                                    key={index}
                                    src={nft.rawMetadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                                    alt={`NFT ${index}`}
                                />
                            ))}
                        </div>
                    </Fade>
                )}


            </section>

            <section className="uma">
                <h1>UMA = <span className='u'>U</span>NIDENTIFIED <br /><span className='u'>M</span>YSTERY <span className='u'>A</span>NIMAL.</h1>
            </section>

            <section id="mint">
                <a href="https://embed.ipfscdn.io/ipfs/bafybeihazpt6pkm4azgtupdz7hc2j3o4zpjsvtcgfq4t2keozxkss3ud6q/?contract=0x2381B67c6f1CB732fDf8b3B29d3260eC6F7420bC&chain=%7B%22name%22%3A%22Ethereum+Mainnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fethereum.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22eth%22%2C%22chainId%22%3A1%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22ethereum%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Fethereum%2F512.png%22%2C%22height%22%3A512%2C%22width%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=4151c615f1904ce872ce08ca2fe34c49&theme=dark&primaryColor=blue" target="_blank" rel="nofollow">
                    <img src="./img/bubble.png" alt="" />
                    <span>Mint</span>
                </a>
            </section>

            <FAQ />
        </main>
    );
}

export default Home;