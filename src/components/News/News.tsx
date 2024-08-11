import { useState } from 'react';
import { IArticle } from '../../interface/Article';
import Article from '../common/Article';
import { Link } from 'react-router-dom';

type NewsProps = {
  articles: IArticle[];
  totalResults: number;
  fetchNews: ({ pageSize }: { pageSize: number }) => void;
};
const News = ({ articles, totalResults, fetchNews }: NewsProps) => {
  const [pageSize, setPageSize] = useState(10);

  /**
   * This loads 10 more news
   */
  const loadMoreNewsHandler = () => {
    fetchNews({ pageSize: pageSize + 10 });
    setPageSize((size) => size + 10);
  };
  return (
    <>
      {articles.length > 0 &&
        articles.map((article: IArticle, articleIdx: number) => (
          <div key={articleIdx}>
            <Link
              to={article.url}
              key={articleIdx}
              className="flex sm:flex-col my-5 gap-4"
            >
              <Article {...article} />
            </Link>
            <hr className="text-white" />
          </div>
        ))}
      {!!(articles.length > 0) && (
        <button
          type="button"
          className="mx-auto mt-4 block font-extrabold text-sm bg-blue-950 text-white p-2 px-8 rounded-sm transition ease-in-out delay-100 disabled:bg-gray-200 hover:bg-blue-900"
          onClick={loadMoreNewsHandler}
          disabled={totalResults === articles.length}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default News;
