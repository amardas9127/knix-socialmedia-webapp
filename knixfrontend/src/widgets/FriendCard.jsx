import React from 'react'

export default function FriendCard({userimage,userlastmsg}) {
  return (
    <div className='bg-apptheme shadow-neusm w-[25vw] mx-auto h-[10vh] my-[1vh] flex items-center rounded-[2vh] justify-evenly'>
        <button className="bg-apptheme shadow-neusm w-[3vw] h-[3vw] rounded-full flex flex-col items-center justify-center text-[4vh] text-textclr">
              {userimage}
        </button>
        <div className="bg-apptheme h-[7vh] w-[20vw] rounded-[2vh] my-[2vh]  shadow-neusmrev text-textclr text-start px-[1vw] content-center text-[2vh]">
            {userlastmsg}
          </div>

    </div>
  )
}
