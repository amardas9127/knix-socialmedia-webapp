import React from 'react';

export default function SendMsgContainer({ sndmsg, sndmsgtime, sndmsgdate }) {
  return (
    <div className="bg-apptheme max-w-[45vw] my-[5vh] shadow-neusmrev ms-auto me-[2vw] rounded-[2vh] p-[3vh] inline-flex animate-slideInDown">
      <p className="text-textclr text-[2vh]">{sndmsg}</p>
      <div className='flex flex-col items-start justify-end translate-y-[1.8vh] translate-x-[1.8vw] me-[1vw]'>
      <p className="text-textclr text-[1.1vh] me-[1vw]text-center content-end" >{sndmsgtime}</p>
      <p className="text-textclr text-[1.1vh] me-[1vw]text-center content-end" >{sndmsgdate}</p>
      </div>
    </div>
  );
}
