import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useTable, Column } from 'react-table';
import useCubeQuery from '@/hooks/useCubeQuery';

// Define the props for the Card component
interface CardProps {
  title: string;
  visualizationType: 'linechart' | 'semipiechart' | 'table';
  query: string;
}

const Card: React.FC<CardProps> = ({ title, visualizationType, query }) => {
  // Fetch data using the custom Cube query hook
  const { loading, data, error } = useCubeQuery(query);

  // Handle loading and error states
  if (loading) return <div>Loading {title}...</div>;
  if (error) return <div>Error loading {title}</div>;

  // Extract chart data from API response
  const chartData: Record<string, any>[] = data?.chartPivot ? data.chartPivot() : [];

  // Render a line chart if visualizationType is 'linechart'
  if (visualizationType === 'linechart') {
    return (
      <div className="card">
        <h3>{title}</h3>
        <LineChart width={300} height={200} data={chartData}>
          <XAxis dataKey="x" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }

  // Render a semi pie chart if visualizationType is 'semipiechart'
  if (visualizationType === 'semipiechart') {
    return (
      <div className="card">
        <h3>{title}</h3>
        <PieChart width={300} height={200}>
          <Pie data={chartData} dataKey="y" nameKey="x" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d">
            {/* Dynamically assign colors to pie chart slices */}
            {chartData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} 
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    );
  }

  // Render a table if visualizationType is 'table'
  if (visualizationType === 'table') {
    // Define table columns based on chart data keys
    const columns: Column<Record<string, any>>[] = Object.keys(chartData[0] || {}).map((key) => ({
      Header: key,
      accessor: key,
    }));

    // Initialize table instance using react-table
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data: chartData,
    });

    return (
      <div className="card">
        <h3>{title}</h3>
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Return null if visualizationType does not match any case
  return null;
};

export default Card;