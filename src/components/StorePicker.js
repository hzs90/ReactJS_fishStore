import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  goToStore(event){
    event.preventDefault(); //prevent refresh
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* comment */}
        <h2>Please enter a store</h2>
        <input type="text" required placeholder="store name"
          defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
        <button type="submit">Visit store -></button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
