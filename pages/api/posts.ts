// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { TilRecordDto } from '../../common';

const api_token = process.env.NOTION_TOKEN!;
const database_id = process.env.NOTION_DB_ID!;

const filterByPublished = (row: any) => getProperty(row, 'Title')[0] !== undefined;

const setBold = (str: string): string => `**${str}**`;
const setItalic = (str: string): string => `*${str}*`;
const setStrikethrough = (str: string): string => `~~${str}~~`;
const setCode = (str: string): string => str.includes('\n') ? `\`\`\`\n${str}\n\`\`\`` : `\`${str}\``;

const format_mappings: Record<string, (str: string) => string> = {
  bold: setBold,
  italic: setItalic,
  strikethrough: setStrikethrough,
  code: setCode,
}

const formatTextBlock = (text_block: any): string => {
  let markdown_text = Object.keys(format_mappings)
    .reduce(
      (acc, key) => acc.concat(text_block.annotations[key] ? format_mappings[key] : []),
      [] as ((str: string) => string)[]
    )
    .reduce(
      (acc: string, formatter: (str: string) => string) => formatter(acc),
      text_block.text.content
    )
    .replace(/’/g, '\'')
    .replace(/“/g, '\"')
    .replace(/”/g, '\"');
  if (text_block.href) {
    markdown_text = `[${markdown_text}](${text_block.href})`
  }
  return markdown_text;
};

const contentToMarkdown = (content_rows: any[]) => {
  return content_rows.reduce(
    (acc: string, text_block: any) => acc + formatTextBlock(text_block),
    ""
  );
};

const getProperty = (row: any, property: string): any => {
  const property_type = row.properties[property]['type'];
  return row['properties'][property][property_type];
};

const transformRow = (row: any): TilRecordDto => {
  // console.log(getProperty(row, 'Content'))
  return {
    title: getProperty(row, 'Title')[0]['plain_text'],
    content: contentToMarkdown(getProperty(row, 'Content')),
    tags: getProperty(row, 'Tags').map((t: { name: string }) => t.name),
    published: getProperty(row, 'Published')['start'],
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TilRecordDto[]>
) {
  // Initializing a client
  const notion = new Client({ auth: api_token });

  // const filter = {
  //   property: "Published",
  //   text: {
  //     contains: "Bridge",
  //   },
  // };
  const sorts: any = [{
    property: "Published",
    direction: "ascending",
  }];
  const query_response = await notion.databases.query({ database_id, sorts });
  const results = query_response.results
    .filter(filterByPublished)
    .map(transformRow);

  res.status(200).json(results)
}
