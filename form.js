import React from 'react';
import './form.css';

class Form extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      surname:'', 
      pname:'', 
      summary:'',
      message:'',
      
      isLoading: true,
      users: [],
      error: null,
      address:'',
      
      filteredUsers: [],

    };
  
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  handleClick() {
    this.setState({message:'Worker '+ this.state.name + ' '+ this.state.surname + ' on project ' + this.state.pname + ' '+ 'did ' + this.state.summary });
    
  }


  myFilter(event) {
    let users = this.state.users;
    let filterString = event.target.value.toLowerCase();
    users=users.filter(user => user.name.toLowerCase().includes(filterString) || user.email.toLowerCase().includes(filterString) || user.address.city.toLowerCase().includes(filterString));
    this.setState({ users });
  }

  
  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc"; 
  
    while (switching) {
      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;      
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }



  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(data =>
        this.setState({users: data, isLoading: false, })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }


  componentWillUnmount() {
    console.log('WillUnmount');
  } 



 
  



  render(){
    
    const { isLoading, users, error, } = this.state;

    return (
      <div className="Form">
          Name: <input name="name" type="text" id="myText" placeholder="Enter name.." value={this.state.name} onChange={this.handleChange}></input><br></br> <br></br>
          Surname: <input name="surname" type="text" id="myText" placeholder="Enter surname.." value={this.state.surname} onChange={this.handleChange}></input> <br></br> <br></br>
          Project name: <input name="pname" type="text" id="myText" placeholder="Enter project name.." value={this.state.pname} onChange={this.handleChange}></input><br></br> <br></br>
          Summary: <input name="summary" type="text" id="myText"  placeholder="Today i did.."  value={this.state.summary} onChange={this.handleChange} ></input><br></br><br></br>
          
          <button
            className="App-button"
            onClick={() => this.handleClick()}  //  onClick={this.handleClick}
            href="https://"
            const submit="True"
          > Submit
          </button>

          <div className="Message">
            {this.state.message}
          </div>  
          


          <h2>Random User</h2>
          {error ? <p>{error.message}</p> : null}

        
          <div>



          <form>
              Search: 
                <input type="text" placeholder="Type here..."  onChange={this.myFilter}/>
          </form>



            <table align="center" id="myTable">
              <tr>
                <th>Name  <button
            className="Sort-button"
            onClick={() => this.sortTable(0)}> sort </button>  </th>
                <th>Email <button
            className="Sort-button2"
            onClick={() => this.sortTable(1)}> sort </button> </th>
                <th>City <button
            className="Sort-button3"
            onClick={() => this.sortTable(2)}> sort </button> </th>
              </tr>


         {!isLoading ? (
            users.map((user, index) => {
              const { name, email, address  } = user;
              return (
                    <tr>
                      <td key={index}>  
                        {name}</td>
                      <td key={index}>
                        {email}</td>
                      <td key={index}>
                        {address.city}</td>
                    </tr>
              )})) : (
                <tr><td>Loading...</td></tr> )}    

                </table>  
                </div>

      </div>
    );
  } 
}

export default Form;