import React from 'react';

export default function RecMsgContainer({ recmsg,recmsgtime,recmsgdate }) {
  return (
    <div className="bg-apptheme max-w-[45vw] my-[5vh] shadow-neusm me-auto ms-[2vw] rounded-[2vh] p-[3vh] inline-flex animate-slideInDown">
      <p className="text-textclr text-[2vh]">{recmsg}</p>
      <div className='flex flex-col items-start justify-end translate-y-[1.8vh] translate-x-[1.8vw] me-[1vw]'>
      <p className="text-textclr text-[1.1vh] me-[1vw]text-center content-end" >{recmsgtime}</p>
      <p className="text-textclr text-[1.1vh] me-[1vw]text-center content-end" >{recmsgdate}</p>
      </div>
    </div>
  );
}
