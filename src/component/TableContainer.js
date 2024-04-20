

import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const TableContainer2 = ({ holdings }) => {
  return (
    <>
      {holdings && holdings.length > 0? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
         
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Ticker</TableCell>
                <TableCell align="right">Avg Price</TableCell>
                <TableCell align="right">Market Price</TableCell>
                <TableCell align="right">Latest Change (%)</TableCell>
                <TableCell align="right">Market Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holdings.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.ticker}</TableCell>
                  <TableCell align="right">{row.avg_price}</TableCell>
                  <TableCell align="right">{row.market_price}</TableCell>
                  <TableCell align="right">{row.latest_chg_pct}</TableCell>
                  <TableCell align="right">{row.market_value_ccy}</TableCell>
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
