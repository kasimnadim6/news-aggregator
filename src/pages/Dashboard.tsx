import NewsContainer from '../components/News/NewsContainer';

type DashboardProps = {
  searchQuery: string;
};

const Dashboard = ({ searchQuery }: DashboardProps) => {
  return (
    <section className="h-full">
      <NewsContainer searchQuery={searchQuery} />
    </section>
  );
};

export default Dashboard;
