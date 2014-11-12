var superagent = require('superagent');
var expect = require('expect.js');
var prefix = require('superagent-prefix')('/static');
var id;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

describe('express rest api server', function(){

  it('post object', function(done){
    this.timeout(15000);

    superagent.post('http://localhost:3245/item/')
      .send(
        {"item":"do homework"})

     .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.body._id.length).to.eql(24)
        id = res.body._id
        done()
      })    
  })

  it('retrieves an object', function(done){
    this.timeout(15000);
    superagent.get('http://localhost:3245/item/'+id)
      .end(function(e, res){
        console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body[0]._id.length).to.eql(24)
        expect(res.body[0]._id).to.eql(id)        
        done()
      })
  })

  it('retrieves a collection', function(done){
    this.timeout(15000);

    superagent.get('http://localhost:3245/item/')
      .end(function(e, res){
        console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)        
        done()
      })
  })


  it('updates an object', function(done){
    this.timeout(15000);

    superagent.put('http://localhost:3245/item/'+id)
      .send(
			{"item":"workout at gym"}
        )
      .end(function(e, res){
        console.log(res.body)
        expect(typeof res.body).to.eql('object')
        done()
      })
  })

  it('checks an updated object', function(done){
    this.timeout(15000);

    superagent.get('http://localhost:3245/item/'+id)
      .end(function(e, res){
        console.log(res.body)
        expect(res.body[0]._id.length).to.eql(24)        
        expect(res.body[0]._id).to.eql(id)        
        expect(res.body[0].item).to.eql('workout at gym')        
        done()
      })
  })    

  it('removes an object', function(done){
    this.timeout(15000);

    superagent.del('http://localhost:3245/item/'+id)
      .end(function(e, res){
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        done()
      })
  })
        
})