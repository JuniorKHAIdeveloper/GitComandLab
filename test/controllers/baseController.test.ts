describe('BaseController - Tests with Mocked Classes', () => {
  // Моковані методи моделі для тестування контролера
  const mockCreate = jest.fn();
  const mockFind = jest.fn();
  const mockFindById = jest.fn();
  const mockFindByIdAndUpdate = jest.fn();
  const mockFindByIdAndDelete = jest.fn();

  const mockModel = {
    create: mockCreate,
    find: mockFind,
    findById: mockFindById,
    findByIdAndUpdate: mockFindByIdAndUpdate,
    findByIdAndDelete: mockFindByIdAndDelete,
  };

  const baseModel = new BaseModel(mockModel as any);
  const baseController = new BaseController(baseModel);

  const mockRequest = (): Partial<Request> => ({});
  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should get all items', async () => {
    // Метод, що повертає всі елементи
    // Тестові дані: Масив об’єктів
    mockFind.mockResolvedValue([
      { _id: '1', name: 'Item 1' },
      { _id: '2', name: 'Item 2' },
    ]);
    const req = mockRequest();
    const res = mockResponse();
    await baseController.getAll(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it('should create an item', async () => {
    // Метод, що створює елемент
    // Тестові дані: Об’єкт з полями, які передаються для створення
    mockCreate.mockResolvedValue({ _id: '123', name: 'New Item' });
    const req = mockRequest();
    req.body = { name: 'New Item' };
    const res = mockResponse();
    await baseController.create(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it('should get an item by ID', async () => {
    // Метод, що знаходить елемент за ID
    // Тестові дані: Ідентифікатор елемента
    mockFindById.mockResolvedValue({ _id: '123', name: 'Found Item' });
    const req = mockRequest();
    req.params = { id: '123' };
    const res = mockResponse();
    await baseController.getById(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it('should update an item by ID', async () => {
    // Метод, що оновлює елемент за ID
    // Тестові дані: Ідентифікатор елемента та нові дані для оновлення
    mockFindByIdAndUpdate.mockResolvedValue({ _id: '123', name: 'Updated Item' });
    const req = mockRequest();
    req.params = { id: '123' };
    req.body = { name: 'Updated Item' };
    const res = mockResponse();
    await baseController.updateById(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it('should delete an item by ID', async () => {
    // Метод, що видаляє елемент за ID
    // Тестові дані: Ідентифікатор елемента для видалення
    mockFindByIdAndDelete.mockResolvedValue({ _id: '123', name: 'Deleted Item' });
    const req = mockRequest();
    req.params = { id: '123' };
    const res = mockResponse();
    await baseController.deleteById(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });
});
