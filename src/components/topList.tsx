"use client"
import React, { SetStateAction, useEffect, useState } from "react";
import RangeCoin from "@/models/rangeCoin";
import CustomCard from "./customCard";
interface WatchListProps {
  title?: string;
  setTopList: (e: SetStateAction<RangeCoin[]>) => void;
  topList: RangeCoin[];// Assuming icon can be any valid React node
}
const TopList: React.FC<WatchListProps> = ({
  title,
  setTopList,
  topList,
}) => {
  const [indexNext, setIndexNext] = useState<number>(0);
  // const [autoNext, setAutoNext] = useState<number>(1);

  const timeout = (delay:number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleClickTopGainers = async(range: number) => {
    
    setTopList(prev => {
      const cloneTopList = structuredClone(prev);
      const index:number = cloneTopList.map(object => object.range).indexOf(range);
      setIndexNext(index);
      if(index == 4){
        
        const lastObj: RangeCoin|undefined = cloneTopList.pop();
        cloneTopList.unshift(lastObj!);
        return cloneTopList;
      }
      for (let i = 0; i < index; i++){
        const lastObj: RangeCoin|undefined = cloneTopList.shift();
        cloneTopList.push(lastObj!);
      }
      
      return cloneTopList;
    });

    await timeout(500);
    setIndexNext(0);
  };

  // useEffect(() => {
  //   const timeoutID: number = window.setInterval(async() => {
  //     setAutoNext((prev) => {
  //       if(prev == 5){
  //         handleClickTopGainers(1);
  //         return 1;
  //       }
  //       handleClickTopGainers(prev++);
  //       return prev++;
  //     });
      
  //   }, 5000);

  //   // Clear Timeout On Component Unmount
  //   return () => {
  //     window.clearTimeout(timeoutID);
  //   };
  // }, []);

  return (
    <>{
    topList.length >= 5 &&
    <div className="flex flex-col w-full h-full items-center">
                <label className="mt-2 top-8 text-lg font-black w-full-5 after:content-[''] after:h-[1px] after:w-full after:absolute after:bg-black/10 after:left-0 after:bottom-[-0.5rem]">
                    {title}
                </label>
                <div className="flex flex-row w-full h-full items-center z-[1] ">
                  <div className="flex flex-col px-5 py-4 m-2 bg-white rounded-full w-2/4">
                  <CustomCard coin={topList[0].coin!} 
                  icon={
                        <span className="z-[3] absolute flex flex-row items-center gap-2 font-bold  right-0 px-5 translate-x-[10px] pointer-events-none transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-[0px] group-hover:pointer-events-auto">
                            {`${topList[0].coin?.change_percentage?.toFixed(5)} %`}
                        </span>
                        }/>
                  </div>
                  <div className="relative flex flex-row w-2/4 h-full items-center pl-[45px] overflow-hidden">
                    <span className={(indexNext == 0)?"absolute text-[120px] translate-x-[-280%] w-[120px]" 
                                    :(indexNext == 1)?"absolute text-[120px] translate-x-[-280%] w-[120px] animate-fromIndex2"
                                    :(indexNext == 2)?"absolute text-[120px] translate-x-[-280%] w-[120px] animate-fromIndex3"
                                    :(indexNext == 3)?"absolute text-[120px] translate-x-[-280%] w-[120px] animate-fromIndex4"
                                    :                 "absolute text-[120px] translate-x-[-280%] w-[120px]" }>{topList[4].range}</span>

                    <span className={(indexNext == 0)?"absolute text-[100px] translate-x-[0%]   w-[120px]"    
                                    :(indexNext == 1)?"absolute text-[100px] translate-x-[0%]   w-[120px] animate-fromIndex3"
                                    :(indexNext == 2)?"absolute text-[100px] translate-x-[0%]   w-[120px] animate-fromIndex4" 
                                    :(indexNext == 3)?"absolute text-[100px] translate-x-[0%]   w-[120px] animate-fromIndex5"
                                    :(indexNext == 4)?"absolute text-[100px] translate-x-[0%]   w-[120px] animate-fromIndex1"    
                                                     :"absolute text-[100px] translate-x-[0%]   w-[120px]"    }>{topList[0].range}</span>

                    <span className={(indexNext == 0)?"absolute text-[80px] translate-x-[100%] w-[120px]"  
                                    :(indexNext == 1)?"absolute text-[80px] translate-x-[100%] w-[120px] animate-fromIndex4"
                                    :(indexNext == 2)?"absolute text-[80px] translate-x-[100%] w-[120px] animate-fromIndex5"
                                    :(indexNext == 3)?"absolute text-[80px] translate-x-[100%] w-[120px] animate-fromIndex6" 
                                    :(indexNext == 4)?"absolute text-[80px] translate-x-[100%] w-[120px] animate-fromIndex2" 
                                                     :"absolute text-[80px] translate-x-[100%] w-[120px]"  }>{topList[1].range}</span>

                    <span className={(indexNext == 0)?"absolute text-[50px] translate-x-[180%] w-[120px]"  
                                    :(indexNext == 1)?"absolute text-[50px] translate-x-[180%] w-[120px] animate-fromIndex5" 
                                    :(indexNext == 2) || (indexNext == 3)?"absolute text-[50px] translate-x-[180%] w-[120px] animate-fromIndex6"
                                    :(indexNext == 4)?"absolute text-[50px] translate-x-[180%] w-[120px] animate-fromIndex3"  
                                                     :"absolute text-[50px] translate-x-[180%] w-[120px]"  }>{topList[2].range}</span>

                    <span className={(indexNext == 0)?"absolute text-[30px] translate-x-[230%] w-[120px]"
                                    :(indexNext == 4)?"absolute text-[30px] translate-x-[230%] w-[120px] animate-fromIndex4"    
                                                     :"absolute text-[30px] translate-x-[230%] w-[120px] animate-fromIndex6"}>{topList[3].range}</span>
                  
                  </div>
                </div>
                <div className="flex flex-row w-full h-[24px] items-center justify-center gap-[3px]">
                  <button onClick={()=>{handleClickTopGainers(1)}} className={topList[0].range == 1? "border-2 border-solid px-[15px] border-gray-400 text-gray-400 text-xs scale-[1.1]":"border-2 border-solid px-[15px] border-gray-300 text-gray-300 transition-all text-xs scale-[1.1] hover:border-gray-400 hover:text-gray-400  hover:z-[2]"}>-</button>
                  <button onClick={()=>{handleClickTopGainers(2)}} className={topList[0].range == 2? "border-2 border-solid px-[15px] border-gray-400 text-gray-400 text-xs scale-[1.1]":"border-2 border-solid px-[15px] border-gray-300 text-gray-300 transition-all text-xs scale-[1.1] hover:border-gray-400 hover:text-gray-400  hover:z-[2]"}>-</button>
                  <button onClick={()=>{handleClickTopGainers(3)}} className={topList[0].range == 3? "border-2 border-solid px-[15px] border-gray-400 text-gray-400 text-xs scale-[1.1]":"border-2 border-solid px-[15px] border-gray-300 text-gray-300 transition-all text-xs scale-[1.1] hover:border-gray-400 hover:text-gray-400  hover:z-[2]"}>-</button>
                  <button onClick={()=>{handleClickTopGainers(4)}} className={topList[0].range == 4? "border-2 border-solid px-[15px] border-gray-400 text-gray-400 text-xs scale-[1.1]":"border-2 border-solid px-[15px] border-gray-300 text-gray-300 transition-all text-xs scale-[1.1] hover:border-gray-400 hover:text-gray-400  hover:z-[2]"}>-</button>
                  <button onClick={()=>{handleClickTopGainers(5)}} className={topList[0].range == 5? "border-2 border-solid px-[15px] border-gray-400 text-gray-400 text-xs scale-[1.1]":"border-2 border-solid px-[15px] border-gray-300 text-gray-300 transition-all text-xs scale-[1.1] hover:border-gray-400 hover:text-gray-400  hover:z-[2]"}>-</button>
                </div>
    </div>}
    </>
  );
};

export default TopList;
