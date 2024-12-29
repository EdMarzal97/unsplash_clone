import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-start justify-start p-4 w-full md:max-w-[750px]">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Search photos..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 border border-gray-400 bg-white text-gray-400 rounded-lg hover:bg-gray-200 hover:text-gray-600 hover:border-gray-600"
      >
        Search
      </button>
    </div>
  );
}
