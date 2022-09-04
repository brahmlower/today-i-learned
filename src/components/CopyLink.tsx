import React, { FC } from 'react';

export interface CopyLinkProps {
  link: string,
}

export const CopyLink: FC<CopyLinkProps> = ({ link }: CopyLinkProps): JSX.Element => {
  const copyLink = () => {
    window.location.href = link;
  }

  return (
    <div title="Click to copy permalink" className="float-right relative top-1" onClick={copyLink}>
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6 stroke-2 hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
    </div>
  )
}
