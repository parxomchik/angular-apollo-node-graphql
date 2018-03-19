export interface ICourse {
  id: string;
  title: string;
  author: string;
  description: string;
  topic: string;
  url: string;
  voteCount: number;
}

export interface IQuery {
  allCourses: ICourse[];
}
