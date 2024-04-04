import React from "react";
import { TiSocialTwitterCircular } from "react-icons/ti";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaPinterest,
  FaLinkedin,
  FaWarehouse,
} from "react-icons/fa";
import SocialFooterIcon from "./SocialFooterIcon";
import Link from "next/link";

const FooterItems = [
  { name: "Privacy", url: "/legal/privacy" },
  { name: "California Privacy", url: "/legal/california privacy" },
  { name: "Online Advertising", url: "/legal/online advertising" },
  { name: "Terms of use", url: "/legal/terms of use" },
  { name: "Security", url: "/legal/security" },
  { name: "About Us", url: "/legal/about us" },
  { name: "Accessibility", url: "/legal/accessibility" },
  { name: "Careers", url: "/legal/careers" },
  { name: "Sitemap", url: "/legal/sitemap" },
];

const Footer = () => {
  return (
    <div className="border-t-4 border-green-800">
      <div className="container mx-auto ">
        <ol>
          <div className="flex items-center justify-center gap-1 text-lg">
            <p>Need to talk to us directly?</p>
            <p className="font-semibold text-green-600 my-3">Contact us</p>
          </div>
          <p className="flex text-gray-600 justify-center font-semibold py-2 text-lg">
            Follow TD Bank
          </p>
          <ul className="flex items-center gap-4 justify-center py-2 text-green-600 ">
            <SocialFooterIcon icon={FaFacebookF} />
            <SocialFooterIcon icon={TiSocialTwitterCircular} />
            <SocialFooterIcon icon={FaYoutube} />
            <SocialFooterIcon icon={FaInstagram} />
            <SocialFooterIcon icon={FaPinterest} />
            <SocialFooterIcon icon={FaLinkedin} />
          </ul>
          <ul className="flex gap-2  justify-between text-gray-600 py-2 text-lg">
            {FooterItems.map((item) => {
              return (
                <li className="items-center" key={item.url}>
                  <Link href={item.url}>{item.name}</Link>
                </li>
              );
            })}
            {/* <li className=" items-center">Privacy</li>
            <li className=" items-center">California Privacy</li>
            <li className=" items-center">Online Advertising</li>
            <li className=" items-center">Term of Use</li>
            <li className=" items-center">Security</li>
            <li className=" items-center">About Us</li>
            <li className=" items-center">Accessibility</li>
            <li className=" items-center">Careers</li>
            <li className=" items-center">Site Map</li> */}
          </ul>
          <div>
            <hr className="my-4 " />
          </div>
          <ul className="flex justify-center gap-2">
            <div className="my-1 mr-2 border-green-800">
              <FaWarehouse />
            </div>
            <li className="text-green-700 font-thin">Equal Housing Lender</li>
            <li className="hover:underline text-green-600 font-semibold ml-4">
              Member FDIC. Bank Deposits FDIC Insured
            </li>
          </ul>
          <div>
            <hr className="my-5  " />
          </div>
          <div>
            <p className="font-semibold items-center weight text-gray-500">
              SECURITIES AND OTHER INVESTMENT AND INSURANCE PRODUCTS ARE: NOT A
              DEPOSIT; NOT FDIC INSURED; NOT INSURED BY ANY FEDERAL GOVERNMENT
              AGENCY; NOT GUARANTEED BY TD BANK, N.A. OR ANY OF ITS AFFILIATES;
              AND, MAY BE SUBJECT TO INVESTMENT RISK, INCLUDING POSSIBLE LOSS OF
              VALUE.
            </p>
          </div>
          <div>
            <hr className="my-5 " />
          </div>
          <p className="text-gray-600 text-sm font-normal items-start">
            ©2023 TD Bank, N.A. All Rights Reserved.
          </p>
        </ol>
      </div>
    </div>
  );
};

export default Footer;
