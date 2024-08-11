import { Link } from 'react-router-dom';
import { IArticle } from '../../interface/Article';
import moment from 'moment';

type HeadLinesProps = {
  articles: IArticle[];
};
const HeadLines = ({ articles }: HeadLinesProps) => {
  return (
    <>
      <h2 className="font-semibold text-2xl tracking-tight">LATEST NEWS</h2>
      <div>
        {articles.length > 0 &&
          articles.map((article: IArticle, articleIdx) => (
            <ul
              key={articleIdx}
              className="p-1 list-disc marker:text-blue-600 first:mt-4 mt-2 border-t-[1px] last:border-b-2 border-dotted"
            >
              <Link to={article.url} className="font-extrabold">
                <p className="text-sm font-light">
                  {moment(article.publishedAt).fromNow()}
                </p>
                <span>{article.title}</span>
              </Link>
            </ul>
          ))}
      </div>
    </>
  );
};

export default HeadLines;
