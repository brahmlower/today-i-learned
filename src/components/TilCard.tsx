import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { TilRecord } from "../common";
import { CopyLink } from './CopyLink';

const date_options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
};

export interface TilCardProps {
  item: TilRecord,
}

export const TilCard: FC<TilCardProps> = ({ item: til }: TilCardProps): JSX.Element => {
  const anchor = encodeURI(til.title);

  const published = new Intl.DateTimeFormat('en-US', date_options).format(til.published);
  return (
    <div className="relagive bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <div>
          <h2 id={anchor} className="font-bold text-2xl">
            { til.title }
            <CopyLink link={ `#${anchor}` }/>
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
