import { useState } from "react";

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="search-input w-full px-4 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
        />

        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 text-xl">🔍</span>
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <span
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              loading || !query.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            }`}
          >
            {loading ? "..." : "Search"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
