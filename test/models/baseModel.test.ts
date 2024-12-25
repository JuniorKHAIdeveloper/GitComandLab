describe('BaseModel - Tests with Mocked Classes', () => {
  const mockCreate = jest.fn();
  const mockFindById = jest.fn();
  const mockFind = jest.fn();
  const mockFindByIdAndUpdate = jest.fn();
  const mockFindByIdAndDelete = jest.fn();
  const mockDistinct = jest.fn();

  const mockModel = {
    create: mockCreate,
    findById: mockFindById,
    find: mockFind,
    findByIdAndUpdate: mockFindByIdAndUpdate,
    findByIdAndDelete: mockFindByIdAndDelete,
    distinct: mockDistinct,
  };

  const baseModel = new BaseModel(mockModel as unknown as Model<any>);

  it('should create a document', async () => {
    // Метод для створення документа
    // Тестові дані: Об’єкт, який містить дані для створення нового документа
    mockCreate.mockResolvedValue({ _id: '123', name: 'Test Document' });
    const result = await baseModel.create({ name: 'Test Document' });
    expect(result).toBeDefined();
  });

  it('should find a document by ID', async () => {
    // Метод для пошуку документа за ID
    // Тестові дані: ID документа
    mockFindById.mockResolvedValue({ _id: '123', name: 'Found Document' });
    const result = await baseModel.findById('123');
    expect(result).toBeDefined();
  });

  it('should return all documents', async () => {
    // Метод, що повертає всі документи
    // Тестові дані: Масив документів
    mockFind.mockResolvedValue([
      { _id: '1', name: 'Doc 1' },
      { _id: '2', name: 'Doc 2' },
    ]);
    const result = await baseModel.find({});
    expect(result).toBeDefined();
  });

  it('should update a document by ID', async () => {
    // Метод для оновлення документа за ID
    // Тестові дані: ID документа та нові дані для оновлення
    mockFindByIdAndUpdate.mockResolvedValue({ _id: '123', name: 'Updated Name' });
    const result = await baseModel.updateById('123', { name: 'Updated Name' });
    expect(result).toBeDefined();
  });

  it('should delete a document by ID', async () => {
    // Метод для видалення документа за ID
    // Тестові дані: ID документа
    mockFindByIdAndDelete.mockResolvedValue({ _id: '123', name: 'Deleted Document' });
    const result = await baseModel.deleteById('123');
    expect(result).toBeDefined();
  });

  it('should return distinct values', async () => {
    // Метод для отримання унікальних значень
    // Тестові дані: Поле для пошуку унікальних значень
    mockDistinct.mockResolvedValue(['Value 1', 'Value 2']);
    const result = await baseModel.getDistinct('name');
    expect(result).toBeDefined();
  });
});
