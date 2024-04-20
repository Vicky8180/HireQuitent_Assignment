import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Collapse.css"
import  TableContainer  from './TableContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton'; 

const Table = () => {
  const [jsonData, setJsonData] = useState([]);
  const [expanded_Item, setExpanded_Item] = useState(null);
  const [tableListCounts, setTableListCounts] = useState({});
  const [arrowButton, setArrowButton] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
         // console.log(res)
        setJsonData(res.data.payload);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const counts = {};
    jsonData.forEach(item => {
      counts[item.asset_class] = counts[item.asset_class] ? counts[item.asset_class] + 1 : 1;
    });
    setTableListCounts(counts);
  }, [jsonData]);

  const toggleExpand = (assetClass) => {
    if (assetClass === expanded_Item) {
      setExpanded_Item(null);
      setArrowButton({ ...arrowButton, [assetClass]: false });
    } else {
      setExpanded_Item(assetClass);
      setArrowButton({ ...arrowButton, [assetClass]: true });
    }
  };

  const outerTables = () => {
    // console.log(jsonData)
    const asset_Classes = [...new Set(jsonData.map(item => item.asset_class))];
    console.log(asset_Classes)
    return asset_Classes.map(item => (
      <div  className='row_div' key={item}>
        <div onClick={() => toggleExpand(item)} style={{ cursor: 'pointer', color:'#1e467f', fontWeight: '550', lineHeight: '1',fontSize: '14px' }}>
        <IconButton onClick={() => toggleExpand(item)}>
            {arrowButton[item] ? <ExpandLessIcon  style={ {color:'red', fontWeight: '550'}} /> : <ExpandMoreIcon style={ {color:'#1e467f', fontWeight: '550'}} />}
          </IconButton>
          {item.toUpperCase()} ({tableListCounts[item] || 0})
         
        </div>
        {expanded_Item === item && (
          <TableContainer data={jsonData.filter(item2 => item2.asset_class === item)} />
        )}
      </div>
    ));
  };

  return (
    <>
      <h1>HireQuotient Table</h1>
      <div className='main_container'>
   
   {outerTables()}
 </div>
    </>
   
  );
};

export default Table;
