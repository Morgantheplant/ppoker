import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Card from "./Card";


class Cards extends React.Component {
  createCards(item, index) {
    return (
      <Card
        key={index}
        item={item.number} selected={item.selected}
        clicked={this.props.clicked} index={index}
      />);
  }

  render() {
    return (
      <div className={classNames("card-area", { "show-pane": this.props.panelShown })}>
         { this.props.cards.map(this.createCards, this)}
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cardStore.cards
  };
}

Cards.propTypes = {
  clicked: React.PropTypes.func.isRequired,
  cards: React.PropTypes.array.isRequired,
  panelShown: React.PropTypes.panelShown
};

export default connect(mapStateToProps)(Cards);
