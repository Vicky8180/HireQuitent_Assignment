import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const TableContainer2 = (props) => {
  const data= props.data
  return (
    <>
      {data && data.length > 0? (
        <TableContainer  component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
         
            <TableHead>
              <TableRow >
                <TableCell style={{ cursor: 'pointer', color:'#1e467f', fontWeight: '500' }}>NAME</TableCell>
                <TableCell style={{ cursor: 'pointer', color:'#1e467f', fontWeight: '500' }}>TICKER</TableCell>
                <TableCell style={{ cursor: 'pointer', color:'#1e467f', fontWeight: '500' }}>AVG PRICE</TableCell>
                <TableCell style={{ cursor: 'pointer', color:'#1e467f', fontWeight: '500' }}>MARKET PRICE</TableCell>
                <TableCell style={{ cursor: 'pointer', color:'#1e467f', fontWeight: '500' }} >LATEST CHANGE (%)</TableCell>
                <TableCell style={{ cursor: 'pointer', color:'#1e467f', fontWeight: '500' }}>MARKET VALUE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: '#f5fafa' }}>
              {data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell >{row.ticker}</TableCell>
                  <TableCell >{row.avg_price}</TableCell>
                  <TableCell >{row.market_price}</TableCell>
                  {row.latest_chg_pct>0 ?<TableCell >{row.latest_chg_pct}</TableCell>: <TableCell style={{ color:'red' }} >{row.latest_chg_pct}</TableCell>}
                  
                  <TableCell >{row.market_value_ccy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default TableContainer2;
