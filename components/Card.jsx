import React from "react";
import classNames from "classnames";

const rand = 360 * Math.random();

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }
  clicked() {
    const { clicked, index } = this.props;
    clicked(index);
  }
  render() {
    const value = (Math.floor(this.props.item + rand));
    const color1 = `hsl(${value}, 100%, 50%)`;
    const color2 = `hsl(${value + 10}, 90%, 45%)`;
    return (
      <div
        style={{ backgroundImage: `linear-gradient(${color1},${color2})` }}
        className={classNames("card", { selected: this.props.selected })}
        type={this.props.item}
        onClick={this.clicked}
      >
        <div className="top">{this.props.item}</div>
        <div className="middle">{this.props.item}</div>
        <div className="bottom">{this.props.item}</div>
      </div>);
  }
}

Card.propTypes = {
  item: React.PropTypes.string.isRequired,
  clicked: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired
};

export default Card;
