import raccoonGif from "../../assets/img/raccoon-paint.gif";
import reactLogo from "../../assets/img/technologies-logos/react.png";
import solidityLogo from "../../assets/img/technologies-logos/solidity.png";
import flutterLogo from "../../assets/img/technologies-logos/flutter.png";

export default function About() {
  return (
    <div className="about">
      <div className="japaneseWord">なぜこれを翻訳するのですか？</div>
      <div className="raccoonGif">
        <img src={raccoonGif} alt="Raccoon Gif" />
      </div>
      <div className="textDescription">
        <h3 className="descriptionTittle">
          Hi there, I'm Raccoon! 🦝
        </h3>
        <p className="description">
          a software developer based in South America - Bolivia.
          <br />
          <br />
          Let me introduce myself as a lover of new ideas and pineapple pizza.
          <br />I made some funny projects in different platforms, but right
          now, im really involved in web3 space. So, if you have an idea for a
          project don't doubt to contact me! :D.
          <br /> <br />
          Some of the technologies that i worked with :
          <br /> <br />
          <br /> <br />
          <div className="techLogos">
            <div
              className="tooltip tooltipReact"
              data-text="Creation of web apps using React/Redux and Material UI."
            >
              <img src={reactLogo} alt="react"></img>
            </div>

            <div
              className="tooltip tooltipSolidity"
              data-text="Creation of ERC20, ERC721a and tokens staking."
            >
              <img src={solidityLogo} alt="solidity"></img>
            </div>

            <div
              className="tooltip tooltipFlutter"
              data-text="Apps development using Clean Architecture, cubit and dart code patterns."
            >
              <img src={flutterLogo} alt="flutter"></img>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
}
