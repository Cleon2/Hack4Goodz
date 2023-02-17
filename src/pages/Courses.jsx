import React from "react";
import Gear from "../../public/assets/images/beatriceGear.jpg";
import Excel from "../../public/assets/images/ExcelImage.jpg";
import File from "../../public/assets/images/FileImage.jpg";
import Person from "../../public/assets/images/personImg.jpg";
import Telephone from "../../public/assets/images/telephoneImg.jpg";
import Bling from "../../public/assets/images/bling.jpg";

import CourseIcon from "../components/CourseIcon";
function Courses() {
  return (
    <>
      <h1 className="text-2xl font-bold ml-40 mt-20">Categories</h1>
      <div className="flex gap-10 justify-center mt-5 flex-wrap">
        <CourseIcon image={Gear} title="IT" link="/it" />
        <CourseIcon image={Excel} title="Data" link="/Data" />
        <CourseIcon image={Bling} title="Design" link="/design" />

        <CourseIcon image={File} title="Language" />
        <CourseIcon image={Person} title="Marketing" />
        <CourseIcon image={Telephone} title="Customer Service" />
      </div>
    </>
  );
}

export default Courses;
