import React, { FC } from "react";
import LinkItem from "@/common/components/LInkItem/LinkItem";
import Tag from "@/common/components/Tag/Tag";
import "./Footer.scss";

const tags = [
  "Beans",
  "Carrots",
  "Apples",
  "Garlic",
  "Mushrooms",
  "Tomatoes",
  "Chilli peppers",
  "Broccoli",
  "Watermeloans",
  "Oranges",
  "Bananas",
  "Grapes",
  "Cherries",
  "Meat",
  "Seo tag",
  "Fish",
  "Seo tag",
  "Freash food",
  "Lemons",
];

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <div className="footer__block">
          <h3 className="footer__title">Get in touch</h3>
          <LinkItem title="About Us" />
          <LinkItem title="Careers" />
          <LinkItem title="Press Releases" />
          <LinkItem title="Blog" />
        </div>
        <div className="footer__block">
          <h3 className="footer__title">Connections</h3>
          <LinkItem title="Facebook" />
          <LinkItem title="Twitter" />
          <LinkItem title="Instagram" />
          <LinkItem title="Youtube" />
          <LinkItem title="Linkedin" />
        </div>
        <div className="footer__block">
          <h3 className="footer__title">Earnings</h3>
          <LinkItem title="Become an Affiliate" />
          <LinkItem title="Advertise your product" />
          <LinkItem title="Sell on Market" />
        </div>
        <div className="footer__block">
          <h3 className="footer__title">Account</h3>
          <LinkItem title="Your account" />
          <LinkItem title="Returns Centre" />
          <LinkItem title="100 % purchase protection" />
          <LinkItem title="Chat with us" />
          <LinkItem title="Help" />
        </div>
      </div>
      <div className="footer__tags">
        <h3 className="footer__title">Product tags</h3>
        <div className="tags__block">
          {tags.map((tag, index) => (
            <Tag key={`tag-${tag}-${index}`} title={tag} />
          ))}
        </div>
      </div>
      <p className="footer__text">Copyright &copy; 2020 petrbilek.com</p>
    </footer>
  );
};

export default Footer;
