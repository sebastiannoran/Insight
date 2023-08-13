import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";
import { AuthContext } from "../contexts/AuthContext";

const Homepage = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentCollege, setCurrentCollege] = useState(null);

  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);

    navigate({
      pathname: `/colleges/${currentCollege.id}`,
      state: { searchQuery: query },
    });
  };

  const handleSelect = (result) => {
    setCurrentCollege(result);
    // console.log(`Current College: ${currentCollege.id}`);
  };

  const handleChange = (value) => {
    setInput(value);
  };
  return (
    <div className="bg-[#272727] h-screen flex flex-col justify-center items-center pb-40">
      <p className="text-5xl mb-8 font-bold">Welcome to Insight</p>
      <p className="text-1xl italic mb-5 text-[#b7b7b7]">
        Where Insightful Connections are Made
      </p>
      <div className="flex gap-2">
        <div className="flex-1 ml-16 mr-2">
          <SearchBar
            setResults={setResults}
            input={input}
            handleChange={handleChange}
            className="h-10 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSearch}
            setCollege={setCurrentCollege}
          />
          <SearchResultsList
            results={results}
            handleChange={handleChange}
            onSelectResult={handleSelect}
          />
        </div>
        <div>
          <button
            className="px-8 py-2 bg-[#272727] rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.40)] 
            hover:bg-fuchsia-500 transition duration-200 hover:shadow-[inset_0_0px_10px_rgba(0,0,0,0.5)]
            font-bold m-4 border-b-[1px] border-fuchsia-700"
            onClick={() => handleSearch(searchQuery)}
          >
            Search
          </button>
        </div>
      </div>
      {!currentUser && (
        <div className="flex gap-4 mt-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-fuchsia rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.40)] 
              hover:bg-fuchsia-500 transition duration-200 hover:shadow-[inset_0_0px_10px_rgba(0,0,0,0.5)]
              font-bold m-4 border-b-[1px] border-fuchsia-700 ">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 bg-[#272727] rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.40)] 
              hover:bg-fuchsia-500 transition duration-200 hover:shadow-[inset_0_0px_10px_rgba(0,0,0,0.5)]
              font-bold m-4 border-b-[1px] border-fuchsia-700">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Homepage;
