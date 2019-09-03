import React from 'react';
import './autocompleter.css';
import Proxy from './Proxy.js';

export default class AutoComplete extends React.Component
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
            suggestions: [],
            first_text: 'Country',
            second_text: 'Optional address',
            address: '',
        };
    }

    //------------------------------------------------------------------------//
    //                             CountryBox                                 //
    //------------------------------------------------------------------------//

    onCountryBoxTextChange = (e) => 
    {
        const { items } = this.props;
        const value = e.target.value;

        // Define a mutable variable
        let suggestions = [];

        // if not empty, create a regular expression that tests for 
        // matches in the item list.
        if (value.length > 0)
        {
            const regex = new RegExp(`^${value}` , 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }

        // Set the state of the fillbox according to the input. 
        // Set suggestions according to regex result.
        // Set text value according to what is typed   
        this.setState(() => ({ suggestions , first_text: value }));
    }
 
    suggestionsSelected (value)
    {
        const {second_text} = this.state;
        var final_address = value;
        
        if (second_text !== 'Optional address' && second_text !== '' )
        {
            final_address += second_text
        }

        this.setState (() => 
        ({
            first_text: value, 
            suggestions: [],
            address : final_address
        }))
    }
    
    renderSuggestion()
    {
        // Get suggestions from state.
        const { suggestions } = this.state;

        if (suggestions.length === 0)
        {
            // return value of null wont render anything to the browser.
            return null;
        }
        
        return (
        <ul>
            {/* anything in curly braces will be evaluated for output */}
            {
                // Any item on the list that is clicked on will call suggestionSelected
                // which will update the fillbox with that item.
                suggestions.map((item, index) => <li key={index} onClick = {() => this.suggestionsSelected(item)}>{item}</li>)
            }
        </ul>
        );
    }
    
    handleKeyPress = (e) =>
    {
        const {first_text}  = this.state;
        const {second_text} = this.state;

        if (e.key === 'Enter')
        {
            var value = first_text
            if (first_text !== 'Country')
            {   
                if (second_text !== 'Optional address'  && second_text !== '')
                {
                    value += '_' + second_text
                }
                
                this.setState (() =>
                ({
                    address: value, 
                }))
            }
        }
    }

    // Clear boxes from default values
    clearCountryBox = (e) =>
    {
        if (this.state.first_text === 'Country')
        {
            this.setState(() => ( {first_text : '' }))
        }
    }

    // Clear boxes if deselected without any value.
    handleCountryBoxBlur  = (e) =>
    {
        const { first_text } = this.state;

        if (first_text.length === 0)
        {
            this.setState(() => ( {first_text : 'Country' }))
        }   
    }

    //------------------------------------------------------------------------//
    //                         OptionalAddressBox                             //
    //------------------------------------------------------------------------//

    // Setup text change function to allow for default box value.
    onOptionalAddressBoxTextChanged = (e) => 
    {
        const value = e.target.value;
 
        this.setState(() => ( {second_text : value }));
    }

    // Clear boxes from default values
    clearOptionalAddressBox = (e) =>
    {
        if (this.state.second_text === 'Optional address')
        {
            this.setState(() => ( {second_text : '' }))
        }
    }

    handleOptionalAddressBlur = (e) =>
    {
        const { second_text } = this.state;

        if (second_text.length === 0)
        {
            this.setState(() => ( {second_text : 'Optional address' }))
        }   
    }

    //------------------------------------------------------------------------//
    //                        Address Manipulation                            //
    //------------------------------------------------------------------------//

    // The render function is the base for each react application,
    // it scans and updates changes as they occur onto the website.
    render() 
    {
        // Extract text and address value from state.
        const { first_text }  = this.state;
        const { second_text } = this.state;
        var   { address }     = this.state;
        
        // must return react elements that represents the rendered component
        // jsx allows to write the elements to return directly using html tags.
        return(
            <div>
                <div className="AutoCompleter">
                {/* Text box that reacts to changes */}
                <input value = {first_text} onChange={this.onCountryBoxTextChange} onKeyPress={this.handleKeyPress} onBlur={this.handleCountryBoxBlur} onClick={this.clearCountryBox} type="text" />
                {
                    this.renderSuggestion()
                }
                </div>

                <br></br>

                <div className="OptionalAddress">
                <input value = {second_text} onChange={this.onOptionalAddressBoxTextChanged} onKeyPress={this.handleKeyPress} onBlur={this.handleOptionalAddressBlur} onClick={this.clearOptionalAddressBox} type="text" />
                {}
                </div>

                <br></br>
                
                <Proxy address={address}>
                </Proxy> 

            </div>

        )
    }
}