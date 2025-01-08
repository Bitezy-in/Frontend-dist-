import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useDebounce from '@/hooks/useDebounce'
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSetRestaurants, cuisineName, onResultName, setResultReturned }) => {
  const [searchTerm, setSearchTerm] = useState(cuisineName || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [loading, setLoading] = useState(false)
  console.log(cuisineName);
  const navigate = useNavigate();
  useEffect(() => {
    setResultReturned(false);
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
      onResultName(debouncedSearchTerm)
    }
    else{
      onSetRestaurants([])
      setResultReturned(true);
      onResultName("")
    }
    navigate(`/search?name=${debouncedSearchTerm}`)
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (cuisineName) {
      setSearchTerm(cuisineName);
    }
  }, [cuisineName]);

  const handleSearch = useCallback(async (name) => {
    setLoading(true)
    try {
      const { data } = await axiosInstance.get(`/restaurants/search?name=${name}`)
      if (data.success) {
        onSetRestaurants(data.restaurants)
        onResultName(name)
        setResultReturned(true);
      }
    } catch (err) {
      if (err.status === 404) {
        onSetRestaurants([]);
        setResultReturned(true);
      }
      console.error(err)
      toast.error(err.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }, [debouncedSearchTerm])

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search for restaurants and food"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-3 border text-slate-500 font-medium border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <FiSearch className="absolute right-3 top-3 text-gray-500" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;
