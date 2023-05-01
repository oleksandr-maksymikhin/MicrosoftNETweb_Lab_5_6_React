import React from 'react'
import {useEffect, useState} from 'react'
import List from './List'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import './styles/Tickets.css';

export default function Tickets(props) 
{
  const [act, setAct] = useState("Tickets")
  const [price, setPrice] = useState();
  //useEffect(() => {},[])
  useEffect(() => 
  {
    //console.log(props.image);
    let url = 'http://localhost:5095/api/tickets/' + props.id;
    let sold = [];

      fetch(url)
      .then( (response) => 
        response.json()
      )
      .then((data) => 
        {
          //console.log(data);
          data.map((s) => 
          {
            let item = parseInt((s.row -1)*5 + s.seat) ;
            sold.push(item);
            //console.log(sold);
            //sold = [...sold, (s.row -1)*5 + s.seat];
          });
          let seats = 20;
      
          //seats presentation with grids
          if(document.getElementsByClassName('seat').length === 0)
          {
            for(let i = 0; i < seats; i++)
            {
              let div = document.createElement('div');
              div.innerHTML = i+1;
              //console.log(sold);
              //console.log(i + "-" + sold.indexOf(i+1));
              if(sold.includes(i+1)){
                div.className = 'sold';
                //console.log('selected');
              }
              else {
                div.className = 'seat';
                //console.log('seat');
              }
              document.getElementById('hall').appendChild(div);
            } 
          }
        })
      .catch( (error) => {console.log(error)})
  },[]);
  
  const handlePurchase = (e) => {
    if(e.target.className=='sold'){
      return};
    e.target.className == 'seat' ? e.target.className = 'selected' : e.target.className = 'seat';
  }
  
  const buyTicket = (e) => 
  {
    let seats = document.getElementsByClassName('selected');
    let selected = [...seats];
    selected.map( (t) => 
    { 
      //console.log(t.innerHTML);
      let id = parseInt(t.innerHTML) - 1;
      let row = parseInt(id / 5) + 1;
      let seat = id % 5 + 1;
      //let price = 100;
      let ticket = {row: row, seat: seat, price: price, movieId: props.id};
      //console.log(ticket);

      const options = 
        {
          method: 'POST',
          headers: {'Content-Type':'application/json; charset=utf-8'},
          body: JSON.stringify(ticket)
        }

        let url = 'http://localhost:5095/api/tickets';
        fetch(url, options)
        .then((response) => 
        {
          //console.log(response);
          let child = document.getElementById('hall').childNodes;
          child.forEach(element => 
            {
              if(((ticket.row-1)*5 + ticket.seat) === parseInt(element.innerHTML))
              {
                element.className='sold';
                return;
              }
            });
        })
        .catch((error) => {console.log(error);})
    })
    setPrice('');
  }

  return (
    <div >
      {act === "Tickets" &&
        <div className='row'>
          <div className='col-md-6 col-lg-6 mt-3 d-flex flex-column align-items-center'>
            <div className='bg-secondary w-100 mb-3 text-center text-white'>Screen</div>
            <div className='hall-grid' id="hall" onClick={handlePurchase}></div>
            <input type='text' name='price' placeholder='price' value={price} onChange={(e)=>setPrice(e.target.value)}
              className='form-control w-25 mt-3 mb-3'></input>
            <button className='btn btn-warning w-25 mb-3' onClick={buyTicket}>Buy</button>
            <a className='btn text-info w-50 mb-3' onClick={() => {setAct("List")}}>&larr; Back to movies</a>
          </div>
          
          <div className='col-md-6 col-lg-6 mt-3'>
              <Zoom>
                <img className='img-rounded img-thumbnail' src={props.image} height='600px' alt='Picture'/>
              </Zoom>
          </div>

        </div>
      }
      {
        act === "List" && <List/>
      }  
    </div>
  )
} 