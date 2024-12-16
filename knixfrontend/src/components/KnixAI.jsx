import React from "react";
import RecMsgContainer from "../widgets/RecMsgContainer";
import SendMsgContainer from "../widgets/SendMsgContainer";
import FriendCard from "../widgets/FriendCard";

export default function KnixAI() {
  return (
    <div className="w-full p-[2vh] flex justify-between overflow-hidden">
      <div className="bg-apptheme h-[88vh] w-[28vw] shadow-neusm rounded-[3vh] items-center flex flex-col overflow-hidden animate-sidegrow">
        <div className="bg-apptheme h-[6vh] w-[26vw] shadow-neusmrev rounded-[3vh] mt-[2vh] flex justify-between items-center pe-[.3vw]">
          <input
            className="h-[5vh] w-[23vw] ms-[1vw] text-[2.5vh] text-textclr bg-transparent outline-none font-mono"
            placeholder="Search Friends"
          ></input>
          <button className="shadow-neusm bg-apptheme w-[4.5vh] h-[4.5vh] rounded-full flex justify-center items-center">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="w-[27vw] h-full my-[2vh] overflow-y-scroll overflow-x-hidden">
          <FriendCard userimage={"A"} userlastmsg={"By the Way Who Are you ?"}/>
        </div>
      </div>

      {/* chat box */}
      <div className="w-[70vw] h-[88vh] flex flex-col">
        <div className="h-[78vh] w-full overflow-y-scroll flex flex-col overflow-x-hidden">
          <SendMsgContainer sndmsg={"hi"} sndmsgdate={"12/10/2024"} sndmsgtime={"12:00 PM"}/>
          <RecMsgContainer recmsg={"hello"} recmsgtime={"12:30 PM"} recmsgdate={"12/10/2024"}/>
          <SendMsgContainer sndmsg={"How Are You"} sndmsgdate={"12/10/2024"} sndmsgtime={"12:00 PM"}/>
          <RecMsgContainer recmsg={"Fine How about you"} recmsgtime={"12:30 PM"} recmsgdate={"12/10/2024"}/>
          <SendMsgContainer sndmsg={"Fine"} sndmsgdate={"12/10/2024"} sndmsgtime={"12:00 PM"}/>
          <RecMsgContainer recmsg={"By the Way Who Are you ?"} recmsgtime={"12:30 PM"} recmsgdate={"12/10/2024"}/>
        </div>
        <div className="bg-apptheme h-[8vh] w-[67vw] shadow-neusmrev rounded-[2vh] mt-[2vh] flex justify-between items-center animate-slideInUp ms-[2vw]">
          <input
            className="h-[8vh] w-full ms-[1vw] text-[2.5vh] text-textclr bg-transparent outline-none font-mono"
            placeholder="Type a message"
          ></input>
          <button className="shadow-neusm bg-apptheme w-[6vh] h-[6vh] rounded-[2vh] flex justify-center items-center me-[.5vw]">
          <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
