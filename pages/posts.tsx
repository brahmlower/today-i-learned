import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import { TilRecord } from '../common';
import { TilCard } from '../components/TilCard';

// emulate URL anchor page scroll functionality
const scrollToHashId = () => {
  // const removeHash = this.removeHash
  // get URL hash (minus the hash mark)
  const hash = window.location.hash.substring(1)
  if (hash && hash.length) {
    setTimeout(
      () => window.requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        el!.scrollIntoView();
      }),
      0
    )
  }
}

const Posts: NextPage = () => {
  const [items, setItems] = useState<TilRecord[]>([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then((res: any) => res.data.map(TilRecord.fromDto))
      .then((records: TilRecord[]) => {
        records = records.sort((a, b) => (a.published < b.published) ? 1 : -1);
        setItems(records);
        scrollToHashId();
      });
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className="App">
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <p className="text-center text-9xl font-black pt-12 pb-5"> Today I Learned </p>
        <p className="text-center text-5xl pt-5 pb-16">A collection of interesting things I&apos;ve learned 🤔</p>

        <div className="max-w-3xl mx-auto flex flex-col space-y-12">
          { items.map((item, idx) => <TilCard key={idx} item={item} />) }
        </div>
      </div>
    </div>
  );
}

export default Posts;
