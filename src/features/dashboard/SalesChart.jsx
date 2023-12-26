import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useDarkMode } from '../../context/ColourModeContext';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1; // goes from beginning to end, i.e all cols

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = ({ bookings, numDays }) => {
  const { isDarkMode } = useDarkMode();
  const colours = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  const datesArr = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  //console.log(datesArr);

  const data = datesArr.map((d) => {
    return {
      label: format(d, 'MMM dd'),
      totalSales: bookings
        .filter((b) => {
          return isSameDay(d, new Date(b.created_at));
        })
        .reduce((acc, current) => {
          return acc + current.total_price;
        }, 0),
      extrasSales: bookings
        .filter((b) => {
          return isSameDay(d, new Date(b.created_at));
        })
        .reduce((acc, current) => {
          return acc + current.extras_price;
        }, 0),
    };
  });

  //console.log(data);

  return (
    <StyledSalesChart>
      <Heading as="h2">{`Sales (${format(
        datesArr.at(0),
        'dd MMM yyyy'
      )} to ${format(datesArr.at(-1), 'dd MMM yyyy')})`}</Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colours.text }}
            tickLine={{ stroke: colours.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colours.text }}
            tickLine={{ stroke: colours.text }}
          />
          <CartesianGrid strokeDasharray={6} />
          <Tooltip contentStyle={{ backgroundColor: colours.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colours.totalSales.stroke}
            fill={colours.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colours.extrasSales.stroke}
            fill={colours.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
