/*
    Where to put state in component hierarchy
    Uncontrolled component vs controlled component - good practice to have React Controlled component
    React state side effect - useEffect hook (let into component lifecycle)
    React custom hook - to cover
    React fragement
*/


import { waitFor } from "@testing-library/react";
import { useEffect, useState } from "react";

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

        // Apart from setting state, doing some external work here which should always be done
        localStorage.setItem('searchStories', event.target.value);
        // or maybe calling some API here
        // Now if state SearchStory is being updated anywhere else, that code should also update localStorage
        // which might be missed - so instead of this, another hook called useEffect can be used
    }

    // if searchStories is changed anywhere, useEffect 
    // second param is dependency array - state or props, if any of the value changes, side-effect happnes
    useEffect(() => {
        localStorage.setItem('searchStories', searchStories);
    }, searchStories /* could pass multiple state or props array*/);

    return (
        <div>
            <h1>---- AppSecond Component ---</h1>
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
            <h4>useEffect wihout any dependency - effects trigger on each render</h4>
            {/*
                Same components initialized twice - will maintain their separate state
            */}
            <EffectsOnEveryRender/>
            <EffectsOnEveryRender/>
            <h4>useEffect with empty dependency array - triggers on first render only</h4>
            <EffectsOnOnlyFirstRender/>

            <h4>Return multiple elements</h4>
            <ReturnMultipleElements/>

            <h4>Return multiple elements with Fragments -- check html</h4>
            <ReturnMultipleElementsWithFragement/>
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

// using object destructing at param level
// This is ok as props are objects -- name has to match, can do it in method body as well
const ControlledSearchStories = ({ searchStory, handleChangeHandler }) =>
    (
        <div>
            <label htmlFor="SearchStory">SearchStories</label>

            <input type="text" value={searchStory} onChange={handleChangeHandler}></input>
        </div>
    );


const EffectsOnEveryRender = () => {
    // state initialization happens only once for one compoent initalization - not on every render
    const [count, setCount] = useState(0);

    const handleChange = (event) => {
        console.log("count updated" + event.target.value);
        setCount(event.target.value);
    }

    // This will trigger every render
    console.log("This is from EffectsOnEveryRenderComponent");

    // Without any dependecy array - will trigger on this component render 
    // This in turn will update the state - which will again cause the component to render
    // again render will trigger the side effect- calling this again 
    useEffect(() => {
        console.log('use Effect called');
        setTimeout(() => {
            // setCount can access state variable directly by passing function
            setCount(count => count + 1)
        }, 1000)
    });

    return (
        <div>
            <p>Count : <strong>{count}</strong></p>
        </div>
    );
}

const EffectsOnOnlyFirstRender = () => {
    // state initialization happens only once for one compoent initalization - not on every render
    const [count, setCount] = useState(0);

    const handleChange = (event) => {
        console.log("count updated" + event.target.value);
        setCount(event.target.value);
    }

    // This will trigger every render
    console.log("This is from EffectsOnEveryRenderComponent");

    // added empty dependenct array - triggers only on first render
    useEffect(() => {
        console.log('use Effect called');
        setTimeout(() => {
            // setCount can access state variable directly by passing function
            setCount(count => count + 1)
        }, 1000)
    }, []);

    return (
        <div>
            <p>Count : <strong>{count}</strong></p>
        </div>
    );
}

// to return multiple elements from component - return array with key attribute for each top elements
// else use Fragment
const ReturnMultipleElements = () => 
    [
        <p key='paraOne'>
            Para One
            <p>Nested para - key not required</p>
        </p>,
        <p key='paraTwo'>
            Para Two
        </p>
    ]

// React Fragments - no keys, no parent element will appear in html
const ReturnMultipleElementsWithFragement = () => 
(
    <>
        <p>
            Para One
        </p>
        <p>
            Para Two
        </p>
    </>
)

export default AppSecond;