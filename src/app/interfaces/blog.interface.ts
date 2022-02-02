export interface Category {
  _id: string;
  name: string;
}

export interface Author {
  _id: string;
  name: string;
}

export interface blogData {
  _id: string;
  title: string;
  body: string;
  category: Category[];
  author: Author;
  featuredImage: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  __v: number;
}

export interface Blog {
  status: string;
  total: number;
  data: blogData[];
}
