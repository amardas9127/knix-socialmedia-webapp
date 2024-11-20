import React from 'react'

export default function PostCard({imageurl, userimg, username, caption}) {
  return (
    <div className="w-full mt-[5vh] flex flex-col items-center justify-center">
        <div className="w-[30vw] h-full bg-apptheme rounded-[2vh] shadow-neusm flex flex-col items-center justify-center">
          <img
            className="w-[28vw] rounded-[2vh] h-[40vh] object-cover mt-[2vh]"
            src={imageurl}
            alt="humming bird"
          />
          <div className="w-[28vw] flex justify-between items-center mt-[2vh]">
            <button className="bg-apptheme shadow-neusm w-[3vw] h-[3vw] rounded-full flex flex-col items-center justify-center text-[4vh] text-textclr">
              {userimg}
            </button>
            <div className="bg-apptheme h-[3vw] w-[20vw] rounded-[2vh] shadow-neusm text-textclr text-start content-center text-[2vh] ps-[1vw]">
              {username}
            </div>
            <button className="bg-apptheme shadow-neusm w-[3vw] h-[3vw] rounded-full flex flex-col items-center justify-center text-[4vh] text-textclr">
              🩶
            </button>
          </div>
          <div className="bg-apptheme max-h-[15vh] min-h-[7vh] w-[28vw] rounded-[2vh] my-[2vh]  shadow-neusmrev text-textclr text-start px-[1vw] content-center text-[1.6vh] ">
            {caption}
          </div>
        </div>
      </div>
  )
}
