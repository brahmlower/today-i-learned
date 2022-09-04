import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import { TilRecord, TilRecordDto } from '../common';
import { TilCard } from '../components/TilCard';
import { getPosts } from '../services/notion';

export async function getServerSideProps() {
  const recordDtos = await getPosts();

  return {
    props: {
      recordDtos,
    }
  }
}

interface PostProps {
  recordDtos: TilRecordDto[]
}

const Posts = ({ recordDtos }: PostProps) => {

  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className="App">
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <p className="text-center text-9xl font-black pt-12 pb-5"> Today I Learned </p>
        <p className="text-center text-5xl pt-5 pb-16">A collection of interesting things I&apos;ve learned 🤔</p>

        <div className="max-w-3xl mx-auto flex flex-col space-y-12">
          { recordDtos.map((record, idx) => <TilCard key={idx} item={TilRecord.fromDto(record)} />) }
        </div>
      </div>
    </div>
  );
}

export default Posts;
