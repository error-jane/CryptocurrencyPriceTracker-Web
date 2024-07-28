"use client"
import useAxios from "../utils/useAxios";
import coin from "../models/coinData";

const cryptocurrenciesService = () => {
    // const baseUrl: string|undefined = process.env.API_URL;
    const baseUrl: string|undefined = "http://localhost:3000/api";
    var cryptocurrenciesController : string = '/cryptocurrencies';
    const { loading, error, get, post, put, del } = useAxios(baseUrl);

    const getData = async () => {
        try {
            const response = await get(`${cryptocurrenciesController}`);
            return response;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    };

    const addCoin = async (param: coin) => {
        try {
            const response = await post(`${cryptocurrenciesController}`, param);
            return response;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    };

    const updateCoin = async (id: number, param: coin) => {
        try {
            const response = await put(`${cryptocurrenciesController}/${id}`, param);
            return response;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    };

    const deleteCoin = async (id: number) => {
        try {
            const response = await del(`${cryptocurrenciesController}/${id}`);
            return response;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    };

    return {
        loading,
        error,
        getData,
        addCoin,
        updateCoin,
        deleteCoin
    };
};


export default cryptocurrenciesService;