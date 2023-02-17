import React from "react";

import { Link } from "react-router-dom";
import DesignCard from "../components/DesignCard";
import video from "../../public/assets/images/video.png";
import photoshop from "../../public/assets/images/photoshop.png";
import figma from "../../public/assets/images/figma.png";
import canva from "../../public/assets/images/canva2.png";
import procreate from "../../public/assets/images/procreate.png";
import html from "../../public/assets/images/html.png";

function Design() {
  const link = [
    "https://www.udemy.com/course/adobe-premiere-pro-video-editing/",
    "https://www.udemy.com/course/adobe-photoshop-cc-essentials-training-course/",
    "https://www.udemy.com/course/learn-figma/",
    "https://www.codecademy.com/learn/deploy-a-website",
    "https://www.udemy.com/course/drawing-and-painting-on-the-ipad-with-procreate/",
    "https://www.udemy.com/course/1-hour-html/",
  ];
  const title = [
    "ADOBE PREMIERE PRO VIDEO EDITING",
    "ADOBE PHOTOSHOP CC – Essentials Training Course",
    "LEARN FIGMA - UI/UX Design Essential Training",
    "CANVA - THE BASICS",
    "DRAWING AND PAINTING WITH PROCREATE",
    "HTML FOR COMPLETE BEGINNERS",
  ];
  const description = [
    "Learn Beginner-Advanced Adobe Premiere Pro Video Editing, Audio Editing, Color Grading, Motion Graphics, Green Screen+.",
    "This Adobe Photoshop Essentials course will teach you Photoshop Retouching as well as Photoshop for graphic design.",
    "Learn how to design a beautiful and engaging mobile app with Figma. Learn-by-doing approach.",
    "Learn how to publish a personal website to the public Internet. Deploying—or pushing new code to a server—is an integral part of a developer’s daily workflow. ",
    "Learn how to draw on your iPad with this complete Procreate course! Bring your imaginations to life with digital art!",
    " Have you ever wanted to learn to code but don't know where to start? This course starts you off with the basic coding language of HTML. ",
  ];

  return (
    <div className="bg-pink-100">
      <div className="p-4 flex flex-row flex-wrap flex-col-3 gap-20 w-[1400px] mx-auto mt-20">
        <DesignCard
          image={video}
          link={link[0]}
          title={title[0]}
          description={description[0]}
        />
        <DesignCard
          image={photoshop}
          link={link[1]}
          title={title[1]}
          description={description[1]}
        />
        <DesignCard
          image={figma}
          link={link[2]}
          title={title[2]}
          description={description[2]}
        />
        <DesignCard
          image={canva}
          link={link[3]}
          title={title[3]}
          description={description[3]}
        />
        <DesignCard
          image={procreate}
          link={link[4]}
          title={title[4]}
          description={description[4]}
        />
        <DesignCard
          image={html}
          link={link[5]}
          title={title[5]}
          description={description[5]}
        />
      </div>
    </div>
  );
}

export default Design;
