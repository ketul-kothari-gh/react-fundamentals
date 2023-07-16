/*
JSX
using javascript variables in JSX {}
Components 
React events - handler function
Props - To pass information down the hierarchy (are objects)
React state - 
  --- state initializtion happens only once when component instance is first rendered
  --- Same component - multiple initialization -- separate states are maintained - example in AppSecond
  --- React hooks to manage state. There are other react hooks as well
  1. useState
Callback handlers - To pass info up the hierarchy.. uses props

*/




import React from 'react'

const title = "React";

const welcome = {
  greeting: "Hello",
  title: "React"
};

function greet(pTitle)
{
  return "Hello " + pTitle;
}

// using global vairable
const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

// How are react components rendered in HTML
// uses - ReactDom library -- check index.js
// uses ReactDom.render(<App />, document.getElementById('root'))

// Component - function component
// retuns JSX - must have one parent element - ex: here it's top div

// in jsx all html attributes are valid ex: id, type
// but some are replaced - such as for with htmlFor, class with className, onClick with onclick 
function App(){
  // can do anything with JS here

  // define local variable and pass to other components
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

  // to be called from SearchWithStateManagementWtihCallbackHandlers component
  const callBackHandlerToHandleChange = (event) => {
    console.log("Printed from callback Handler : " + event.target.value);
  }

  // returns jsx - write html like syntax in javascript
  return (
    // all jsx component should return single root element
    <div>
      <h1>Hello World {title}</h1>

      <h3>{welcome.greeting} {welcome.title}</h3>

      <h4>{greet("wonderful")}</h4>

      <h4>List printed directly in root component using global variable</h4>
      {list.map((item) => {

        // should return single root element
        return <div key={item.objectID}>
          <span><a href={item.url}>{item.title}</a></span>
          <span>{item.author}</span>
          <span>{item.points}</span>
          <span>{item.num_comments}</span>
        </div>
      })}

      {/* Here hierarchy of components is getting created. App is parent of List.*/}
      {/* component instance created */}
      <h4>component to show list</h4>
      <List/>

      <h4>component to show list impemented in different manner</h4>
      <ListComponentDefinedInAnotherWay/>

      <h4>component to show list impemented using Arrow functions</h4>
      <ListArrow/>
      <Search/>

      <h4>component to show list by using passing information down the hierarchy using props</h4>
      {/* Props allow passing value from one component to another */}
      <ListWithProps list={stories}/>

      <h4>component to implement Search with state management</h4>
      <SearchWithStateManagement/>

      <h4>component to implement Search with state management with Callback handlers</h4>
      <SearchWithStateManagementWtihCallbackHandlers handleChange={callBackHandlerToHandleChange}/>
    </div>
  );
}

// component definition like class definition - blue print
// this looks more standard than below one -- as it return one parent element
// This emits individual div tag for each item with a parent div
function List(){
  return (
    <div>
      {list.map((item) => {
        return <div key={item.objectID}>
          <span><a href={item.url}>{item.title}</a></span>
          <span>{item.author}</span>
        </div>
      })}
    </div>


  );
}

// Here list component is defined in another way
// This emits individual div tag for each item without any parent div
function ListComponentDefinedInAnotherWay(){
  return list.map(item => {
    return (
      <div key={item.objectID}>
          <span><a href={item.url}>{item.title}</a></span>
          <span>{item.author}</span>
      </div>
    );
  });
}


// implementing List componenet using arrow function
// return in arrow function can be omitted if the function is only retruning and do not have any other statement
// count => { return count + 1 } can be written as count => count + 1
const ListArrow = () => 
  list.map(item => (
    <div key={item.objectID}>
        <span><a href={item.url}>{item.title}</a></span>
        <span>{item.author}</span>
    </div>
  ))

// component defined to use props
// will create separate divs
const ListWithProps = (props) =>
  props.list.map((item) => (
    <div key={item.objectID}>
              <span><a href={item.url}>{item.title}</a></span>
        <span>{item.author}</span>
    </div>
  ))   


// compoenent definition like class definition - blue print
function Search(){
  // event is synthetic event - wrapper around browser's native event, sometimes prevent browser normal behavior
  // browser normal event can also be used
  const handleChange = event => {
    console.log(event.target.value);
  }
  return (
    <div>
      <h4>Using different component to show search</h4>
      {/* react converts jsx to javascript object with attributes as properties
      JS object cannot have properties with - in name, also attributes with same name as JS keyword cannot be used
      so JSX provides replacement for such attributes ex: for has htmlFor etc
      */}
      <label htmlFor='search'>Search : </label>
      <input id='search' type='text' onChange={handleChange}></input>
    </div>
  );
}

// component using state mangement
const SearchWithStateManagement = () => {
  // useState is use to manage the state
  // useState takes an argument - that represents initial state
  // returns array - first item represents current state
  // second item represents function to update this state - aka state updater function
  // searchTerm is defined as const - cannot be changed from code except calling setSearchTerm
  const [searchTerm, setSearchTerm] = React.useState(''); 
  
  // this will get trigger when user change input in text box
  // by calling state update function from this will update state 
  const handleChange = (event) => {
    console.log("calling state updater function")
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <p>
        This is being searched <strong>{searchTerm}</strong>
      </p>

      <div>
          <label htmlFor='searchField'>Search : </label>
          <input id='searchField' type="text" onChange={handleChange}></input>
      </div>
    </div>

  );
}


// component using state mangement
const SearchWithStateManagementWtihCallbackHandlers = (props) => {
  // useState is use to manage the state
  // useState takes an argument - that represents initial state
  // returns array - first item represents current state
  // second item represents function to update this state - aka state updater function
  // searchTerm is defined as const - cannot be changed from code except calling setSearchTerm
  const [searchTerm, setSearchTerm] = React.useState(''); 
  
  // this will get trigger when user change input in text box
  // by calling state update function from this will update state 
  const handleChange = (event) => {
    console.log("calling state updater function")
    setSearchTerm(event.target.value);

    // calling root component handle change using props
    props.handleChange(event);
  }

  return (
    <div>
      <p>
        This is being searched <strong>{searchTerm}</strong>
      </p>

      <div>
          <label htmlFor='searchField'>Search : </label>
          <input id='searchField' type="text" onChange={handleChange}></input>
      </div>
    </div>

  );
}

export default App;