import React from "react";
class DataFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filterList = this.filterList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      initialItems: [
        "Goku",
        "Vegeta",
        "Piccolo",
        "Gohan",
        "Goten",
        "Trunks",
        "Bulma",
        "M aster Roshi",
        "Krillin",
      ],
      items: [],
    };
  }
  filterList(event) {
    let updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function (item) {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: updatedList });
  }
  handleClick(event) {
    console.log(this.state.initialItems);
  }
  componentWillMount() {
    this.setState({ items: this.state.initialItems });
  }
  render() {
    return (
      <div className="filter-list">
        <button onClick={this.handleClick}>Button</button>
        <input type="text" placeholder="Search" onChange={this.filterList} />
        <List items={this.state.items} />
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    );
  }
}
export default DataFilter;
