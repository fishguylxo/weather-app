import React from 'react';
import './App.css';
import AutoComplete from './autocompleter.js'

class App extends React.Component 
{
   // React constructor must take an argument called props
   constructor (props)
   {
       // Constructor must pass props to super, 
       // this insures the class is setup properly.
       super(props);

       // Create a new object containing an empty array.
       this.state = 
       {
           countries : [],
       };
   }

  componentDidMount()
  {
      const address = `http://localhost:3001/countries`;

      fetch(address)
      .then(res => 
      {
          return res.json()
      })
      .then(countries => 
      {
          this.setState({ countries })
      });   
  }

  render() 
  {
    return (
      <div className="App" >
      <h1>Weather app! </h1>
        <AutoComplete items={this.state.countries}  />  
      </div>
    );
  }
}

// Exports app to be used by ReactDOM.render() which is incharge of rendering the app
// to screen
export default App;
