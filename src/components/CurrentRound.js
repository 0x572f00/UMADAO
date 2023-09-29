import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

const CurrentRoundComponent = ({ data }) => {

  const [position, setPosition] = useState(-1);

  useEffect(() => {
    if (data.findByAddress.auctions.length > 1) {
      for (let i = data.findByAddress.auctions.length - 1; i >= 0; i--) {
        if (data.findByAddress.auctions[i].status === 'Upcoming') {
          setPosition(i);
          break;
        } else {
          setPosition(i+1);
          break;
        }
      }
    }
  }, [data.findByAddress.auctions]);

  if (position >= 0) {
   if (data.findByAddress.auctions[position - 1].status === 'Open') {
      const d = new Date(data.findByAddress.auctions.slice(position - 1)[0].proposalEndTime);
      const format = {
        month: "long",
        day: "numeric"
      };
      return (
        <>
          <a href={'https://prop.house/uma/round-' + position} target="_blank" rel="nofollow">
          <Fade top>
            <h1>
              ROUND {position} is <span className="status">OPEN</span>
            </h1>
            </Fade>
            <Fade bottom delay="1000">
            <div className="deadline">
              <span>accepting proposals until <b>{d.toLocaleString("en-US", format)}</b></span>
            </div>
            </Fade>
          </a>
        </>
      );
    }
  
    if (data.findByAddress.auctions[position - 1].status === 'Voting') {
      const d = new Date(data.findByAddress.auctions.slice(position - 1)[0].votingEndTime);
      const format = {
        month: "long",
        day: "numeric"
      };
      return (
        <>
          <a href={'https://prop.house/uma/round-' + position} target="_blank" rel="nofollow">
            <h1>
              ROUND {position} is <span className="status">BEING VOTED</span>
            </h1>
            <div className="deadline">
              accepting votes until <b>{d.toLocaleString("en-US", format)}</b>
            </div>
          </a>
        </>
      );
    }

    if (data.findByAddress.auctions[position - 1].status === 'Closed') {
      return (
        <>
      <a href={'https://prop.house/uma/round-' + data.findByAddress.auctions.length} target="_blank" rel="nofollow">
        <h1>
          ROUND {data.findByAddress.auctions.length} is <span className="status">CLOSED</span>
        </h1>
        <div className="deadline">
         click to discover!
        </div>
      </a>
        </>
      );
    }
  
  }
    return null;
  };
  
  export default CurrentRoundComponent;
  