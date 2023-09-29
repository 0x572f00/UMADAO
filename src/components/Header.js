import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = (balance) => {

document.querySelectorAll('button[data-target]').forEach(button => {
  button.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

    return (
    <header>
          <div>
          <Link to="/">
           <h1>
            <img src="./img/UMADAO.svg" alt="UMA DAO"/>
           </h1>
           </Link>
           <div className="treasury">
            <a href="https://etherscan.io/address/0x04bd511785f282a25039098fca5a421674c159ef" target="_blank" rel="nofollow">
              <span>Treasury</span>
              <div id="balance">
                <img src="img/icons/eth.svg" alt="ETH"/>{balance.balance}
              </div>
            </a>
            </div>
          </div>

          <nav>
            <ul>
              <li>
              <button className="button" data-target="about">
                <svg className="button__shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className="button__path" d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0 z"/>
                </svg>
                <span className="button__content">
                  ABOUT US
                </span>
              </button>
              </li>
              <li>
              <button className="button" data-target="props">
                <svg className="button__shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className="button__path" d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0 z"/>
                </svg>
                <span className="button__content">
                  GALLERY
                </span>
              </button>
              </li>
              <li>
              <button className="button" data-target="mint">
                <svg className="button__shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className="button__path" d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0 z"/>
                </svg>
                <span className="button__content">
                  MINT
                </span>
              </button>
              </li>
              <li>
              <button className="button" data-target="faq">
                <svg className="button__shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className="button__path" d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0 z"/>
                </svg>
                <span className="button__content">
                  F.A.Q
                </span>
              </button>
              </li>
            </ul>
          </nav>

            <div className="social">
              <a href="https://discord.gg/ryZsjTaryF" target="_blank">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M98.1805 24.9821C90.9534 21.6733 83.3238 19.326 75.4866 18C74.4142 19.9172 73.4438 21.8896 72.5796 23.9092C64.2315 22.6513 55.7421 22.6513 47.394 23.9092C46.5294 21.8899 45.559 19.9174 44.487 18C36.6449 19.3372 29.0103 21.6901 21.7759 24.9994C7.41379 46.2483 3.52045 66.9695 5.46712 87.3966C13.8779 93.6109 23.292 98.3369 33.3002 101.369C35.5537 98.3384 37.5478 95.123 39.2613 91.7571C36.0068 90.5416 32.8655 89.0419 29.874 87.2755C30.6613 86.7044 31.4314 86.1161 32.1754 85.5451C40.88 89.6387 50.3807 91.7611 59.9998 91.7611C69.6189 91.7611 79.1196 89.6387 87.8242 85.5451C88.5769 86.1594 89.3469 86.7477 90.1256 87.2755C87.1283 89.0448 83.9813 90.5473 80.721 91.7658C82.4324 95.1301 84.4266 98.3428 86.6821 101.369C96.6988 98.3491 106.12 93.6253 114.532 87.4052V87.4052C116.817 63.7164 110.63 43.1856 98.1805 24.9821ZM41.7271 74.8341C36.3024 74.8341 31.8207 69.9112 31.8207 63.8549C31.8207 57.7986 36.1466 52.8324 41.7098 52.8324C47.2729 52.8324 51.72 57.7986 51.6248 63.8549C51.5296 69.9112 47.2556 74.8341 41.7271 74.8341ZM78.2725 74.8341C72.8392 74.8341 68.3748 69.9112 68.3748 63.8549C68.3748 57.7986 72.7007 52.8324 78.2725 52.8324C83.8443 52.8324 88.2568 57.7986 88.1616 63.8549C88.0664 69.9112 83.8011 74.8341 78.2725 74.8341Z" className="fill"/>
                </svg>
              </a>
              <a href="https://twitter.com/UMADAO_xyz" target="_blank">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100.793 38.9116C100.856 39.8229 100.856 40.7343 100.856 41.654C100.856 69.6788 79.5215 102 40.5101 102V101.983C28.9861 102 17.7014 98.699 8 92.475C9.67569 92.6766 11.3598 92.7774 13.0481 92.7816C22.5983 92.79 31.8755 89.5856 39.3888 83.685C30.3132 83.5128 22.3547 77.5953 19.5745 68.9565C22.7537 69.5696 26.0295 69.4437 29.1499 68.5911C19.2553 66.592 12.1367 57.8986 12.1367 47.8024V47.5336C15.085 49.1757 18.3859 50.0871 21.7625 50.1879C12.4433 43.9597 9.5707 31.562 15.1983 21.8691C25.9665 35.1192 41.8541 43.1743 58.9092 44.0269C57.1999 36.6605 59.5349 28.9414 65.045 23.7631C73.5873 15.7332 87.0222 16.1448 95.0521 24.6829C99.802 23.7463 104.355 22.0034 108.521 19.534C106.937 24.4435 103.624 28.6138 99.1972 31.2639C103.401 30.7683 107.509 29.6428 111.376 27.9251C108.529 32.192 104.942 35.9088 100.793 38.9116Z" className="fill"/>
                </svg>
              </a>

            </div>
        </header>
    );
};

export default Header;
