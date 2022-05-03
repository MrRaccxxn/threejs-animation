import ContactVideo from "../../assets/video/contact.mp4";

export default function BackgroundVideo() {
  document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("video");
    let contact = document.getElementById("contact");

    contact.addEventListener("mouseover", function () {
      video.style.display = "block";
      video.currentTime = 0;
      video.play();
    });

    contact.addEventListener("mouseout", function () {
      video.style.display = "none";
      video.pause();
    });
  });

  return (
    <>
      {" "}
      <video id="video" autoPlay loop>
        <source src={ContactVideo} type="video/mp4" />
      </video>
    </>
  );
}
