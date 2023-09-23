"use client"
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />)}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([]);

    const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  }
  useEffect(() => {
    fetchPosts();
  }, [])

  const filterPrompts = (inputText) => {
    const regex = new RegExp(inputText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(post =>
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult)
      }, 500)
    );
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(tagName);
        setSearchResults(searchResult)
        console.log(searchResult)
      }, 500)
    );
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>
      {
        searchText ? (<PromptCardList data={searchResults} handleTagClick={handleTagClick} />) : (<PromptCardList data={allPosts} handleTagClick={handleTagClick} />)
      }

    </section>
  )
}

export default Feed