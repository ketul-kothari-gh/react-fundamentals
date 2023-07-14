// Where to put state in component hierarchy
// Uncontrolled component vs controlled component - good practice to have React Controlled component


import { useState } from "react";

// Implementing state at parent component rather than child component
// AKA lifting state up.. this will allow using state in either main or child components
// If componenet is managed in x state
// if need to pass down the state use props
// if need to update the state from child component - use callbackHandler
function AppSecond() {
    const stories = [
        {
          title: 'React with props',
          url: 'https://reactjs.org/',
          author: 'Jordan Walke',
          num_comments: 3,
          points: 4,
          objectID: 0,
        },
        {
          title: 'Redux with props',
          url: 'https://redux.js.org/',
          author: 'Dan Abramov, Andrew Clark',
          num_comments: 2,
          points: 5,
          objectID: 1,
        },
    ];

    {/* Hooks are initialize only once*/}
    const [searchStories, setSearchStories] = useState('React');


    const filteredStories = stories.filter((value) =>
        value.title.toLowerCase().includes(searchStories.toLowerCase())
    );

    function handleChange(event){
        console.log("Handle change event");
        setSearchStories(event.target.value);
    }

    return (
        <div>
            <p>You have searched for {searchStories}</p>

            {/* 
                when state changes, all react component affected by modifed state or implicitly modified props
                are automatically rerendered - here list is dependent on fiteredStories dependent on state        
            */}
            <Stories list={filteredStories}/>
            
            <h4>Search implemented using uncontrolled component  (uncontrolled html elements)</h4>
            <SearchStories handleChangeHandler={handleChange} />
            <h4>Search implmented using controlled component</h4>
            <ControlledSearchStories searchStory={searchStories} handleChangeHandler={handleChange}/>
            <p></p>
        </div>
    );
}

const Stories = (props) => 
    props.list.map((item) => 
        <div id={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.points}</span>
            <span>{item.num_comments}</span>
        </div>
    ); 

// Still not controlled component. Controlled component takes input from props 
// and make changes thorugh callback
// here if the state has initial value it won't reflect in input
const SearchStories = (props) => {
    return (
        <div>
            <label htmlFor="SearchStory">SearchStories</label>

            <input type="text" onChange={props.handleChangeHandler}></input>
        </div>
    );
}

const ControlledSearchStories = (props) => {
    return (
        <div>
            <label htmlFor="SearchStory">SearchStories</label>

            <input type="text" value={props.searchStory} onChange={props.handleChangeHandler}></input>
        </div>
    );
}

export default AppSecond;