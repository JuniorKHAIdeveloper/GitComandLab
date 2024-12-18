import request from 'supertest';
import app from '../server/src/index';

describe('Employee API', () => {
  let employeeId: string;

  const testEmployee = {
    id: 123,
    name: 'John Doe',
    position: 'Librarian',
    department: 'Literature',
    salary: 4000,
  };

  it('should create a new employee', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send(testEmployee);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(testEmployee.name);
    employeeId = response.body._id;
  });

  it('should get all employees', async () => {
    const response = await request(app).get('/api/employees');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get an employee by ID', async () => {
    const response = await request(app).get(`/api/employees/${employeeId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', testEmployee.name);
  });

  it('should update an employee by ID', async () => {
    const updatedData = { salary: 4500 };
    const response = await request(app)
      .put(`/api/employees/${employeeId}`)
      .send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('salary', updatedData.salary);
  });

  it('should delete an employee by ID', async () => {
    const response = await request(app).delete(`/api/employees/${employeeId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Employee deleted');
  });
});
