import { useCallback, useEffect, useState } from 'react';
import HeadLines from './HeadLines';
import { IResponse } from '../../interface/Response';
import useAPIInvoke from '../../hooks/useAPIInvoke';
import HeadLineSkeleton from '../common/Skeletons/HeadLineSkeleton';
import { filterArticles } from '../../utils';

type HeadLinesContainerProps = {
  searchQuery: string;
};
const HeadLinesContainer = ({ searchQuery }: HeadLinesContainerProps) => {
  const NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
  const [headlines, setHeadlines] = useState<IResponse>({
    status: '',
    articles: [],
    totalResults: 0,
  });

  const { isLoading, response, invokeService } = useAPIInvoke();

  const fetchLatestHeadlines = useCallback(async () => {
    invokeService({
      url: `${NEWS_API_BASE_URL}/top-headlines?q=${searchQuery}`,
      method: 'GET',
    });
  }, [NEWS_API_BASE_URL, invokeService, searchQuery]);

  useEffect(() => {
    let updatedResponse: IResponse = { ...response.data };
    // filter the records that doesn't have data
    const articles = filterArticles(response.data.articles);
    updatedResponse = {
      ...updatedResponse,
      articles,
    };
    setHeadlines(updatedResponse);
  }, [response]);

  useEffect(() => {
    fetchLatestHeadlines();
    return () => {};
  }, [fetchLatestHeadlines]);

  return (
    <>
      {headlines.articles.length === 0 || isLoading ? (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">LATEST NEWS</h2>
          {[...Array(7)].map((_val, idx) => (
            <HeadLineSkeleton key={idx} />
          ))}
        </>
      ) : (
        <HeadLines
          articles={headlines.articles.length > 0 ? headlines.articles : []}
        />
      )}
    </>
  );
};

export default HeadLinesContainer;
