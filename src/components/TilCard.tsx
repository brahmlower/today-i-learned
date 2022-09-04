import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { TilRecord } from "../common";

const date_options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
};

const getHref = () => {
  const proto = window.location.protocol;
  const host = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";
  const path = window.location.pathname;
  return `${proto}//${host}${port}${path}`;
}

export interface TilCardProps {
  item: TilRecord,
}

export const TilCard: FC<TilCardProps> = ({ item: til }: TilCardProps): JSX.Element => {
  const anchor = encodeURI(til.title);

  const copyLink = () => {
    window.location.href = `${getHref()}#${anchor}`;
  }

  const published = new Intl.DateTimeFormat('en-US', date_options).format(til.published);
  return (
    <div className="relagive bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <div>
          <h2 id={anchor} className="font-bold text-2xl">
            { til.title }
            <div title="Click to copy permalink" className="float-right relative top-1" onClick={copyLink}>
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6 stroke-2 hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </h2>
        </div>
        <div>
          { published }
        </div>
      </div>
      <article className="px-4 py-5 sm:p-6 prose dark:prose-invert max-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {til.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}
