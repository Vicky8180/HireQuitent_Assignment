

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Collapse.css"
import  TableContainer  from './TableContainer';
import { TableBody, TableRow } from '@mui/material';

const HoldingsTable = () => {
  const [holdings, setHoldings] = useState([]);
  const [expandedAssetClass, setExpandedAssetClass] = useState(null);
  const [collapsedCounts, setCollapsedCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
        setHoldings(response.data.payload);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const counts = {};
    holdings.forEach(holding => {
      counts[holding.asset_class] = counts[holding.asset_class] ? counts[holding.asset_class] + 1 : 1;
    });
    setCollapsedCounts(counts);
  }, [holdings]);

  const toggleExpand = (assetClass) => {
    if (assetClass === expandedAssetClass) {
      setExpandedAssetClass(null);
    } else {
      setExpandedAssetClass(assetClass);
    }
  };

  const renderTables = () => {
    const assetClasses = [...new Set(holdings.map(holding => holding.asset_class))];
    return assetClasses.map(assetClass => (
      <div key={assetClass}>
     
        <h3 onClick={() => toggleExpand(assetClass)} style={{ cursor: 'pointer' }}>
          {assetClass} ({collapsedCounts[assetClass] || 0})
        </h3>
        {expandedAssetClass === assetClass && (
          <TableContainer holdings={holdings.filter(holding => holding.asset_class === assetClass)} />
        )}
       
  
      </div>
    ));
  };

  return (
    <div>
      <h2>Holdings Table</h2>
      {renderTables()}
    </div>
  );
};

export default HoldingsTable;
