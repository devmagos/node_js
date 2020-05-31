const request = require('supertest');
const { app } = require('./../app');
const { Task } = require('./../models/task');

describe('Todo CRUD API', () => {
    test('No test yet', async () => {
        expect(true).toBe(true);
    })
    test('Read Todos', async () => {
        const response = await request(app).get('/todo/all');
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(Array.isArray(response.body)).toBe(true);
        expect(typeof response.body[0]).toBe('object');
        return;
    })  
    test('Get one Todo', async () => {
        const todo = await Task.findOne();
        if(!todo) {
            return;
        }
        const response = await request(app).get(`/todo/one?id=${todo.id}`);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(todo.name).toStrictEqual(response.body.name);
        expect(String(todo._id)).toStrictEqual(response.body._id);
});
test('Get Non Existing Todo', async () => {
    const id = '5ebc16d9c570f81367d279cf';
    const response = await request(app).get(`/todo/one?id=${id}`);
    expect(response.status).toBe(404);
  });
  test('Post Todo', async () => {
    const now = Date.now();  
    const data = {
          name: `My Test Todo Created ${now}`
      };
      const response = await request(app).post('/todo/create').send(data);
      const todo = await Task.findOne({ name: data.name });
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
      expect(todo.name).toStrictEqual(response.body.name);
      expect(todo.name).toStrictEqual(data.name);
      await todo.remove();
  })
  // Write test for update and deleting todo
  
  test('Update Todo', async ()=>{

    const data = {
      name: `Training commences`,
      done:true
    };

    const Todo = await Task.findOne();
    if(!Todo){
      return;
    }
    const response = await request(app).patch(`/todo/update/${Todo.id}`).send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    const UpdateTodo = await Task.findOne({name: data.name});
    expect(UpdateTodo.name).toStrictEqual(data.name);
    expect(UpdateTodo.done).toStrictEqual(data.done);  
    expect(String(Todo._id)).toStrictEqual(UpdateTodo.id); 
    
  })
 //  check delete complete to done
 test('Delete a Todo', async ()=>{


  const Todo = new Task({
    name: "Training commences",
    id: "ebc1706c570f81367d279d1",
    done: true
  }) 
  await Todo.save()
  const response = await request(app).delete(`/todo/delete/${Todo.id}`);
  expect(response.status).toBe(200);
  expect(response.body._id).toStrictEqual(Todo.id)
  const DeleteTodo = await Task.findOne({name: Todo.name, id: Todo.id}); 
  expect(DeleteTodo).toStrictEqual(null);
  
  
})
})