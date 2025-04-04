import React from 'react';
// import useCubeQuery from '../hooks/useCubeQuery';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useTable, Column } from 'react-table';
import useCubeQuery from '@/hooks/useCubeQuery';

interface CardProps {
  title: string;
  visualizationType: 'linechart' | 'semipiechart' | 'table';
  query: string;
}

const Card: React.FC<CardProps> = ({ title, visualizationType, query }) => {
  const { loading, data, error } = useCubeQuery(query);

  if (loading) return <div>Loading {title}...</div>;
  if (error) return <div>Error loading {title}</div>;

  const chartData: Record<string, any>[] = data?.chartPivot ? data.chartPivot() : [];

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

  if (visualizationType === 'semipiechart') {
    return (
      <div className="card">
        <h3>{title}</h3>
        <PieChart width={300} height={200}>
          <Pie data={chartData} dataKey="y" nameKey="x" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d">
            {chartData.map(( index:any) => (
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

  if (visualizationType === 'table') {
    const columns: Column<Record<string, any>>[] = Object.keys(chartData[0] || {}).map((key) => ({
      Header: key,
      accessor: key,
    }));

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

  return null;
};

export default Card;
