import React, { useState, useEffect } from "react";

function Feed() {
  const [posts, setPosts] = useState([]);

  async function fetchFeed() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/status_updates?per_page=10"
      );
      const data = await res.json();
      setPosts(data.status_updates.slice(0,3)); // top 3 feed
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 30*60*1000); // 30 menit
    return () => clearInterval(interval);
  }, []);

  function dismiss(index) {
    setPosts(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="mb-6">
      {posts.map((post, idx) => (
        <div key={idx} className="bg-gray-900 p-4 rounded mb-2 flex justify-between">
          <div>
            <p className="text-yellow-400 font-bold">{post.project}</p>
            <p className="text-white">{post.description}</p>
          </div>
          <button onClick={() => dismiss(idx)} className="text-red-500">X</button>
        </div>
      ))}
    </div>
  );
}

export default Feed;
