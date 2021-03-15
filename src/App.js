import "./App.css";
// import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
// import DataFilter from "./components/DataFilter";
import { AppBar, Tab, TextField } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import SurfaceList from "./components/Surface-List/Surface-list.component";
import { SurfaceDetail } from "./components/surface-detail/surface-detail.component";
import { ServerList } from "./components/server-list/server-list.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      surfaces: [],
      selectedSur: undefined,
      searchFilter: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://2hsjstzo71.execute-api.us-east-1.amazonaws.com/prod/livebarn-interview-project"
    )
      .then((response) => response.json())
      .then((data) => this.setState({ surfaces: data }));
  }

  render() {
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
      console.log(newValue);
    };

    const updateSelectedSur = (selectedSur) => {
      this.setState({ selectedSur });
    };

    const { surfaces, searchFilter } = this.state;

    let FilteredSurfaces = surfaces.filter((surface) =>
      surface.venueName.toLowerCase().includes(searchFilter.toLowerCase())
    );
    return (
      <div className="App">
        <div className="button-session">
          <Button variant="contained" color="primary">
            Empty Tab
          </Button>
          <Button variant="contained" color="secondary">
            Data
          </Button>
        </div>
        <div className="data-display">
          <div className="search-container">
            <TextField
              type="text"
              placeholder="Search for..."
              onChange={(event) =>
                this.setState({ searchFilter: event.target.value })
              }
            />
            <AppBar position="static">
              <Tabs value={this.state.value} onChange={handleChange}>
                <Tab label="Surfaces" />
                <Tab label="Severs" />
              </Tabs>
            </AppBar>
            {this.state.value === 0 ? (
              <SurfaceList
                surfaces={FilteredSurfaces}
                onSelectUpdate={updateSelectedSur}
                selectSurface={this.state.selectedSur}
              />
            ) : (
              <ServerList surfaces={this.state.surfaces} />
            )}
          </div>
        </div>
        <div className="data-detail">
          <SurfaceDetail selectedSurface={this.state.selectedSur} />
        </div>
      </div>
    );
  }
}

export default App;
