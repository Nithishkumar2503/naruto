import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { GoRocket } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { SiGmail } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";

interface SocialMediaListProps {
  id: number;
  title: string;
  link: string;
  icon: IconType;
  iconColor: string;
}
const socialMediaList: SocialMediaListProps[] = [
  {
    iconColor: "text-[#0077B5]",
    id: 1,
    title: "Linkedin",
    link: "",
    icon: FaLinkedin,
  },
  {
    iconColor: "text-[#25D366]",
    id: 2,
    title: "Whatsapp",
    link: "",
    icon: IoLogoWhatsapp,
  },
  {
    iconColor: "text-[#C13584]",
    id: 3,
    title: "Instagram",
    link: "",
    icon: GrInstagram,
  },
  { iconColor: "text-[]", id: 4, title: "Gmail", link: "", icon: SiGmail },
];
interface SocialMediaProps {
  classes?: string;
  id?: string;
  name?: string;
  hideText?: boolean;
}
const socialMedia = ({ classes, hideText }: SocialMediaProps) => {
  const [isOpen, setOpen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      close();
    }, 3000);
  }, []);
  function handleOpen() {
    setOpen(!isOpen);
  }
  function close() {
    setOpen(false);
  }
  return (
    <div id="social media" className={`${classes}`}>
      <div
        onClick={close}
        className="fixed  inset-0 z-40 bg-blur w-screen h-screen"
      ></div>
      {isOpen && (
        <ol className="absolute z-50  mt-12 shadow-lg rounded-lg ">
          {socialMediaList?.map(
            ({ icon: Icon, id, title, iconColor }: SocialMediaListProps) => {
              return (
                <li
                  key={id}
                  className="p-2 bg-white mb-2 rounded-lg text-gray-800 px-4 text-center cursor-pointer"
                  onClick={handleOpen}
                  id={"socialMedia_" + id}
                >
                  <Icon className={`w-10 h-10 text-center ${iconColor}`} />
                  {hideText && <h1>{title}</h1>}
                </li>
              );
            }
          )}
        </ol>
      )}
      <GoRocket
        onClick={handleOpen}
        className="w-10 h-10 text-gray-600 ml-5 cursor-pointer relative  inset-0 z-50"
      />
    </div>
  );
};

export default socialMedia;
