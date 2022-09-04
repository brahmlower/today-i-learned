
export interface TilRecordDto {
  title: string,
  content: string,
  published: string,
  tags: string[]
}

export class TilRecord {
  title: string;
  content: string;
  published: Date;
  tags: string[];

  constructor(title: string, published: Date, content: string, tags: string[]) {
    this.title = title;
    this.published = published;
    this.content = content;
    this.tags = tags;
  }

  static fromDto(dto: TilRecordDto): TilRecord {
    return new TilRecord(dto.title, new Date(dto.published), dto.content, dto.tags)
  }
}
