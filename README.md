# Book API — Postman Testing Guide

Base URL: `http://localhost:4000`

## Routes / Endpoints Tested

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root route — confirms the API is running |
| GET | `/health` | Health check route |
| GET | `/api/books` | Fetch all books |
| GET | `/api/books/:id` | Fetch a single book by id |
| POST | `/api/books` | Add a new book to the in-memory array |

## Sample Request Bodies (POST `/api/books`)

Set Postman body to **raw → JSON** for each of these.

**1.**
{
  "title": "Dune",
  "author": "Frank Herbert",
  "genre": "Sci-Fi",
  "condition": "New",
  "description": "Epic saga of politics and survival on a desert planet."
}

**2.**
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "condition": "Used",
  "description": "A chilling vision of a totalitarian surveillance state."
}

**3.**
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "condition": "New",
  "description": "A reluctant hobbit journeys to reclaim a mountain kingdom."
}

**4.**
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic",
  "condition": "Used",
  "description": "A tragic tale of wealth and obsession in the Jazz Age."
}

## Input Validation Tests (POST `/api/books`)

| Test Case | Sample Body | Expected Response |
|-----------|-------------|-------------------|
| Missing fields | `{}` | `400` — `All fields are required` |
| Title too short | `{ "title": "A", "author": "Some Author", "genre": "Fiction", "condition": "New", "description": "A valid description here." }` | `400` — `Title must be between 2 and 60 characters` |
| Invalid condition | `{ "title": "Valid Title", "author": "Some Author", "genre": "Fiction", "condition": "Broken", "description": "A valid description here." }` | `400` — `Condition must be New, Used, or Refurbished` |
| Description too short | `{ "title": "Valid Title", "author": "Some Author", "genre": "Fiction", "condition": "New", "description": "Hi" }` | `400` — `Description must be between 5 and 250 characters` |


## Other Routes Tested

| Test Case | Endpoint | Expected Response |
|-----------|----------|-------------------|
| Fetch existing book | `GET /api/books/b1` | `200` — book data |
| Fetch non-existent book | `GET /api/books/ids` | `404` — `Book not found` |
| Undefined route | `GET /api/giberish` | `404` — `Route not found` |
