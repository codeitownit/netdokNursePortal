import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from "prop-types";


function CustomLineChart({ data }) {
  return (
    <div className="w-full h-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 30 }}>
            <Line type="monotone" dataKey="avg" stroke="#FF7300" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

CustomLineChart.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avg: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

export default CustomLineChart