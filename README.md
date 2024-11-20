
# API Documentation

This API provides a simple way to manage books. It includes endpoints for creating, retrieving, updating, and deleting books.

## Base URL
```
http://localhost:3000/api/books
```

## Endpoints

### 1. **Create a Book**
- **URL**: `/`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "title": "Book Title",
        "author": "Author Name",
        "published_at": "2024-01-01"
    }
    ```
- **Response**:
    - **201 Created**:
        ```json
        {
            "message": "Book created successfully",
            "data": {
                "id": 1,
                "title": "Book Title",
                "author": "Author Name",
                "published_at": "2024-01-01",
                "created_at": "2024-11-20T10:00:00.000Z",
                "updated_at": "2024-11-20T10:00:00.000Z"
            }
        }
        ```
    - **400 Bad Request**: Invalid request data.

### 2. **Get All Books**
- **URL**: `/`
- **Method**: `GET`
- **Response**:
    - **200 OK**:
        ```json
        {
            "data": [
                {
                    "id": 1,
                    "title": "Book Title",
                    "author": "Author Name",
                    "published_at": "2024-01-01",
                    "created_at": "2024-11-20T10:00:00.000Z",
                    "updated_at": "2024-11-20T10:00:00.000Z"
                }
            ]
        }
        ```

### 3. **Get a Book by ID**
- **URL**: `/:id`
- **Method**: `GET`
- **Response**:
    - **200 OK**:
        ```json
        {
            "id": 1,
            "title": "Book Title",
            "author": "Author Name",
            "published_at": "2024-01-01",
            "created_at": "2024-11-20T10:00:00.000Z",
            "updated_at": "2024-11-20T10:00:00.000Z"
        }
        ```
    - **404 Not Found**: Book not found.

### 4. **Update a Book**
- **URL**: `/:id`
- **Method**: `PUT`
- **Request Body**:
    ```json
    {
        "title": "Updated Title",
        "author": "Updated Author",
        "published_at": "2024-01-02"
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Book updated successfully",
            "data": {
                "id": 1,
                "title": "Updated Title",
                "author": "Updated Author",
                "published_at": "2024-01-02",
                "created_at": "2024-11-20T10:00:00.000Z",
                "updated_at": "2024-11-20T12:00:00.000Z"
            }
        }
        ```
    - **404 Not Found**: Book not found.

### 5. **Delete a Book**
- **URL**: `/:id`
- **Method**: `DELETE`
- **Response**:
    - **200 OK**:
        ```json
        {
            "message": "Book deleted successfully"
        }
        ```
    - **404 Not Found**: Book not found.

## Error Handling
- **500 Internal Server Error**: If something goes wrong on the server.
- **400 Bad Request**: If the request is invalid.

## Database Schema
The API uses MongoDB to store book data. Below is the schema definition:

| Field         | Type    | Required | Description                    |
|---------------|---------|----------|--------------------------------|
| id            | Number  | Yes      | Unique identifier for the book |
| title         | String  | Yes      | Title of the book              |
| author        | String  | Yes      | Author of the book             |
| published_at  | String  | Yes      | Publication date of the book   |
| created_at    | Date    | Auto     | Timestamp when created         |
| updated_at    | Date    | Auto     | Timestamp when last updated    |

## Running the API
1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
    ```env
    PORT=3000
    MONGO_URI=<Your MongoDB connection string>
    ```
4. Start the server: `npm start`

## Example Request with cURL

### Create a Book
```bash
curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{
    "title": "Book Title",
    "author": "Author Name",
    "published_at": "2024-01-01"
}'
```

### Get All Books
```bash
curl -X GET http://localhost:3000/api/books
```

### Get a Book by ID
```bash
curl -X GET http://localhost:3000/api/books/1
```

### Update a Book
```bash
curl -X PUT http://localhost:3000/api/books/1 -H "Content-Type: application/json" -d '{
    "title": "Updated Title",
    "author": "Updated Author"
}'
```

### Delete a Book
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

---

## License
This project is licensed under the MIT License.
