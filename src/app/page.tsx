"use client"
import { useState, useEffect, FC } from "react";
import Coin from "../models/coinData";
import CryptocurrenciesService from "../services/cryptocurrenciesService";
import Button from "../components/customButton";
import TextField from "../components/textField";
import { FaAngleDoubleUp, FaAngleDoubleDown, FaArrowRight, FaArrowLeft } from "react-icons/fa";
export default function Home() {
  const [data, setData] = useState<Coin[]>([]);
  const [updateNum, setUpdateNum] = useState<number>(0);
  const cryptocurrenciesService = CryptocurrenciesService();

  

  const fetchData = async() =>{
    try{
      const rs = await cryptocurrenciesService.getData();
      
        // Map through the new data (rs) to update prevState
        const newState = rs.map((coin: Coin) => {
          for (let i = 0; i < data.length; i++) {
            const prevCoin = data[i];
            if (prevCoin.id === coin.id) {
              // Update the matching coin's properties
              return {
                ...prevCoin,
                price: coin.price,
                is_up: coin.price == null || prevCoin.price == null? null : coin.price == prevCoin.price ? null : coin.price > prevCoin.price,
              };
            }
          }
          // If no match is found, return the original coin
          return coin;
        });
      

      setData(newState);
      const updateNumNew: number = updateNum + 1;
      setUpdateNum(updateNumNew);
      console.log("jane", updateNumNew);
    }
    catch(error){
      console.error(`error ${error}`);
    }
  }
  
  // // Set interval to run the task every hour
  // const interval = setInterval(() => {
  //     fetchData();
  // }, 6 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds
  
  // // Ensure interval is cleared when the process is terminated
  // process.on('SIGINT', () => {
  //   clearInterval(interval);
  //   process.exit();}
  // );


  useEffect(() => {
    return () =>{
      fetchData();
    }
  }, []);

  const [inputText, setInputText] = useState<Coin>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleInputChange = (value: string, type: string) => {
    setInputText((prev) => {
      return {
        ...prev,
        [type]: type == "price" ? parseInt(value) : value,
      };
    });
  };

  const handleClickAddCoin = async() => {
    const rs = await cryptocurrenciesService.addCoin(inputText);
    await fetchData();
  };

  const handleClickDetailCoin = async(coin: Coin) => {
    setInputText(coin);
    setIsEdit(!isEdit);
  };

  const handleClickEditCoin = async() => {
    const rs = await cryptocurrenciesService.updateCoin(inputText.id!, inputText);
    await fetchData();
  };

  const handleClickDeleteCoin = async() => {
    const rs = await cryptocurrenciesService.deleteCoin(inputText.id!);
    await fetchData();
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-10 ">
      <div className="flex flex-row h-full w-full relative">
        <div className="flex flex-col h-full w-2/4">
          <div className="bg-[url('../../public/images/bg1.png')] bg-cover bg-center bg-no-repeat flex flex-col pt-8 pb-10 px-5 h-full w-1/3 rounded-2xl">
            <div className="relative flex flex-col group z-[3] items-end w-full transition-all pt-3 hover:w-96">
              <div className="z-[3] relative flex flex-row bg-black rounded-full h-7 py-0 px-3 items-center justify-between transition-all w-full group-hover:w-8 group-hover:px-1">
                <span className="text-white transition-all group-hover:text-transparent group-hover:translate-x-2">Add a Coin</span>
                <FaArrowRight className="inline-block my-2 text-white text-sm transition-all opacity-100 group-hover:opacity-0 group-hover:translate-x-1 motion-reduce:transform-none" />
                <FaArrowLeft className="absolute right-3 translate-x-3  inline-block my-2 text-white text-sm transition-all opacity-0  group-hover:translate-x-1 group-hover:opacity-100"/>
              </div>
              <div className="absolute bg-white w-96 flex flex-col pt-20 pb-12 px-5 rounded-2xl left-3 top-5 transition-all opacity-0  pointer-events-none group-hover:pointer-events-auto group-hover:top-0 group-hover:opacity-100">
              <label>Coin</label>
            <TextField
            placeholder="Enter your name..."
            initialValue={inputText.name}
            onChange={(e) => { handleInputChange(e, "name")}}
            />
            <TextField
              placeholder="Enter your symbol..."
              initialValue={inputText.symbol}
              onChange={(e) => { handleInputChange(e, "symbol")}}
            />
            <TextField
              placeholder="Enter your price..."
              initialValue={inputText.price?.toString()}
              onChange={(e) => { handleInputChange(e, "price")}}
            />
            {isEdit?
            <div>
              <Button onClick={()=>{handleClickEditCoin();}} title="edit coin"></Button>
              <Button onClick={()=>{handleClickDeleteCoin();}} title="delete coin"></Button>
            </div>
            :
              <Button onClick={()=>{handleClickAddCoin();}} title="new coin"></Button>}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[url('../../public/images/bg1.png')] bg-cover bg-center bg-no-repeat flex flex-col p-10 h-full w-2/4 rounded-2xl">
          <div className="flex overflow-y-scroll overflow-x-auto flex-col p-10 gap-5 z-[1] ">
        <Button onClick={()=>{fetchData();}} title="jane"></Button>
        <div>{updateNum}</div>
        {data.map((coin, index) => (
          <div key={coin.id} className={"flex flex-row justify-between items-center rounded-full border-solid border-2 py-5 px-10"} onClick={()=>{handleClickDetailCoin(coin);}}>
            <div className="flex flex-row gap-5 items-center">
            {coin.is_up == null ? <FaAngleDoubleUp className="text-transparent"/> : coin.is_up ? <FaAngleDoubleUp className="text-lime-300"/> : <FaAngleDoubleDown className="text-red-400" />}
            <div className="flex flex-col">
              <div className="text-3xl">{coin.name}</div>
              <div>{coin.symbol}</div>
            </div>
            </div>
            <div>{coin.price}</div>
          </div>
        ))}
          </div>
        </div> 
        <div className="absolute w-2/4 h-full p-5 content-end">
          <div className="text-4xl gap-3 uppercase inline-block">
            <span className="py-2 px-3 inline-block">Cryptocurrency</span>
            <span className="py-2 px-3 inline-block">Price</span>
            <span className="rounded-full border-solid border-2 py-2 px-3 inline-block">Tracker</span>
          </div>
        </div>
      </div>
    </main>
  );
}
