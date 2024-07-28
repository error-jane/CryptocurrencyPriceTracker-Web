"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import IconButton from "./iconButton";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import Coin from "@/models/coinData";
import CustomCard from "./customCard";
import { TiTrash } from "react-icons/ti";
interface WatchListProps {
  title: string;
  watchList: Coin[];
  deleteLast: Coin;
  setWatchList: (e: SetStateAction<Coin[]>) => void;
  isDelete: boolean;
  isAdd: boolean;
  handleClickDeleteCoin: (e: Coin) => void;
}
const WatchList: React.FC<WatchListProps> = ({
  title,
  deleteLast,
  setWatchList,
  watchList,
  isDelete,
  isAdd,
  handleClickDeleteCoin,
}) => {
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isPrev, setIsPrev] = useState<boolean>(false);

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleClickNext = async () => {
    setIsNext(true);
    setWatchList((prev) => {
      const newTest = structuredClone(prev);
      const lastObj: Coin | undefined = newTest.shift();
      newTest.push(lastObj!);
      return newTest;
    });
    await timeout(500);
    setIsNext(false);
  };

  const handleClickPrev = async () => {
    setIsPrev(true);
    setWatchList((prev) => {
      const newTest = structuredClone(prev);
      const lastObj: Coin | undefined = newTest.pop();
      newTest.unshift(lastObj!);
      return newTest;
    });
    await timeout(500);
    setIsPrev(false);
  };

  return (
    <div className="z-[5] w-full h-[50%] bg-white/30 backdrop-blur-sm rounded-2xl p-5 content-center overflow-hidden">
      <label className="absolute top-8 text-lg font-black w-full-5 after:content-[''] after:h-[1px] after:w-full after:absolute after:bg-black/10 after:left-0 after:bottom-[-0.5rem]">
        {title}
      </label>

      
        <div className="flex flex-col px-3 py-3 gap-2 z-[1] h-[70%] w-full items-center justify-center text-[14px] overflow-hidden">
          {watchList.length > 3 &&
          <div>

          </div>
          }

          {watchList.length > 4 && 
          <div
            className={
              isNext && watchList.length >= 5
                ? "scale-[1] blur-[8px] absolute translate-y-[0%] top-[22%] pointer-events-none animate-coin2"
                : isPrev && watchList.length >= 5
                ? "scale-[1] blur-[8px] absolute translate-y-[0%] top-[22%] pointer-events-none animate-coin0"
                : isAdd &&  watchList.length == 5
                ? "scale-[1] blur-[8px] absolute translate-y-[0%] top-[22%] pointer-events-none animate-coin0"
                : "scale-[1] blur-[8px] absolute translate-y-[0%] top-[22%] pointer-events-none"
            }
          >
            {
              <div className="flex flex-col w-[250px] h-[39px] justify-center">
                <CustomCard coin={watchList[watchList.length - 2]} />
              </div>
            }
          </div>}

          {watchList.length > 3 &&
          <div
            className={
              isNext && watchList.length >= 4
                ? "scale-[1.2] blur-[2px] absolute translate-y-[10%] top-[28%] pointer-events-none animate-coin3"
                : isPrev && watchList.length > 4
                ? "scale-[1.2] blur-[2px] absolute translate-y-[10%] top-[28%] pointer-events-none animate-coin1"
                : isPrev && watchList.length == 4
                ? "scale-[1.2] blur-[2px] absolute translate-y-[10%] top-[28%] pointer-events-none animate-coin0"
                : isAdd && watchList.length == 4
                ? "scale-[1.2] blur-[2px] absolute translate-y-[10%] top-[28%] pointer-events-none z-[2] animate-coin4Add"
                : "scale-[1.2] blur-[2px] absolute translate-y-[10%] top-[28%] pointer-events-none z-[2]"
            }
          >
            {
              <div className="flex flex-col w-[250px] h-[39px] justify-center">
                <CustomCard coin={watchList[watchList.length - 1]} />
              </div>
            }
          </div>}

          {isDelete && (
            <div
              className={
                isDelete && deleteLast.id == 0
                  ? "scale-[1.3] blur-[10px] absolute translate-y-[15%] translate-x-[-15%] top-[43%] opacity-0 pointer-events-none animate-coin1Delete "
                  : "scale-[1.3] blur-[10px] absolute translate-y-[15%] translate-x-[-15%] top-[43%] opacity-0 pointer-events-none"
              }
            >
              {
                <div className="flex flex-col w-[250px] h-[39px] justify-center">
                  <CustomCard coin={deleteLast} />
                </div>
              }
            </div>
          )}

          {watchList.length > 0 &&(
          <div
            className={
              ((isNext || isDelete) && watchList.length > 0)
                ? "scale-[1.3] blur-[0px] absolute translate-y-[15%] top-[43%] pointer-events-none animate-coin4"
              : isPrev && watchList.length >= 4
                ? "scale-[1.3] blur-[0px] absolute translate-y-[15%] top-[43%] pointer-events-none animate-coin2"
              : isPrev && watchList.length >= 3
                ? "scale-[1.3] blur-[0px] absolute translate-y-[15%] top-[43%] pointer-events-none animate-coin5"
              : isPrev && watchList.length >= 2
                ? "scale-[1.3] blur-[0px] absolute translate-y-[15%] top-[43%] pointer-events-none animate-coin4"
              : isAdd
                ? "scale-[1.3] blur-[0px] absolute translate-y-[15%] top-[43%] pointer-events-auto z-[3] animate-coin1Add"  
                : "scale-[1.3] blur-[0px] absolute translate-y-[15%] top-[43%] pointer-events-auto z-[3]"
            }
          >
            {
              <div className="flex flex-col w-[250px] h-[39px] justify-center">
                <CustomCard
                  coin={watchList[0]}
                  icon={
                    <div className="z-[3] absolute flex flex-row items-center gap-2 right-0 px-5 translate-x-[10px] pointer-events-none transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-[0px] group-hover:pointer-events-auto">
                      <IconButton
                        icon={<TiTrash />}
                        onClick={(e) => {
                          handleClickDeleteCoin(watchList[0]);
                        }}
                      />
                    </div>
                  }
                />
              </div>
            }
          </div>)}

          {watchList.length > 1 && 
          <div
            className={
              (isNext && watchList.length >= 3)
              ? "scale-[1.2] blur-[1px] absolute translate-y-[10%] top-[59%] pointer-events-none animate-coin5"
              :
              (isNext && watchList.length >= 2)
              ? "scale-[1.2] blur-[1px] absolute translate-y-[10%] top-[59%] pointer-events-none animate-coin3"
              :(isDelete)
              ? "scale-[1.2] blur-[1px] absolute translate-y-[10%] top-[59%] pointer-events-none animate-coin5"
              : (isPrev || isAdd)
              ? "scale-[1.2] blur-[1px] absolute translate-y-[10%] top-[59%] pointer-events-none animate-coin3"
              : "scale-[1.2] blur-[1px] absolute translate-y-[10%] top-[59%] pointer-events-none z-[2]"
            }
          >
            {
              <div className="flex flex-col w-[250px] h-[39px] justify-center">
                <CustomCard coin={watchList[1]} />
              </div>
            }
          </div>}

          {watchList.length > 2 && 
          <div
            className={
              (isPrev && watchList.length >= 3) 
              ? "scale-[1] blur-[4px] absolute translate-y-[0%] top-[74%] pointer-events-none animate-coin4":
              (isNext && watchList.length == 3) 
              ? "scale-[1] blur-[4px] absolute translate-y-[0%] top-[74%] pointer-events-none animate-coin3"
              :(isNext || isDelete) 
              ? "scale-[1] blur-[4px] absolute translate-y-[0%] top-[74%] pointer-events-none animate-coin6"
              : (isAdd)
              ? "scale-[1] blur-[4px] absolute translate-y-[0%] top-[74%] pointer-events-none animate-coin4"
              : "scale-[1] blur-[4px] absolute translate-y-[0%] top-[74%] pointer-events-none"
            }
          >
            {
              <div className="flex flex-col w-[250px] h-[39px] justify-center">
                <CustomCard coin={watchList[2]} />
              </div>
            }
          </div>}
        </div>
      <div className="absolute flex flex-col gap-8 content-center h-[100%] justify-center top-0 right-[30px]">
        <IconButton
          icon={<FaAngleDoubleUp />}
          onClick={() => {
            handleClickPrev();
          }}
        />
        <IconButton
          icon={<FaAngleDoubleDown />}
          onClick={() => {
            handleClickNext();
          }}
        />
      </div>
    </div>
  );
};

export default WatchList;
