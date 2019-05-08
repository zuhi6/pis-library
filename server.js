const express = require('express');
const cors = require('cors');
const soap = require('soap');
const bodyParser = require('body-parser');
const axios = require('axios');
const convert = require('xml-js');


const app = express();

// Allow cross-origin
app.use(cors());
app.use(bodyParser.json())



app.use(express.static('public'));


app.post('/login', (req, res) => {
  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Users?WSDL', function(err, client) {
    client.getAll(function(err, result) {
      result = result.userss.user.filter(item => {
       return item.email == req.body.email && item.password == req.body.password
      });
      result == 0 ? res.send(403) : res.send(result)
    });
  });
});

app.post('/changeRequest', (req, res) => {
  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Change_request?WSDL', function(err, client) {
    client.insert({team_id:'044',team_password:'PBpRzN',Change_request:{
      name: req.body.book.name,
      user_id: req.body.userId,
      book_id: req.body.book.id,
      year: req.body.book.year,
      isbn: req.body.book.isbn,
      language: req.body.book.language,
      pages: req.body.book.pages,
      description: req.body.book.description,
      status: "Pending",
      additional_info: req.body.book.additional_info
    }},function(err,result){
      res.send(201);
    })
    
  })
});
app.post('/updatebook', (req, res) => {

  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Books?WSDL', function(err, client) {
    const book = {
      name: req.body.changerequest.name,
      year: req.body.changerequest.year,
      isbn: req.body.changerequest.isbn,
      language: req.body.changerequest.language,
      pages: req.body.changerequest.pages,
      description: req.body.changerequest.description
    }
    client.update({team_id: '044', team_password:'PBpRzN', entity_id:req.body.book_id, Books: book}, function(err, result){
      res.send(result)
    })
  })
});
app.get('/books', (req, res) => { 
  
  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Books?WSDL', function(err, client) {
    client.getAll(function(err, result) {
      res.send(result.bookss.book);
    });
  });
});

app.get('/changerequests',(req,res) => {
  
  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Change_request?WSDL', function(err,client) {

    client.getAll(function(err, result) {
      result.change_requests ? res.send(result.change_requests.change_request) : res.sendStatus(204)
      
    })
  })
})
app.post('/mychangerequests',(req,res) => {
  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Change_request?WSDL', function(err,client) {

    client.getAll(function(err, result) {
      result = result.change_requests ? result.change_requests.change_request : res.sendStatus(204);
      res.send(result.filter(changerequest => {
        return changerequest.user_id == req.body.user_id;
      }));
    })
  })
})

app.post('/deletechangerequest',(req,res) => { 

  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Change_request?WSDL', function(err,client) {
    client.delete({team_id:'044',team_password:'PBpRzN',entity_id:req.body.cr_id}, function(err, result){
      res.send(result);
    })
  })

})
app.post('/updateuserpoints', (req, res) => {

  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Users?WSDL', function(err,client) {
    client.getAll(function(err, result){
      user = result.userss.user.find(user => {
        return user.id == req.body.user_id
      })
      client.update({team_id:'044',team_password:'PBpRzN',entity_id:req.body.user_id, Users:{
        points: +user.points + +req.body.points
      }}, function(err, result){
        res.send(result);
      })
    })
    
  })
})
app.post('/forgottenpassword', (req, res) => {
  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/NotificationServices/Email?WSDL', function(err,client) {
    client.notify({team_id:'044',password:'PBpRzN',email:req.body.email,subject:'forgotten email',message:'You have forgotten your password'},function(err, result){
      res.send(result);
    })
  })
})

app.post('/changerequestdetail',(req,res) => {

  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Change_request?WSDL', function(err,client) {
    client.getById({id: req.body.changerequest_id}, function(err, result) {
      res.send(result.change_request);
    })
  })

})

app.post('/updatechangerequest',(req,res) => {

  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Change_request?WSDL', function(err,client) {
    
    client.update({team_id: '044', team_password:'PBpRzN', entity_id:req.body.changerequest_id, Change_request:req.body.changerequest},function(err,result) {
      res.send(result);
    })
  })
})

app.post('/author', (req, res) => {
  let entries;
  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Book_Author?WSDL', function(err, client) {
    client.getAll(function(err, result) {
      entries = result.book_authors.book_author.filter(item => {
        return item.book_id == req.body.book_id;
      }).map(item => item.author_id);
      soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Author?WSDL', function(err, client) {
        client.getAll(function(err, result) {
            res.send(result.authors.author.filter(item => {
              return entries.includes(item.id);
            }));
        })
      });
      })
  })
   
  
});

app.post('/book', (req, res) => {
 
  soap.createClient('http://labss2.fiit.stuba.sk/pis/ws/Students/Team044Books?WSDL', function(err, client) {
    client.getById({id : req.body.book_id},function(err, result) {
      res.send(result);
    });
  });
})

app.post('/getgoodreadrating', (req, res) => {
  
  axios.get(req.body.url).then(data => {
    result = convert.xml2js(data.data , {compact: true, spaces: 0})
    res.send(result.GoodreadsResponse.book.average_rating._text);
  })
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
