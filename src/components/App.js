import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    //getinitialstate
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount(){
    //this runs right before <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeID}/fishes`
    , {
      context: this,
      state: 'fishes'
    });

    //check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeID}`);

    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeID}`
    , JSON.stringify(nextState.order))
  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key){
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({order: order});
  }

  addFish(fish) {
    //update state
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //set state
    this.setState({ fishes: fishes });
  }
  render() {
    return (
      <div className={"catch-of-the-day"}>
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className ="list-of-fishes">
            {
              Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
        />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}

export default App;
