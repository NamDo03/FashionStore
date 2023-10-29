import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../../MyLinks";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

const NavLink = ({ setOpen }) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link, linkIndex) => (
        <div key={linkIndex} className="z-[99]">
          <div className="px-3 font-medium text-left group">
            <h1
              className="capitalize py-7 font-medium text-lg cursor-pointer flex justify-between items-center lg:pr-0 pr-5 lg:hover:text-hover"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-3xl lg:mt-1 lg:ml-2 inline lg:hidden">
                {heading === link.name ? <BiChevronUp /> : <BiChevronDown />}
              </span>
            </h1>
            {link.submenu && (
              <div className="">
                <div className="absolute top-20 hidden group-hover:lg:block hover:lg:block w-full left-0  py-0 px-8">
                  <div className="bg-white shadow-lg flex gap-32 px-20 py-6">
                    <div className="w-[45%] flex flex-col gap-4">
                      <Link
                        to={link.path}
                        className=" capitalize cursor-pointer hover:text-hover"
                      >
                        Shop all
                      </Link>
                      <div className=" flex justify-between">
                        {link.sublinks.map((mysublinks, mysublinksIndex) => (
                          <div key={mysublinksIndex} className="flex flex-col">
                            <h1 className="text-xl">{mysublinks.Head}</h1>
                            {mysublinks.sublink.map((slink, slinkIndex) => (
                              <ul
                                key={slinkIndex}
                                className="border-l-2 border-white border-opacity-10"
                              >
                                <li className="text-base text-text font-medium my-2">
                                  <Link
                                    to={`/collections?category=${
                                      link.name
                                    }&subCategory=${slink.name.toLowerCase()}`}
                                    className="hover:text-primary"
                                  >
                                    {slink.name}
                                  </Link>
                                </li>
                              </ul>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-[55%] flex flex-row items-center justify-between">
                      {link.imgs.map((img, imgIndex) => (
                        <Link to={img.link} key={imgIndex}>
                          <figure className="relative cursor-pointer">
                            <img
                              src={img.src}
                              alt={imgIndex}
                              className="w-[200px] object-cover"
                            />
                            <figcaption className="text-center mt-2 capitalize text-sm font-light">
                              {img.title}
                            </figcaption>
                          </figure>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/*Mobile menu */}
          <div
            className={`z-[99] ${
              heading === link.name ? "lg:hidden" : "hidden"
            }`}
          >
            {link.sublinks.map((slinks, slinkIndex) => (
              <div key={slinkIndex}>
                <h1
                  onClick={() =>
                    subHeading !== slinks.Head
                      ? setSubHeading(slinks.Head)
                      : setSubHeading("")
                  }
                  className="py-4 pl-7 font-semibold text-base lg:pr-0 pr-5 cursor-pointer flex justify-between items-center"
                >
                  {slinks.Head}
                  <span className="text-3xl lg:mt-1 lg:ml-2 inline">
                    {subHeading === slinks.Head ? (
                      <BiChevronUp />
                    ) : (
                      <BiChevronDown />
                    )}
                  </span>
                </h1>
                <ul
                  className={`${
                    subHeading === slinks.Head ? "lg:hidden" : "hidden"
                  }`}
                >
                  {slinks.sublink.map((slink, slinkIndex) => (
                    <li key={slinkIndex} className="py-3 pl-14">
                      <Link
                        to={`/collections?category=${
                          link.name
                        }&subCategory=${slink.name.toLowerCase()}`}
                        onClick={() => setOpen(false)}
                        className="hover:text-primary"
                      >
                        {slink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLink;
