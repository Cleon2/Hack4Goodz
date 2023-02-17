import React from "react";

import { Link } from "react-router-dom";
import DesignCard from "../components/DesignCard";
import micro from "../../public/assets/images/micro.png";
import Excel from "../../public/assets/images/Excel.jpg";
import fa from "../../public/assets/images/fa.png";
import xcel from "../../public/assets/images/xcel.jpg";
import GREEN from "../../public/assets/images/GREEN.jpg";
import dart from "../../public/assets/images/dart.jpg";

function Data() {
  const link = [
    "https://www.udemy.com/course/adobe-premiere-pro-video-editinghttps://www.udemy.com/course/microsoft-office-excel-word-access-powerpoint/",
    "https://www.udemy.com/course/excel-crash-course-full-tutorial/",
    "https://www.udemy.com/course/the-complete-financial-analyst-course/",
    "https://www.udemy.com/course/thebestexcel/",
    "https://www.udemy.com/course/data-analysis-with-excel-pivot-tables/",
    "https://www.udemy.com/course/google-data-studio-by-starttech/",
  ];
  const title = [
    "ULTIMATE MICROSOFT OFFICE - Excel, Word, PowerPoint & Access",
    "EXCEL for beginners",
    "COMPLETE FINANCIAL ANALYST COURSE",
    "ULTIMATE MICROSOFT EXCEL MASTERY COURSE",
    "Microsoft Excel - Data Analysis with Excel Pivot Tables",
    "LEARN GOOGLE DATA STUDIO",
  ];
  const description = [
    "Learn basic to advanced Microsoft Office skills in this 9-course bundle for Office 365 or Office 2019",
    "The complete 8-hour Excel course compatible with MS Office 365, or ANY version of Excel. Zero to HERO!",
    "Excel, Accounting, Financial Statement Analysis, Business Analysis, Financial Math, PowerPoint: Everything is Included!",
    "This Microsoft Excel class will make you a master of Microsoft Excel. The training uses Excel 2013 for Windows.",
    "Learn how to draw on your iPad with this complete Procreate course! Bring your imaginations to life with digital art!",
    " Use Google Data Studio (now Looker Studio) to create reports & visualizations from Google Sheets| Google Analytics. ",
  ];

  return (
    <div className="bg-red-100">
      <div className="p-4 flex flex-row flex-wrap flex-col-3 gap-20 w-[1400px] mx-auto mt-20 justify-center">
        <DesignCard
          image={micro}
          link={link[0]}
          title={title[0]}
          description={description[0]}
        />
        <DesignCard
          image={Excel}
          link={link[1]}
          title={title[1]}
          description={description[1]}
        />
        <DesignCard
          image={fa}
          link={link[2]}
          title={title[2]}
          description={description[2]}
        />
        <DesignCard
          image={xcel}
          link={link[3]}
          title={title[3]}
          description={description[3]}
        />
        <DesignCard
          image={GREEN}
          link={link[4]}
          title={title[4]}
          description={description[4]}
        />
        <DesignCard
          image={dart}
          link={link[5]}
          title={title[5]}
          description={description[5]}
        />
      </div>
    </div>
  );
}

export default Data;
