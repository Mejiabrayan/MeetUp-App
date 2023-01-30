import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
  } from 'recharts';
  
function ResponsiveScatterChart(props) {
    return (
      <ResponsiveContainer height={props.height} className="flex flex-col justify-center rounded-md shadow-md">
        <ScatterChart
          className='recharts-surface text-gray-800'
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid className='stroke-opacity-25'/>
          <XAxis 
            type="category" 
            dataKey="city" 
            name="city" 
            className='text-xs font-medium tracking-wide'
            tick={{ fill: '#f77070' }}
            axisLine={false}
          />
          <YAxis 
            type="number" 
            dataKey="number" 
            name="number of events" 
            className='text-xs font-medium tracking-wide'
            tick={{ fill: '#f77070' }}
            axisLine={false}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            className='bg-white rounded-md shadow-md text-gray-800 p-2'
          />
          <Scatter 
            data={props.data} 
            fill="#f77070" 
            shape='circle'
            shapeSize={6}
          />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  export default ResponsiveScatterChart;

