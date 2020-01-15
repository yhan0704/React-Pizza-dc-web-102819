import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  constructor(){
    super()
    this.state={
      pizzas:[],
      topping:"",
      size:"",
      id:0,
      vegetarian:false
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(data => {
      this.setState({
        pizzas:data
      })
    })
  }

  onClickEdit=(e)=>{
    this.setState({
      topping:e.topping,
      size:e.size,
      vegetarian:e.vegetarian,
      id:e.id
    })
  }

  onChangeinput=(e)=>{
    this.setState({
      topping: e.target.value,    
    })
  }

  onChangeSelect=(e)=>{
    this.setState({
      size:e.target.value,
    })
  }

  onChangeCheck=()=>{
    this.setState({
      vegetarian: !this.state.vegetarian
    }) 
  }

  editPizza=(a, e)=>{
    a.preventDefault()
    let data = {
      method: 'PATCH',
      headers: {
       'Content-Type' : 'application/json',
       'Accept' : 'application/json'
      },
      body: JSON.stringify({
        topping: e.topping,
        size:  e.size,
        vegetarian: e.vegetarian
      })
    }

    fetch(`http://localhost:3000/pizzas/${e.id}`, data)
    .then(res => res.json())
    .then(data => {
      this.setState({
          pizzas: [...this.state.pizzas.filter(pizza => pizza.id !== this.state.id), data]
        })        
      }
    )
  }

  render() {
    // console.log(this.state.id)
    return (
      <Fragment>
        <Header/>

        <PizzaForm topping={this.state.topping}
        id={this.state.id}
        size={this.state.size}
        vegetarian={this.state.vegetarian}
        onChangeinput={this.onChangeinput}
        onChangeSelect={this.onChangeSelect}
        onChangeCheck={this.onChangeCheck}
        editPizza={this.editPizza}/>

        <PizzaList 
        pizzas={this.state.pizzas}
        onClickEdit={this.onClickEdit}/>

      </Fragment>
    );
  }
}

export default App;
