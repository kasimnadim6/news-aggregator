import { useCallback, useEffect, useState } from 'react';
import HeadLinesContainer from '../HeadLines/HeadLinesContainer';
import { IResponse } from '../../interface/Response';
import News from './News';
import useAPIInvoke from '../../hooks/useAPIInvoke';
import ArticleSkeleton from '../common/Skeletons/ArticleSkeleton';
import { IArticle } from '../../interface/Article';
import { filterArticles } from '../../utils';

type NewsProps = {
  searchQuery: string;
};

const NewsContainer = ({ searchQuery }: NewsProps) => {
  const NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

  const [news, setNews] = useState<IResponse>({
    status: '',
    articles: [],
    totalResults: 0,
  });

  // API invoking hook
  const { isLoading, response, invokeService } = useAPIInvoke();

  // API invoke with dynamic query and page
  const fetchNews = useCallback(
    async ({ pageSize }: { pageSize: number }) => {
      invokeService({
        url: `${NEWS_API_BASE_URL}/everything?q=${searchQuery}&pageSize=${pageSize}`,
        method: 'GET',
      });
    },
    [NEWS_API_BASE_URL, invokeService, searchQuery]
  );

  // update the news on successful
  useEffect(() => {
    let updatedResponse: IResponse = { ...response.data };
    // filter the records that doesn't have data
    const articles = filterArticles(response.data.articles);
    updatedResponse = {
      ...updatedResponse,
      articles,
    };
    setNews(updatedResponse);
  }, [response]);

  // Initial news fetch with 10 records
  useEffect(() => {
    fetchNews({ pageSize: 10 });
    return () => {};
  }, [fetchNews, searchQuery]);

  return (
    <div className="flex gap-2 sm:flex-col sm:items-center place-content-evenly px-4 py-4">
      <section className="w-9/12 sm:w-full">
        {isLoading || news.articles.length === 0 ? (
          [...Array(4)].map((_arr, idx) => <ArticleSkeleton key={idx} />)
        ) : (
          <News
            articles={news.articles}
            totalResults={news.totalResults}
            fetchNews={fetchNews}
          />
        )}
      </section>
      <section className="w-56 sm:w-full">
        <HeadLinesContainer searchQuery={searchQuery} />
      </section>
    </div>
  );
};

export default NewsContainer;
