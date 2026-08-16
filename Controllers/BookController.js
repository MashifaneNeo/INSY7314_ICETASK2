const books = [
  {
    id: 'b1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    condition: 'New',
    description: 'A novel about all the choices that go into a life well lived.'
  },
  {
    id: 'b2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    condition: 'Used',
    description: 'An easy and proven way to build good habits and break bad ones.'
  }
];

const getAllBooks = (req, res) => {
  const safeBooks = books.map(({ id, title, author, genre, condition }) => ({
    id,
    title,
    author,
    genre,
    condition
  }));

  res.status(200).json({
    count: safeBooks.length,
    data: safeBooks
  });
};

const getBookById = (req, res) => {
  const { id } = req.params;

  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid book ID format' });
  }

  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(200).json({ data: book });
};

const createBook = (req, res) => {
  const { title, author, genre, condition, description } = req.body;

  const newBook = {
    id: `b${books.length + 1}`,
    title,
    author,
    genre,
    condition,
    description
  };

  books.push(newBook);

  res.status(201).json({
    message: 'Book created',
    data: newBook
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook
};