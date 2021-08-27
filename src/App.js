import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css'
import { Card, Icon, Image } from 'semantic-ui-react'
function App() {
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [perPage,setPerpage] = useState(10);
  const [pageCount, setPageCount] = useState(4)

  const getData = async() => {
      const res = await axios.get(`https://reqres.in/api/users?page=${offset}`)
      const temp = res.data;
      setPerpage(temp.per_page)
      setPageCount(temp.total_pages)
      const data = res.data.data;
                // const slice = data.slice(offset, offset + perPage)
                
               
                //const postData = 
                 setData(data)
                
                 console.log(temp);
  }
  const handlePageClick = ({ selected: selectedPage }) => {
    setOffset(selectedPage+1)
    console.log("offset=",offset);
    getData()
};

 
  return (
    <div className="App">
      
    
         
        {data.map(pd => <div key={pd.id}>
          <Card id="card">
    <Image src={pd.avatar} wrapped ui={false} />
    <Card.Content>
      <Card.Header>ID: {pd.id}</Card.Header>
      <Card.Header>Email: {pd.email}</Card.Header>
      <Card.Header>First Name: {pd.first_name}</Card.Header>
      <Card.Header>Last Name: {pd.last_name}</Card.Header>
     
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>                  
      </div>)
}
      
      
      
       <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );
}

export default App;
