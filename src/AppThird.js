/*
    Making component reusbale using props
    React component compsition - children 

*/

import { Children, useState } from "react";

function AppThird() {
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

    // const numbers = Array.from({length: 20}, (x, i) => i);
    const numbers = [1,2,3,4,5,1,2,3,1,2,6,7,8,9,8,7,6,5,4,3,2,1];

    {/* Hooks are initialize only once*/}
    const [searchStories, setSearchStories] = useState('React');
    const [searchNumber, setSearchNumber] = useState();

    // bringing list into state to allow remove
    const [stateStories, setStateStories] = useState(stories);

    const handleRemoveStory = (item) => {
        const filteredStories = stateStories.filter(s => s.objectID !== item.objectID);
        setStateStories(filteredStories);
    }

    function handleStoryChange(event){
        console.log("Handle change event");
        setSearchStories(event.target.value);
    }

    function handleNumberChange(event){
        console.log("Handle change event");
        setSearchNumber(event.target.value);
    }

    return (
        <div>
            <h4>Using resubale component to search list of stories</h4>
            <ReusableSearch id="searchStoryId" onValueChange={handleStoryChange} value={searchStories}>Search Stroy : </ReusableSearch>
            <ReusableDisplay itemType="Stories" count={stories.filter(s => s.title.includes(searchStories)).length}></ReusableDisplay>

            <h4>Using resubale component to search numbers</h4>
            <ReusableSearch id="searchNumberId" type="number" onValueChange={handleNumberChange} value={searchNumber}>Search Number : </ReusableSearch>
            <ReusableDisplay itemType="Numbers" count={numbers.filter(n => n == searchNumber).length}/>

            <h4>List stories with remove functionality</h4>
            <List list={stateStories} onRemoveItem={handleRemoveStory}/>
        </div>
    )

}

// using children to get inner content passed -- must be named children (no additional prop is explictly passed as attribute)
const ReusableSearch = ({ id, type, onValueChange, value, children }) => {
    return (
        <>
            <label htmlFor={id}>
                {children}
            </label>
            <input id = {id} type={type} onChange={onValueChange} value={value}></input> 
        </>
    )
}

const ReusableDisplay = (props) => 
    <h4>{props.itemType} count found : {props.count}</h4>


const List = ({list, onRemoveItem}) => 
    list.map(item => 
        <Item key={item.objectID} 
            item={item}
            onRemoveItem={onRemoveItem}/>
    );

const Item = ({item, onRemoveItem}) => {
    
    //in case if the method was complex, it shouldn't be made inline in JSX.. should be implemented here
    //const handleRemoveItem = () => { onRemoveItem(item) }

    return <div>
        <span><a href={item.url}>item.title</a></span>
        <span>{item.author}</span>
        <span>{item.points}</span>
        {/* cannot directly write onRemoveItem(item) as that is invocation*/}
        <span><button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button></span>
    </div>

}


export default AppThird;