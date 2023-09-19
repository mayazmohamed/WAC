import React, { useEffect } from 'react'
import {
  useNavigate,
  Link,
} from "react-router-dom";
import Home from './pages/home/home'
import News from './pages/news/news'
// import fetchVideos from './api/youtube/index'
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as SearchIcon } from "./assets/images/search.svg";
import { ReactComponent as Logo } from './assets/images/logo.svg';
import { ReactComponent as Newslogo } from './assets/images/news.svg';
import { ReactComponent as Video } from './assets/images/video.svg';
import {
  IconButton
} from "@material-tailwind/react";
import './App.css'
import { useQuery } from '@tanstack/react-query';

const RouteData = [
  {
    path: "/",
    title: "رئيسية",
    component: <Home />,
    logo: <Video />,
  },
  {
    path: "/news",
    title: "أخبار",
    component: <News />,
    logo: <Newslogo />,
  },
];

function App({ children }: { children: React.ReactNode }) {


  const [search, setSearch] = React.useState<string>("");
  const [openInput, setOpenInput] = React.useState<boolean>(false);
  const menuref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);


  useEffect(() => {
    //check click outside
    document.addEventListener("click", (e) => {
      if (
        !menuref.current?.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setOpenInput(false);
      }
    });
    return () => {
      document.removeEventListener("click", () => { });
    };
  }, [menuref, inputRef]);

  useEffect(() => {
    !openInput && setSearch("");
  }, [openInput]);

  // const { data } = useQuery(
  //   {
  //     queryKey: ["videos"],
  //     queryFn: async () => {
  //       const data = await fetchVideos()
  //       return data
  //     }

  //   })

  // console.log(data)

  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex h-[100vh] w-[100vw]  relative overflow-hidden pb-[4rem] md:pb-0 "
      >
        <div className="w-[5rem] h-min hidden md:block ">
          <div className="h-[5rem]   flex  ">
            <Logo className="w-[5rem] h-[5rem] " />
          </div>
          <div className="menu flex flex-col justify-center gap-1">
            {RouteData.map((item, index) => (
              <motion.div
                key={index}
                className={`relative menu-item flex flex-col items-center justify-center h-[6rem] w-[100%] cursor-pointer hover:bg-[#F4F6FF]  ${(item.path === location.pathname ||
                  item.path == location.pathname.substring(0, 8)) &&
                  "active"
                  }`}
                initial={{ scale: 1 }}
                whileTap={{ scale: 1.2 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <Link
                  to={item.path}
                  className="flex flex-col items-center justify-center w-full h-full no-underline "
                >
                  {/* {item.logo} */}
                  <span className="text-xl text-red-500">{item.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#F4F5F7] w-screen ">
          <div
            className="h-[5rem] flex items-center px-[1rem]"
            style={{
              backdropFilter: "blur(50%)",
            }}
          >
            <div className="ml-auto flex gap-4 justify-center items-center w-full rounded-[20px] bg-white">
              <div className="flex justify-between w-full gap-2" ref={inputRef}>
                <div>
                  <h1 className=' text-red-500 pl-5  '>ساعة مع الحمرا</h1>
                </div>
                <div>
                  <IconButton
                    className="w-[3rem] h-[3rem] p-1 bg-white rounded-full "
                    onClick={() => {
                      setOpenInput(!openInput);
                    }}
                  >
                    <SearchIcon className=' absolute -top-3 -right-4  ' />
                  </IconButton>
                  <AnimatePresence>
                    {openInput && (
                      <motion.input
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                          width: 220,
                          opacity: 1,
                        }}
                        transition={{ duration: 0.5 }}
                        exit={{
                          width: 0,
                          opacity: 0,
                        }}
                        className=" h-[2.5rem] max-w-fit rounded-md bg-transparent relative p-4 py-5 text-[1rem]"
                        style={{
                          border: "3px solid #0e08b8",
                        }}
                        placeholder="Search"
                        value={search || ""}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className={`flex-1 overflow-y-auto lg:pl-3`}>{children}</div>
        </div>
      </div>
      <div className="bottom-0 z-50 w-screen fixed h-[10rem] bg-white  md:hidden overflow-auto flex px-1  ">
        <Logo className="h-[5rem] w-[5rem]" />
        <div className="flex   mx-2 justify-between w-full">
          {RouteData.map((item, index) => (
            <motion.div
              key={index}
              className={`relative menu-item flex flex-col gap-1 items-center w-[4rem] justify-center h-full cursor-pointer hover:bg-[#F4F6FF]  ${item.path === location.pathname && ""
                }`}
              initial={{ scale: 1 }}
              whileTap={{ scale: 1.2 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <Link
                to={item.path}
                className="flex flex-col items-center justify-center w-full h-full"
              >
                {item.logo}
                <span className="text-xl text-red-500">{item.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
  // return <div>hello</div>
}

export default App
