var Koa = require('koa');
var Router = require('koa-router');
var log    = console.log; 
var app = new Koa();
var router = new Router();
var multiline = require('multiline');
var views = require('koa-views');
var path = require('path');
var mongo = require('koa-mongo');
var koaBody = require('koa-body');

 

app
  .use(views(path.join(__dirname, 'views'), { extension: 'ejs' }))
  .use(mongo({
  host: 'localhost',
  port: 27017,
  db: 'test',
  max: 100,
  min: 1,
  timeout: 30000,
  log: false}))
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  


router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };
  // var userData = await ctx.mongo.db('test').collection('user').findOne();
  // console.log(userData)
  await ctx.render('index', {});
})
router.get('/signup', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };
  // var userData = await ctx.mongo.db('test').collection('user').findOne();
  // console.log(userData)


  await ctx.render('signup', {});
})
router.post('/signin', async function (ctx, next) {
    var userData = ctx.request.body;
  log('result userData : '+userData.Email);

   if(userData.Email !== '' && userData.Password !==''){
      var blnresult = JSON.parse(await ctx.mongo.db('test').collection('users').count(userData));
      log('result : ' + blnresult);
      if(blnresult){
        await ctx.render('profile', {}); 
      }
      else{
       await ctx.render('signin', {}); 
      }
      

   }
   else{
     ctx.body ='Please Enter Email and Password..'
   }
})
router.get('/signin', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };
   
   await ctx.render('signin', {}); 
   
  
})

router.post('/profile', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };
  
 await ctx.render('profile', {});
})


var port = process.env.PORT || 3000,
    host = process.env.HOST || 'http://localhost';

app.listen(port)

log('Visit %s:%s/ in browser.', host, port);