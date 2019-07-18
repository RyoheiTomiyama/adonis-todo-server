'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Database = use('Database')
const Todo = use('App/Models/Todo')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/hoge', 'HogeController.index')

Route.get('/db', async () => {
  return await Database.table('users').select('*')
})

Route.get('/todo/add', async () => {
  const todo = new Todo()
  todo.title = '6つ目のTODOアイテム'
  await todo.save()
  return todo
})

Route.get('/todo', async ({ request }) => {
  // let query = Todo.query()
  // const { q } = request.get()
  // if (q) {
  //   query.where('title', 'like', `%${q}%`)
  // }
  // return await query.fetch()
const query = Todo.query()
query.offset(2).limit(2)
const todos = await query.fetch()
console.log(todos.toJSON())

  return true
})

Route.get('/todo/:id', async ({ params }) => {
  const { id } = params;
  await Todo.find(id)
  const todo = await Todo.find(id)
  todo.done = true
  return await todo.save()
  // return await Todo.find(id)
})

Route.get('/todo/:id/delete', async ({ params }) => {
  const { id } = params;
  const todo = await Todo.find(id)
  return await todo.delete()
})

