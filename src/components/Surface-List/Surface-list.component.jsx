import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core/styles";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./surface-list.style.css";

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

export default class SurfaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      chosen: false,
      selectedSurfaceId: 0,
    };
  }
  handleOnClick = (surface) => {
    this.props.onSelectUpdate(surface);
    this.setState({ selectedSurface: surface.id });
  };

  render() {
    return (
      <div>
        <TableContainer component={Paper} className="table-container">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Venue Name</StyledTableCell>
                <StyledTableCell align="right">Surface Name</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Sport</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.surfaces.map((surface) => (
                <TableRow
                  selected={this.state.selectedSurface === surface.id}
                  key={surface.id}
                  onClick={() => this.handleOnClick(surface)}
                >
                  <StyledTableCell component="th" scope="row">
                    {surface.venueName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {surface.surfaceName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {surface.status}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {surface.sport}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="count-container">
          Matched: {this.props.surfaces.length}
        </div>
      </div>
    );
  }
}
