describe('EmployeeModel - Tests with Mocked Classes', () => {
  const mockCreate = jest.fn();
  const mockFind = jest.fn();
  const mockGetDistinct = jest.fn();
  const mockUpdateById = jest.fn();
  const mockDeleteById = jest.fn();

  const mockModel = {
    create: mockCreate,
    find: mockFind,
    getDistinct: mockGetDistinct,
    updateById: mockUpdateById,
    deleteById: mockDeleteById,
  };

  const employeeModel = new EmployeeModel(mockModel);

  it('should create an employee', async () => {
    // Метод для створення співробітника
    // Тестові дані: Ім’я, посада, департамент, зарплата
    mockCreate.mockResolvedValue({ _id: '123', name: 'John Doe' });
    const result = await employeeModel.create({ name: 'John Doe', position: 'Engineer' });
    expect(result).toBeDefined();
  });

  it('should get employees by query', async () => {
    // Метод для отримання співробітників за запитом
    // Тестові дані: Запит на пошук співробітників за департаментом
    mockFind.mockResolvedValue([{ _id: '123', name: 'John Doe' }]);
    const result = await employeeModel.find({ department: 'Development' });
    expect(result).toBeDefined();
  });

  it('should return distinct departments', async () => {
    // Метод для отримання унікальних департаментів
    // Тестові дані: Масив унікальних департаментів
    mockGetDistinct.mockResolvedValue(['Development', 'HR']);
    const result = await employeeModel.getDistinct('department');
    expect(result).toBeDefined();
  });

  it('should update an employee by ID', async () => {
    // Метод для оновлення співробітника за ID
    // Тестові дані: ID співробітника та нові дані (наприклад, зарплата)
    mockUpdateById.mockResolvedValue({ _id: '123', salary: 5500 });
    const result = await employeeModel.updateById('123', { salary: 5500 });
    expect(result).toBeDefined();
  });

  it('should delete an employee by ID', async () => {
    // Метод для видалення співробітника за ID
    // Тестові дані: ID співробітника
    mockDeleteById.mockResolvedValue({ _id: '123', name: 'John Doe' });
    const result = await employeeModel.deleteById('123');
    expect(result).toBeDefined();
  });
});
