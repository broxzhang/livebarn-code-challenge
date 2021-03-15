const { Component } = require("react");

class SearchBoxComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="">
        <input type="text" placeholder="search..." />
      </div>
    );
  }
}
