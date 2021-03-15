import React from "react";
import _ from "lodash";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const ServerList = (props) => {
  const { surfaces } = props;
  console.log(surfaces);
  let servers = _.groupBy(surfaces, "server.ip4");

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>IP 4</StyledTableCell>
              <StyledTableCell align="left">Dns</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(servers).map((obj) => (
              <StyledTableRow key={obj}>
                <StyledTableCell component="th" scope="row">
                  {servers[obj][0].server.ip4}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {servers[obj][0].server.dns}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
