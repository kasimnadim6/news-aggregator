import moment from 'moment';
import { IArticle } from '../../interface/Article';
import defaultArticleImg from '../../../public/article-default.png';

const Article = ({
  title,
  description,
  publishedAt,
  author,
  urlToImage,
  content,
}: IArticle) => {
  return (
    <>
      <div className="w-[55%] sm:w-full">
        <h2 className="mb-2 font-extrabold text-2xl tracking-tight">{title}</h2>
        <p className="my-1 text-lg">{description}</p>
        <p className="my-1 text-base">{content}</p>
        <p className="my-1 text-sm font-extrabold">
          {moment(publishedAt).format('MMM Do YY')} By {author}
        </p>
      </div>
      <img
        src={urlToImage || defaultArticleImg}
        alt={title}
        className="min-w-96 w-96 h-60 object-cover sm:w-full sm:h-80"
      />
    </>
  );
};

export default Article;
