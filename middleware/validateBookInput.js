const allowedConditions = ['New', 'Used', 'Refurbished'];

const validateBookInput = (req, res, next) => {
  const { title, author, genre, condition, description } = req.body;

  if (!title || !author || !genre || !condition || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (
    typeof title !== 'string' ||
    typeof author !== 'string' ||
    typeof genre !== 'string' ||
    typeof condition !== 'string' ||
    typeof description !== 'string'
  ) {
    return res.status(400).json({ error: 'All fields must be text values' });
  }

  const trimmedTitle = title.trim();
  const trimmedAuthor = author.trim();
  const trimmedGenre = genre.trim();
  const trimmedCondition = condition.trim();
  const trimmedDescription = description.trim();

  if (trimmedTitle.length < 2 || trimmedTitle.length > 60) {
    return res.status(400).json({ error: 'Title must be between 2 and 60 characters' });
  }

  if (trimmedAuthor.length < 2 || trimmedAuthor.length > 60) {
    return res.status(400).json({ error: 'Author must be between 2 and 60 characters' });
  }

  if (trimmedGenre.length < 2 || trimmedGenre.length > 40) {
    return res.status(400).json({ error: 'Genre must be between 2 and 40 characters' });
  }

  if (!allowedConditions.includes(trimmedCondition)) {
    return res.status(400).json({ error: 'Condition must be New, Used, or Refurbished' });
  }

  if (trimmedDescription.length < 5 || trimmedDescription.length > 250) {
    return res.status(400).json({ error: 'Description must be between 5 and 250 characters' });
  }

  req.body = {
    title: trimmedTitle,
    author: trimmedAuthor,
    genre: trimmedGenre,
    condition: trimmedCondition,
    description: trimmedDescription
  };

  next();
};

module.exports = validateBookInput;