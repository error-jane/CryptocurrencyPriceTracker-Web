"use client";
import { useState, useEffect, FC } from "react";
import Coin from "../models/coinData";
import CryptocurrenciesService from "../services/cryptocurrenciesService";
import Button from "../components/customButton";
import TextField from "../components/textField";
import {
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import {
  TiArrowSync,
  TiHeartFullOutline,
  TiHeartOutline,
  TiPencil,
  TiTrash,
} from "react-icons/ti";
import IconButton from "@/components/iconButton";
import WatchList from "@/components/watchList";
import TopList from "@/components/topList";
import CustomCard from "@/components/customCard";
import RangeCoin from "@/models/rangeCoin";
export default function Home() {
  const cryptocurrenciesService = CryptocurrenciesService();

  const [crptoPirceList, setCrptoPirceList] = useState<Coin[]>([]);
  const [watchList, setWatchList] = useState<Coin[]>([]);

  const [addCoin, setAddCoin] = useState<Coin>({});
  const [updateText, setUpdateText] = useState<Coin>({});
  const [deleteLast, setDeleteLast] = useState<Coin>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [top5Gainers, setTop5Gainers] = useState<RangeCoin[]>([]);
  const [isDeleteWatch, setIsDeleteWatch] = useState<boolean>(false);
  const [isAddWatch, setIsAddWatch] = useState<boolean>(false);

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const isNullOrWhitespace = (input: string) => {
    return !input || !input.trim();
  };

  const fetchData = async () => {
    try {
      const rs = await cryptocurrenciesService.getData();

      setCrptoPirceList((prev) => {
        const updateData = rs.map((coin: Coin) => {
          for (let i = 0; i < prev.length; i++) {
            const prevCoin = prev[i];
            if (prevCoin.id == coin.id) {
              // Update the matching coin's properties
              return {
                ...prevCoin,
                price: coin.price,
                is_up:
                  coin.price == null || prevCoin.price == null
                    ? null
                    : coin.price == prevCoin.price
                    ? null
                    : coin.price > prevCoin.price,
                change_percentage:
                  coin.price == null || prevCoin.price == null
                    ? 0
                    : (Math.abs(coin.price - prevCoin.price) / prevCoin.price) *
                      100,
              };
            }
          }
          // If no match is found, return the original coin
          return {
            ...coin,
            is_up: true,
            is_watch: false,
            change_percentage: 0,
          };
        });
        setTop5Gainers(
          updateData
            ?.filter((coin: Coin) => coin.is_up || coin.is_up == null)
            ?.sort(
              (a: Coin, b: Coin) => b.change_percentage! - a.change_percentage!
            )
            ?.map((coin: Coin, index: number) => ({
              range: index + 1,
              coin: coin,
            }))
            .slice(0, 5)
        );
        return updateData;
      });

      setWatchList((prev) => {
        const clonePrev = structuredClone(prev);
        const updateData = clonePrev.map((coin: Coin) => {
          for (let i = 0; i < rs.length; i++) {
            const prevCoin = rs[i];
            if (prevCoin.id == coin.id) {
              return {
                ...prevCoin,
                price: coin.price,
                is_up:
                  coin.price == null || prevCoin.price == null
                    ? null
                    : coin.price == prevCoin.price
                    ? null
                    : coin.price < prevCoin.price,
              };
            }
          }
        });
        return updateData;
      });
    } catch (error) {
      console.error(`error ${error}`);
    }
  };

  const handleInputChange = (value: string, type: string) => {
    setAddCoin((prev) => {
      return {
        ...prev,
        [type]: isNullOrWhitespace(value)
          ? null
          : type == "price"
          ? parseFloat(value)
          : value,
      };
    });
  };

  const handleUpdateChange = (value: string, type: string) => {
    setUpdateText((prev) => {
      return {
        ...prev,
        [type]: isNullOrWhitespace(value)
          ? null
          : type == "price"
          ? parseFloat(value)
          : value,
      };
    });
  };

  const handleClickAddCoin = async () => {
    const rs = await cryptocurrenciesService.addCoin(addCoin);
    setAddCoin({});
    await fetchData();
  };

  const handleClickDetailCoin = async (coin: Coin, isEdit: boolean) => {
    setUpdateText(coin);
    setIsEdit(isEdit);
  };

  const handleClickAddWatch = async (coin: Coin) => {
    setIsAddWatch(true);
    setWatchList((prev) => {
      const clonePrev = structuredClone(prev);
      clonePrev.unshift(coin);
      return clonePrev;
    });

    setCrptoPirceList((prev) => {
      const clonePrev = structuredClone(prev);
      const update = clonePrev.map((prevCoin: Coin) => {
        if (prevCoin.id == coin.id) {
          return {
            ...prevCoin,
            is_watch: true,
          };
        }
        return prevCoin;
      });
      return update;
    });
    await timeout(500);
    setIsAddWatch(false);
  };

  const handleClickDeleteWatch = async (coin: Coin) => {
    setIsDeleteWatch(true);
    setWatchList((prev) => {
      const clonePrev = structuredClone(prev);
      const index: number = clonePrev
        .map((object) => object.id)
        .indexOf(coin.id);
      setDeleteLast({ ...clonePrev[index], id: index });
      clonePrev.splice(index, 1);
      return clonePrev;
    });

    setCrptoPirceList((prev) => {
      const clonePrev = structuredClone(prev);
      const update = clonePrev.map((prevCoin: Coin) => {
        if (prevCoin.id == coin.id) {
          return {
            ...prevCoin,
            is_watch: false,
          };
        }
        return prevCoin;
      });
      return update;
    });
    await timeout(500);
    setIsDeleteWatch(false);
  };

  const handleClickEditCoin = async () => {
    const rs = await cryptocurrenciesService.updateCoin(
      updateText.id!,
      updateText
    );
    await fetchData();
  };

  const handleClickDeleteCoin = async (coin: Coin) => {
    const rs = await cryptocurrenciesService.deleteCoin(coin.id!);
    setUpdateText({});
    setIsEdit(false);
    await fetchData();
  };

  const handleClickOpenAdd = async () => {
    setIsOpenAdd((prev) => !prev);
    setAddCoin({});
  };

  useEffect(() => {
    fetchData();
    const timeoutID: number = window.setInterval(() => {
      fetchData();
    }, 5 * 60000);

    // Clear Timeout On Component Unmount
    return () => {
      window.clearTimeout(timeoutID);
    };
  }, []);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-10 select-none">
      <div className="flex flex-row h-full w-full relative gap-5">
        <div className="flex flex-col h-full w-1/3">
          <WatchList
            title="My Coin Watchlist"
            watchList={watchList}
            setWatchList={setWatchList}
            isAdd={isAddWatch}
            isDelete={isDeleteWatch}
            handleClickDeleteCoin={(e) => handleClickDeleteWatch(e)}
            deleteLast={deleteLast}
          />

          <div className="p-5 w-full h-[50%] content-end uppercase font-black">
            <div className="">nira vitatan</div>
            <div className="text-7xl gap-3 inline-block">
              <span className="py-2 px-3 inline-block">//Crypto</span>
              <span className="py-2 px-3 inline-block">Price</span>
              <span className="rounded-full border-solid border-2 py-2 px-3 inline-block">
                Tracker
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[url('../../public/images/bg1.png')] bg-cover bg-center bg-no-repeat flex flex-col p-10 h-full w-2/3 rounded-2xl gap-5">
          <div className="h-full w-full content-end bg-white/0 backdrop-blur-sm rounded-2xl">
            <div className="flex flex-col gap-2 h-full w-full p-2">
              <div className="flex flex-col w-full bg-white/30 backdrop-blur-sm rounded-2xl h-44 items-center p-2 ">
                <TopList title={"Top Crypto Gainers"} topList={top5Gainers} setTopList={setTop5Gainers} />
              </div>
              <div className="flex flex-row w-full h-full">
                <div className="w-full h-full bg-white/30 backdrop-blur-sm rounded-2xl p-5 pt-[80px] animate-fromW50">
                  <div className="absolute flex flex-row top-8 justify-between items-center text-lg h-[28px] font-black w-full-5 after:content-[''] after:h-[1px] after:w-full after:absolute after:bg-black/10 after:left-0 after:bottom-[-0.5rem]">
                    <label className="w-2/4 h-[30px] max-w-[300px] w-full overflow-hidden">
                      Today's Cryptocurrency Prices
                    </label>
                    <IconButton
                      icon={<TiArrowSync />}
                      onClick={() => {
                        fetchData();
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-[1rem] w-full h-full overflow-auto justify-between p-4 pt-1">
                    <div className="flex overflow-auto flex-col px-3 py-3 gap-2 z-[1] max-h-[260px] h-full w-full">
                      {crptoPirceList.map((coin, index) => (
                        <CustomCard
                          key={coin.id}
                          coin={coin}
                          icon={
                            <div className="z-[3] absolute flex flex-row items-center gap-2 right-0 px-5 translate-x-[10px] pointer-events-none transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-[0px] group-hover:pointer-events-auto">
                              <IconButton
                                icon={
                                  coin.is_watch ? (
                                    <TiHeartFullOutline
                                      onClick={() => {
                                        handleClickDeleteWatch(coin);
                                      }}
                                    />
                                  ) : (
                                    <TiHeartOutline
                                      onClick={() => {
                                        handleClickAddWatch(coin);
                                      }}
                                    />
                                  )
                                }
                              />
                              <IconButton
                                icon={<TiPencil />}
                                onClick={() => {
                                  handleClickDetailCoin(coin, true);
                                }}
                              />
                              <IconButton
                                icon={<TiTrash />}
                                onClick={() => {
                                  handleClickDeleteCoin(coin);
                                }}
                              />
                            </div>
                          }
                        />
                      ))}
                    </div>
                    <Button
                      onClick={() => {
                        handleClickOpenAdd();
                      }}
                      icon={
                        <div className="relative flex flex-row py-0 px-3 items-center justify-between w-full">
                          <span className="text-white transition-all">
                            Add a Coin
                          </span>
                          <FaArrowRight className="text-white text-sm transition-all opacity-100 group-hover:translate-x-1 motion-reduce:transform-none" />
                        </div>
                      }
                    />
                  </div>
                </div>

                <div
                  className={
                    isOpenAdd
                      ? "w-2/4 h-full bg-white/30 backdrop-blur-sm rounded-2xl p-5 ml-2 pt-[80px]   overflow-hidden animate-fromW0"
                      : "w-[0%] h-full bg-white/30 backdrop-blur-sm rounded-2xl px-0 ml-0 pt-[80px] pb-[20px] opacity-0 animate-fromP5 pointer-events-none overflow-hidden"
                  }
                >
                  <div className="absolute flex flex-row top-8 justify-between items-center text-lg h-[28px] font-black w-full-5 after:content-[''] after:h-[1px] after:w-full after:absolute after:bg-black/10 after:left-0 after:bottom-[-0.5rem]">
                    <label className="w-2/4 h-[30px] overflow-hidden">
                      Add a Coin
                    </label>
                    <IconButton
                      icon={<FaTimes />}
                      onClick={() => {
                        handleClickOpenAdd();
                      }}
                    />
                  </div>
                  <div className="flex flex-col  w-full h-full overflow-auto justify-between p-4 pt-1">
                    <div className="flex flex-col gap-5 p-5 pt-2 max-h-[220px] h-full">
                      <TextField
                        placeholder="Enter your name..."
                        initialValue={addCoin.name}
                        onChange={(e) => {
                          handleInputChange(e, "name");
                        }}
                      />
                      <TextField
                        placeholder="Enter your symbol..."
                        initialValue={addCoin.symbol}
                        onChange={(e) => {
                          handleInputChange(e, "symbol");
                        }}
                      />
                      <TextField
                        placeholder="Enter your price..."
                        type="number"
                        initialValue={addCoin.price?.toString()}
                        onChange={(e) => {
                          handleInputChange(e, "price");
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        handleClickAddCoin();
                      }}
                      title="ADD"
                    ></Button>
                  </div>
                </div>

                <div
                  className={
                    isEdit
                      ? "w-2/4 h-full bg-white/30 backdrop-blur-sm rounded-2xl p-[20px] ml-2 pt-[80px]  overflow-hidden animate-fromW0"
                      : "w-[0%] h-full bg-white/30 backdrop-blur-sm rounded-2xl px-0 ml-0 pt-[80px] pb-[20px] opacity-0  animate-fromP5 pointer-events-none overflow-hidden"
                  }
                >
                  <div className="absolute flex flex-row top-8 justify-between items-center text-lg h-[28px] font-black w-full-5 after:content-[''] after:h-[1px] after:w-full after:absolute after:bg-black/10 after:left-0 after:bottom-[-0.5rem]">
                    <label className="w-2/4 h-[30px] overflow-hidden">
                      Edit a Coin
                    </label>
                    <IconButton
                      icon={<FaTimes />}
                      onClick={() => {
                        handleClickDetailCoin({}, false);
                      }}
                    />
                  </div>
                  <div className="flex flex-col  w-full h-full overflow-auto justify-between p-4 pt-1">
                    <div className="flex flex-col gap-5 p-5 pt-2 max-h-[220px] h-full">
                      <TextField
                        placeholder="Enter your name..."
                        initialValue={updateText.name}
                        onChange={(e) => {
                          handleUpdateChange(e, "name");
                        }}
                      />
                      <TextField
                        placeholder="Enter your symbol..."
                        initialValue={updateText.symbol}
                        onChange={(e) => {
                          handleUpdateChange(e, "symbol");
                        }}
                      />
                      <TextField
                        placeholder="Enter your price..."
                        type="number"
                        initialValue={updateText.price?.toString()}
                        onChange={(e) => {
                          handleUpdateChange(e, "price");
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-5 w-[100%]">
                      <Button
                        onClick={() => {
                          handleClickEditCoin();
                        }}
                        title="EDIT"
                      ></Button>
                      <Button
                        onClick={() => {
                          handleClickDeleteCoin(updateText);
                        }}
                        title="DELETE"
                      ></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
