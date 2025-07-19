import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t ">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px] "
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to Forever – your go-to destination for timeless style and
            everyday essentials. At Forever, we believe fashion is more than
            just clothing — it’s a way to express who you are. Our mission is to
            bring you carefully curated collections that blend quality, comfort,
            and affordability. Whether you're updating your wardrobe, finding
            the perfect gift, or discovering something new, we’re here to make
            your shopping experience easy and enjoyable.
          </p>
          <p>
            We’re passionate about great design, customer satisfaction, and
            building a brand that grows with you. With secure shopping, fast
            delivery, and responsive support, Forever is committed to making
            every moment of your online shopping truly seamless.
          </p>
          <b>Our Mission</b>
          <p>
            At Forever, our mission is to deliver quality, style, and value that
            lasts. We aim to empower every customer with products they love —
            built to be timeless, affordable, and accessible to all. From
            everyday essentials to statement pieces, we’re here to make online
            shopping effortless, enjoyable, and inspiring.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
       <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
       <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p className="text-gray-600">At Forever, we stand for quality you can trust. Every product is carefully selected and checked to ensure it meets our high standards. If it’s from Forever, it’s made to last.</p>
       </div>
       <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Conveneince:</b>
        <p className="text-gray-600">Shopping at Forever is simple, fast, and hassle-free. With easy navigation, secure checkout, and quick delivery, we make sure your experience is smooth from start to finish.</p>
       </div>
       <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Exceptional Customer Service</b>
        <p className="text-gray-600">At Forever, your satisfaction is our priority. Our friendly support team is always here to help — ready to assist with questions, orders, or anything you need. We’re committed to making every interaction smooth, helpful, and personal.</p>
       </div>
      </div>
      <NewsLetter/>
    </div>
  );
};

export default About;
