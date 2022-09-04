// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from '@notionhq/client'
import { TilRecordDto } from '../common';

const api_token = process.env.NOTION_TOKEN!;
const database_id = process.env.NOTION_DB_ID!;

const filterByPublished = (row: any) =>
  getProperty(row, 'Title')[0] !== undefined &&
  getProperty(row, 'Published') !== null;

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
  const title = getProperty(row, 'Title')[0]['plain_text'];
  const content = contentToMarkdown(getProperty(row, 'Content'));
  const tags = getProperty(row, 'Tags').map((t: { name: string }) => t.name);
  const published = getProperty(row, 'Published')['start'];

  return { title, content, tags, published }
};

export const getPosts = async (): Promise<TilRecordDto[]> => {
  const notion = new Client({ auth: api_token });

  const sorts: any = [{
    property: "Published",
    direction: "ascending",
  }];
  const query_response = await notion.databases.query({ database_id, sorts });
  const results = query_response.results
    .filter(filterByPublished)
    .map(transformRow)
    .sort((a, b) => (a.published < b.published) ? 1 : -1);

  return results;
}