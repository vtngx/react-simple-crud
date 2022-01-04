#   REACTJS MAIN CONCEPTS

```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```


## JSX
```js
const element = <h1>JSX Element</h1>
```
* Neither a String not HTML
* A syntax extensioon to JS
* Produces *React elements*

```js
//  Embedding Expression in JSX
//  It is possible to mix valid JS expressions with JSX by putting them inside curly braces.
const formatName = user => user.first + ' ' + user.last
const user = {
  fisrt: 'Viet',
  last: 'Nguyen'
}
const element = <h1>Wassup, {formatName(user)}</h1>


//  Use JSX as an Expression
const getGreeting = user => {
  if (user)
    return <h1>Hello, {formatName(user)}</h1>
  
  return <h1>Who r u, stranger?</h1>
}


//  Specifying Attibutes
const element = <div tabIndex="0"></div>
const element = <img src={user.avatarUrl}></img>


//  JSX prevents injections
//  React DOM escapes any values embedded in JSX before rendering them => everything injected is converted to a string before being rendered
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;


//  React.createElement()
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
)
//  equals
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
)
```

##  Rendering Elements
```js
//  Render a React element into a root DOM node
const element = <h1>Hello</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
)


//  Update a rendered element
//  - React elements are immutable (unchangable)
//  - The only way to update is to render a new element
const tick = () => {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```


##  Components & Props
####  **Function & Class**
```js
//  Define a React component using Function
const NowPlaying = props => <h1>Now playing {props.songName}</h1>


//  Define a React component using Class
class NowPlaying extends React.Component {
  render() {
    return <h1>Now playing {this.props.songName}</h1>
  }
}
```

####  **Render a Component with props**
```js
const NowPlaying = props => <h1>Now playing {props.songName}</h1>

const App = () => {
  return (
    <div>
      <NowPlaying songName="Dandelions" />
      <NowPlaying songName="Landslide" />
      <NowPlaying songName="Jamming" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

####  **Props are Read-Only**


##  State & Lifecycle
```js
//  from this
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(
    element,
    document.getElementById('root')
  )
}

setInterval(tick, 1000)


//  implement state
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  //  called after the component is inserted in the DOM
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }
  
  //  called when the component is removed from the DOM
  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

####  **Do not modify state directly**
```js
//  incorrect
this.state.comment = 'Hello'

//  correct
this.setState({comment: 'Hello'})
```

####  **State Updates May Be Asynchronous**
```js
//  incorrect
this.setState({
  counter: this.state.counter + this.props.increment,
})

//  correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}))
```