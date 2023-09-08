import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { APIV1 } from "../redux/config/config";

function Income() {
  const [incomeData, setIncomeData] = useState([]);

  const formatMonth = (month) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[month - 1];
  };

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const res = await APIV1.get("/orders/monthlyOrderTotal");
        console.log("res", res);
        setIncomeData(res.data);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  console.log("incomeData", incomeData);

  const _incomeData = incomeData.map((item) => ({
    month: +item.month.slice(-1),
    total: item.total,
  }));

  console.log("_incomeData", _incomeData);
  const sortedIncomeData = _incomeData.sort(
    (a, b) => a.year * 100 + a.month - (b.year * 100 + b.month)
  );

  console.log("sortedIncomeData", sortedIncomeData);
  const chartData = sortedIncomeData.map((data) => ({
    tháng: formatMonth(data.month),
    Revenue: data.total,
  }));

  const maxTotal = Math.max(...chartData.map((data) => data["Revenue"]));

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) {
      return (tickItem / 1000000).toFixed(1) + "M VNĐ";
    } else if (tickItem >= 1000) {
      return (tickItem / 1000).toFixed(1) + "K VNĐ";
    } else {
      return tickItem + " VNĐ";
    }
  };

  console.log("chartData", chartData);
  const tickValues = chartData.map((data) => data.month);

  return (
    <div className="mt-10 ml-10">
      <h2 className="mx-auto text-center">GROSS MONTHLY REVENUE</h2>
      <ComposedChart
        width={1000}
        height={400}
        data={chartData}
        margin={{ top: 70, right: 0, bottom: 0, left: 150 }}
      >
        <XAxis
          dataKey="tháng"
          tick={(props) => {
            const index = tickValues.indexOf(props.payload.value);
            if (index !== -1) {
              return (
                <text {...props} y={props.y + 15} textAnchor="middle">
                  {props.payload.value}
                </text>
              );
            }
            return null;
          }}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={formatYAxis}
          allowDataOverflow={true}
          domain={[0, maxTotal]}
        />
        <YAxis yAxisId="right" orientation="right" allowDataOverflow={true} />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar
          dataKey="Revenue"
          barSize={20}
          fill="#8884d8"
          yAxisId="left"
          label={{
            position: "top",
            formatter: (value) => formatYAxis(value),
          }}
        />
      </ComposedChart>
    </div>
  );
}

export default Income;
