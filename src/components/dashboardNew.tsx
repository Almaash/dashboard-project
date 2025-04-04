import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './cards/Card';
// import Card from './Card';

interface CardConfig {
  id: string;
  title: string;
  visualizationType: 'linechart' | 'semipiechart' | 'table'; // Extend if needed
  query: string;
}

interface DashboardData {
  name: string;
  cards: CardConfig[];
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get<DashboardData>('/data/dashboard.json'); // Type safety for API response
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error loading JSON:', error);
      }
    };
    fetchConfig();
  }, []);

  if (!dashboardData) return <div>Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h2>{dashboardData.name}</h2>
      {dashboardData.cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          visualizationType={card.visualizationType}
          query={card.query}
        />
      ))}
    </div>
  );
};

export default Dashboard;
