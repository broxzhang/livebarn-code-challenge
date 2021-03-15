import React, { Component } from "react";
import _ from "lodash";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import "./server-list.style.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default class ServerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      selectedServerIP: "",
    };
  }
  handleOnClick = (obj) => {
    this.setState({ selected: obj });
    this.props.onSelectUpdate({});
  };
  handleOnClickSurface(surface) {
    this.props.onSelectUpdate({ surface });
  }
  render() {
    const { surfaces } = this.props;
    let servers = _.groupBy(surfaces, "server.ip4");
    let selectedIP = this.state.selectedServerIP;
    console.log(this.props.selectSurface);
    if (!_.isEmpty(this.props.selectSurface)) {
      selectedIP = this.props.selectSurface.server.ip4;
    } else {
      selectedIP = "";
    }
    return (
      <div className="server-list-container">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>IP 4</StyledTableCell>
                <StyledTableCell align="left">Dns</StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        {Object.keys(servers).map((obj) => (
          <div className="table-data" key={obj}>
            <div
              className={
                this.state.selected === obj || selectedIP === obj
                  ? "table-row custom-select"
                  : "table-row"
              }
              onClick={() => {
                this.handleOnClick(obj);
              }}
            >
              <div className="table-cell">{servers[obj][0].server.ip4}</div>
              <div className="table-cell">{servers[obj][0].server.dns}</div>
            </div>
            {this.state.selected === obj || selectedIP === obj ? (
              <div className="surfaces-container">
                <span>Number Surfaces: {servers[obj].length}</span>
                <TableContainer component={Paper} className="table-container">
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Venue</StyledTableCell>
                        <StyledTableCell align="right">Surface</StyledTableCell>
                        <StyledTableCell align="right">Sport</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {servers[obj].map((surface) => (
                        <TableRow
                          selected={this.state.selectedSurface === surface.id}
                          key={surface.id}
                          onClick={() => this.handleOnClickSurface(surface)}
                        >
                          <StyledTableCell component="th" scope="row">
                            {surface.venueName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {surface.surfaceName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {surface.sport}
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}
