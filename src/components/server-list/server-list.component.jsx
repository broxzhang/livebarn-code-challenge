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
                <TableRow
                  key={obj}
                  onClick={() => {
                    this.handleOnClick(obj);
                  }}
                  selected={this.state.selected === obj || selectedIP === obj}
                >
                  <StyledTableCell component="th" scope="row">
                    {servers[obj][0].server.ip4}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {servers[obj][0].server.dns}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
