import { useCallback, useEffect, useState } from 'react';
import useAPIInvoke from '../hooks/useAPIInvoke';
import { IResponse } from '../interface/Response';
import { IArticle } from '../interface/Article';
import { Link } from 'react-router-dom';
import Article from '../components/common/Article';
import ArticleSkeleton from '../components/common/Skeletons/ArticleSkeleton';

type PersonalizedNewsProps = {
  searchQuery: string;
};
const PersonalizedNews = ({ searchQuery = 'all' }: PersonalizedNewsProps) => {
  const NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
  const [personalizedNews, setPersonalizedNews] = useState<IResponse>({
    status: '',
    articles: [],
    totalResults: 0,
  });
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [sources, setSources] = useState([]);
  const categories = [
    'Business',
    'Entertainment',
    'General',
    'Health',
    'Science',
  ];
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0].toLowerCase()
  );
  // API invoking hook
  const { isLoading, response, invokeService } = useAPIInvoke();

  // API invoke with dynamic query and page
  const fetchPersonalizedNews = useCallback(
    async ({ pageSize }: { pageSize: number }) => {
      let url = `${NEWS_API_BASE_URL}/top-headlines?country=in&pageSize=${pageSize}`;
      if (
        selectedCategory === '' &&
        (searchQuery === '' || searchQuery === 'personalized')
      ) {
        setIsFilterSelected(false);
        return;
      }
      setIsFilterSelected(true);
      if (searchQuery && searchQuery !== 'personalized') {
        url = `${url}&q=${searchQuery}`;
      }
      if (selectedCategory) {
        url = `${url}&category=${selectedCategory}`;
      }
      //   if (filters.source) {
      //     const sourceParam = filters.source.toString().split(',').join('&');
      //     url = `${url}&${sourceParam}`;
      //   }
      invokeService({
        url,
        method: 'GET',
      });
    },
    [NEWS_API_BASE_URL, selectedCategory, invokeService, searchQuery]
  );

  // Initial news fetch with 10 records
  useEffect(() => {
    fetchPersonalizedNews({ pageSize: 10 });
    return () => {};
  }, [fetchPersonalizedNews, searchQuery]);

  // update the news on successful
  useEffect(() => {
    let updatedResponse: IResponse = { ...response.data };
    if (response.data.articles) {
      // filter the records that doesn't have data
      let filteredArticlesArticles = [...response.data.articles];
      filteredArticlesArticles = response.data.articles.filter(
        (article: IArticle) =>
          !JSON.stringify(Object.values(article)).includes('[Removed]')
      );
      updatedResponse = {
        ...updatedResponse,
        articles: filteredArticlesArticles,
      };
    }
    setPersonalizedNews(updatedResponse);
  }, [response]);

  return (
    <section className="w-full flex flex-col relative">
      <div className="w-full h-32 flex items-center p-2 px-12 dark:shadow-emerald-50 z-10 overflow-hidden shadow-xl dark:shadow-md overflow-x-hidden">
        <h2 className="font-light w-1/3 text-4xl">Filters</h2>
        <div className="flex items-center w-2/3">
          <label htmlFor="category" className="mr-4">
            Choose a Category
          </label>
          <select
            name="category"
            id="category"
            className="outline-none shadow-md min-w-fit w-56 p-2 cursor-pointer"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">Select</option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div></div>
        {/* className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900" */}
      </div>
      <div className="w-full p-3 px-12 h-full">
        {isFilterSelected ? (
          <>
            {isLoading || personalizedNews.articles.length === 0 ? (
              [...Array(3)].map((_arr, idx) => <ArticleSkeleton key={idx} />)
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                {personalizedNews.articles.length > 0 &&
                  personalizedNews.articles.map(
                    (article: IArticle, articleIdx: number) => (
                      <div key={articleIdx}>
                        <Link
                          to={article.url}
                          key={articleIdx}
                          className="flex sm:flex-col my-5 gap-4"
                        >
                          <Article {...article} />
                        </Link>
                        <hr />
                      </div>
                    )
                  )}
              </div>
            )}
          </>
        ) : (
          <p className="text-center mt-40">
            No filter Selected. Please select the filter or Search for any news
            you wish to see.
          </p>
        )}
      </div>
    </section>
  );
};

export default PersonalizedNews;
