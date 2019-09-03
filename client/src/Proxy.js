import React from 'react';
import './Proxy.css';

export default class Proxy extends React.Component
{
    constructor (props)
    {
        // Constructor must pass props to super, 
        // this insures the class is setup properly.
        super(props);

        // Create a new object containing an empty array.
        this.state = 
        {
            address: '',
            message: ''
        };
    }

    // shouldComponentUpdate()
    // {
    //     const { address } = this.props
        
    //     if (address !== this.state.address )
    //     {
    // }

    getWeatherFromAddress()
    {
        // Get address from proxy
        const { address } = this.props
        
        if (address !== this.state.address )
        {
            this.setState({ address })

            if (address !== 'undefined')
            {
                const full_address = `http://localhost:3001/weather?address=${address}`;
                console.log(full_address)
                fetch(full_address)
                .then(res => 
                {
                    console.log(res);
                    return res.json()
                })
                .then(message => 
                {
                    console.log(message); 
                    this.setState({ message })
                });
            }
        }

        return (this.state.message)
    }

    // If component prop has changed, this function is called.
    componentDidUpdate()
    {
        this.getWeatherFromAddress();
    }

    componentDidMount()
    {
        this.setState({ message: "Press 'Enter' key after you supply an address"})
    }

    render() 
    {
        // must return react elements that represents the rendered component
        // jsx allows to write the elements to return directly using html tags.
        return(
            <div className="Proxy">
                {this.state.message}
            </div>
        )
    }
  
}
