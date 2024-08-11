const ArticleSkeleton = () => {
  return (
    <div>
      <div className="flex sm:flex-col gap-3 place-content-around px-4 py-4 shadow-sm border-blue-950 p-4 w-full mx-auto">
        <div className="animate-pulse flex-col">
          <h2 className="mb-2 bg-slate-300 h-8 w-96 sm:w-full md:w-80 lg:w-80"></h2>
          <p className="my-1 bg-slate-300 h-16 w-80 sm:w-full md:w-76 lg:w-76"></p>
          <p className="my-1 bg-slate-300 h-10 w-96 sm:w-full md:w-80 lg:w-80"></p>
          <p className="my-1 bg-slate-300 h-7 w-52 sm:w-full md:w-40 lg:w-40"></p>
        </div>
        <div className="animate-pulse min-w-96 w-96 h-60 bg-slate-400 sm:w-full"></div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
