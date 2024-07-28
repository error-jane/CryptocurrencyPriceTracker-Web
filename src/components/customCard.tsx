"use client"
import Coin from '@/models/coinData';
// components/TextInput.tsx

import React, { useState, ChangeEvent } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';

interface CustomCardProps {
  coin: Coin;
  icon?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({
  coin,
  icon
}) => {



  return (
    <div 
         className={"relative group flex flex-row justify-between items-center rounded-full border-solid border-2 pl-3 pr-5"} >
      <div className="flex flex-row gap-5 items-center">
        {coin?.is_up == null 
          ? <FaAngleDoubleUp className="text-transparent"/> 
          : coin.is_up 
          ? <FaAngleDoubleUp className="text-lime-300"/> 
          : <FaAngleDoubleDown className="text-red-400" />}
        <div className="flex flex-col">
          <div className="text-sm font-bold">{coin?.name}</div>
          <div className="text-xs font-bold text-gray-400/70">{coin?.symbol}</div>
        </div>
      </div>
      <div className="text-sm font-bold transition-all group-hover:translate-x-[10px] group-hover:opacity-0 group-hover:pointer-events-none">
        {`${coin?.price?.toFixed(3)} $`}
      </div>
      {icon}
    </div>
  );
};

export default CustomCard;

