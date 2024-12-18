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
});
