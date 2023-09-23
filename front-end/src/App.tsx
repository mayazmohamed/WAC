import React, { useEffect, useState } from "react";
import logo from "./assets/images/cover.png";
import "./App.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import VideoPlayer from "./components/youtube/VideoPlayer";
import axios from "axios";

function App() {
  const [search, setSearch] = React.useState<string>("");
  const [openInput, setOpenInput] = React.useState<boolean>(false);
  const menuref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [dark, setDark] = useState(false);
  const [url, setUrl] = useState<[]>([]);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  
    useEffect(() => {
      async function fetchVideoUrls() {
        const urls = await axios.get("http://localhost:3001/urls");
        setUrl(urls.data.videos);
      }
  
      fetchVideoUrls();
    }, []);


  const urls = [
    "https://www.youtube.com/watch?v=mCoExlG4mdE",
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    "https://www.youtube.com/watch?v=WjVNUWTW6r4&ab_channel=Manhwahub",
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    "https://www.youtube.com/watch?v=mCoExlG4mdE",
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    "https://www.youtube.com/watch?v=WjVNUWTW6r4&ab_channel=Manhwahub",
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
    'https://www.youtube.com/watch?v=ZpiNUKpGI88&ab_channel=RubySessionsTV',
  ]
  const [currentUrl, setCurrentUrl] = useState<string[]>(url.slice(0, 10));

  function handlePageChange(event: any, newPage: number) {
    setCurrentPage(newPage);
    setCurrentUrl(url.slice((newPage - 1) * 10, newPage * 10));

  }

  // useEffect(() => {
  //   //check click outside
  //   document.addEventListener("click", (e) => {
  //     if (
  //       !menuref.current?.contains(e.target as Node) &&
  //       !inputRef.current?.contains(e.target as Node)
  //     ) {
  //       setOpenInput(false);
  //     }
  //   });
  //   return () => {
  //     document.removeEventListener("click", () => { });
  //   };
  // }, [menuref, inputRef]);

  // useEffect(() => {
  //   !openInput && setSearch("");
  // }, [openInput]);
  console.log("urls", url)



  // useQuery({
  //   queryKey: ['url'],
  //   queryFn: async () => {
  //     const data = await fetchVideos();
  //     return data;
  //   },
  //   onSuccess: (data) => {
  //     setUrl(data);
  //     console.log( "url", url);
  //   },
  // });


  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div
      className={` ${dark ? "bg-[#1F2122]" : "bg-white"
        } font-sans h-[100vh] overflow-scroll`}
    >
      {/* Navigation Bar */}
      <nav
        className={` ${dark ? "bg-[#1F2122]" : "bg-white"
          } border-b border-gray-300 p-4`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex justify-center items-center">
            <img src={logo} alt="test" />
          </div>
        </div>
      </nav>
      <div className=" flex justify-end items-center mt-3  mx-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            onClick={() => {
              setDark(!dark);
              console.log(dark);
            }}
          ></div>
          {/* <span
            className={`ml-3 text-sm font-medium font-mono  bg-transparent dark:text-gray-300 ${dark ? "text-white" : "text-black"
              } `}
          >
            Dark Mode
          </span> */}
        </label>
      </div>
      <div className="  flex justify-around w-full h-full ">
        <div
          className={`${dark ? "bg-[#1F2122]" : "bg-white"
            } p-4 sm:p-8 w-full h-[100%]`}
        >
          <div className="max-w-screen-xl mx-auto  w-full h-[80%]  ">
            <div
              className={`${dark ? "bg-[#202c32]" : "bg-gray-200"
                } rounded-lg shadow-lg w-full `}
            >
              <div className="flex w-full ">
                <div
                  className={`w-1/2 p-4 text-center cursor-pointer ${activeTab === 0
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-600"
                    }`}
                  onClick={() => handleTabClick(0)}
                >
                  <h2>Videos</h2>
                </div>
                <div
                  className={`w-1/2 p-4 text-center cursor-pointer ${activeTab === 1
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-600"
                    }`}
                  onClick={() => handleTabClick(1)}
                >
                  <h2>News</h2>
                </div>
              </div>
              <div className="p-4 h-full overflow-y-scroll w-full   ">
                <div
                  className={` tab-content ${activeTab === 0 ? "" : "hidden"
                    }`}
                >

                  <VideoPlayer videoUrls={currentUrl} />
                  <div className="flex items-center justify-center mt-7">
                    <Pagination
                      count={Math.floor(url.length / 10 + 1)}
                      color="secondary"
                      page={currentPage} // Current page
                      onChange={handlePageChange} // Function to handle page changes
                      variant="outlined" // optional: outlined or rounded
                      shape="rounded" // optional: rounded or square
                    />
                  </div>
                </div>
                <div
                  className={`tab-content ${activeTab === 1 ? "" : "hidden"}`}
                >
                  Content for Tab 2
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
