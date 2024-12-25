describe('EmployeeController - Tests with Mocked Classes', () => {
  const mockGetAll = jest.fn();
  const mockGetDepartments = jest.fn();

  // Створюємо мок для контролера
  EmployeeController.getAll = mockGetAll;
  EmployeeController.getDepartments = mockGetDepartments;

  const mockRequest = () => {
    const req = {} as Request;
    req.query = {};
    req.params = {};
    req.body = {};
    return req;
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should return all employees', async () => {
    // Метод, що повертає всіх співробітників
    // Тестові дані: Масив співробітників з полями, такими як ім’я, посада, департамент
    mockGetAll.mockResolvedValue([{ _id: '1', name: 'John Doe', position: 'Engineer' }]);
    const req = mockRequest();
    const res = mockResponse();
    await EmployeeController.getAll(req, res, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it('should return distinct departments', async () => {
    // Метод, що повертає унікальні департаменти
    // Тестові дані: Масив департаментів
    mockGetDepartments.mockResolvedValue(['Development', 'HR']);
    const req = mockRequest();
    const res = mockResponse();
    await EmployeeController.getDepartments(req, res, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });
});
