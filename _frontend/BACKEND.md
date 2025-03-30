# Genderbase API Documentation

## Overview

This document outlines the API implementation for the Genderbase project, replacing the static HTML scaffolds with a dynamic backend. The API supports user authentication, question submission, conversation management, knowledge base articles, terminology guidance, and conversation summarization.

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Authentication](#1-authentication)
- [Questions](#2-questions)
- [Conversations](#3-conversations)
- [Knowledge Base](#4-knowledge-base)
- [Terminology](#5-terminology)
- [Answered Questions](#6-answered-questions)
- [Summarization](#7-summarization)
- [Integration Guide](#integration-guide)
- [Data Models](#data-models)
- [Security Considerations](#security-considerations)
- [Testing](#testing)
- [Deployment](#deployment)

## API Endpoints

### 1. Authentication

#### Login

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a responder and returns a JWT token
- **Request Body**:

  ```json
  {
    "email": "responder@example.com",
    "password": "securepassword"
  }
  ```

  - **Response**:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "responder@example.com",
      "role": "responder"
    }
  }
  ```

  - **Status Codes**:

  - `200 OK`: Successful login
  - `401 Unauthorized`: Invalid credentials
  - `500 Internal Server Error`: Server error

  #### Logout

  - **Endpoint**: `/api/auth/logout`
  - **Method**: `POST`
  - **Description**: Invalidates the current session
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Successful logout
  - `401 Unauthorized`: Invalid or expired token
  - `500 Internal Server Error`: Server error

  #### Verify Token

  - **Endpoint**: `/api/auth/verify`
  - **Method**: `GET`
  - **Description**: Verifies if the current token is valid
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "valid": true,
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "responder@example.com",
      "role": "responder"
    }
  }
  ```

  - **Status Codes**:

  - `200 OK`: Token is valid
  - `401 Unauthorized`: Invalid or expired token
  - `500 Internal Server Error`: Server error

  ### 2. Questions

  #### Submit Question

  - **Endpoint**: `/api/questions`
  - **Method**: `POST`
  - **Description**: Submits a new question from a user
  - **Request Body**:

  ```json
  {
    "name": "Anonymous",
    "email": "user@example.com",
    "question": "How do I respectfully ask someone about their pronouns?",
    "context": "I'm meeting a new colleague who has a gender-neutral name."
  }
  ```

  - **Response**:

  ```json
  {
    "id": "q123",
    "message": "Your question has been submitted successfully. We'll notify you when it's answered.",
    "timestamp": "2023-06-15T14:30:00Z"
  }
  ```

  - **Status Codes**:

  - `201 Created`: Question submitted successfully
  - `400 Bad Request`: Invalid request data
  - `500 Internal Server Error`: Server error

  #### Get Pending Questions

  - **Endpoint**: `/api/questions/pending`
  - **Method**: `GET`
  - **Description**: Retrieves all pending questions for responders
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "questions": [
      {
        "id": "q123",
        "name": "Anonymous",
        "email": "user@example.com",
        "question": "How do I respectfully ask someone about their pronouns?",
        "context": "I'm meeting a new colleague who has a gender-neutral name.",
        "timestamp": "2023-06-15T14:30:00Z",
        "status": "pending"
      },
      {
        "id": "q124",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "question": "What terms should I use when discussing gender identity?",
        "context": "I'm writing an article about gender diversity.",
        "timestamp": "2023-06-15T15:45:00Z",
        "status": "pending"
      }
    ],
    "total": 2
  }
  ```

  - **Status Codes**:

  - `200 OK`: Questions retrieved successfully
  - `401 Unauthorized`: Invalid or expired token
  - `500 Internal Server Error`: Server error

  #### Get Question by ID

  - **Endpoint**: `/api/questions/{id}`
  - **Method**: `GET`
  - **Description**: Retrieves a specific question by ID
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "id": "q123",
    "name": "Anonymous",
    "email": "user@example.com",
    "question": "How do I respectfully ask someone about their pronouns?",
    "context": "I'm meeting a new colleague who has a gender-neutral name.",
    "timestamp": "2023-06-15T14:30:00Z",
    "status": "pending"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Question retrieved successfully
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Question not found
  - `500 Internal Server Error`: Server error

  ### 3. Conversations

  #### Start Conversation

  - **Endpoint**: `/api/conversations`
  - **Method**: `POST`
  - **Description**: Starts a new conversation for a question
  - **Headers**: `Authorization: Bearer {token}`
  - **Request Body**:

  ```json
  {
    "questionId": "q123",
    "initialResponse": "Thank you for your question about asking someone about their pronouns. This is an important topic that requires sensitivity."
  }
  ```

  - **Response**:

  ```json
  {
    "id": "c456",
    "questionId": "q123",
    "messages": [
      {
        "id": "m789",
        "sender": "responder",
        "content": "Thank you for your question about asking someone about their pronouns. This is an important topic that requires sensitivity.",
        "timestamp": "2023-06-15T16:00:00Z"
      }
    ],
    "status": "active",
    "createdAt": "2023-06-15T16:00:00Z",
    "updatedAt": "2023-06-15T16:00:00Z"
  }
  ```

  - **Status Codes**:

  - `201 Created`: Conversation started successfully
  - `400 Bad Request`: Invalid request data
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Question not found
  - `500 Internal Server Error`: Server error

  #### Get Conversation

  - **Endpoint**: `/api/conversations/{id}`
  - **Method**: `GET`
  - **Description**: Retrieves a specific conversation by ID
  - **Headers**: `Authorization: Bearer {token}` (for responders)
  - **Response**:

  ```json
  {
    "id": "c456",
    "questionId": "q123",
    "question": {
      "id": "q123",
      "content": "How do I respectfully ask someone about their pronouns?",
      "context": "I'm meeting a new colleague who has a gender-neutral name."
    },
    "messages": [
      {
        "id": "m789",
        "sender": "responder",
        "content": "Thank you for your question about asking someone about their pronouns. This is an important topic that requires sensitivity.",
        "timestamp": "2023-06-15T16:00:00Z"
      },
      {
        "id": "m790",
        "sender": "user",
        "content": "Thank you for your response. Could you provide some specific phrases I could use?",
        "timestamp": "2023-06-15T16:15:00Z"
      }
    ],
    "status": "active",
    "createdAt": "2023-06-15T16:00:00Z",
    "updatedAt": "2023-06-15T16:15:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Conversation retrieved successfully
  - `401 Unauthorized`: Invalid or expired token (for responders)
  - `404 Not Found`: Conversation not found
  - `500 Internal Server Error`: Server error

  #### Send Message

  - **Endpoint**: `/api/conversations/{id}/messages`
  - **Method**: `POST`
  - **Description**: Sends a new message in a conversation
  - **Headers**: `Authorization: Bearer {token}` (for responders)
  - **Request Body**:

  ```json
  {
    "content": "A good approach is to introduce yourself with your own pronouns first, which creates an opening for others to share theirs if they wish.",
    "sender": "responder"
  }
  ```

  - **Response**:

  ```json
  {
    "id": "m791",
    "conversationId": "c456",
    "sender": "responder",
    "content": "A good approach is to introduce yourself with your own pronouns first, which creates an opening for others to share theirs if they wish.",
    "timestamp": "2023-06-15T16:30:00Z"
  }
  ```

  - **Status Codes**:

  - `201 Created`: Message sent successfully
  - `400 Bad Request`: Invalid request data
  - `401 Unauthorized`: Invalid or expired token (for responders)
  - `404 Not Found`: Conversation not found
  - `500 Internal Server Error`: Server error

  #### Close Conversation

  - **Endpoint**: `/api/conversations/{id}/close`
  - **Method**: `PUT`
  - **Description**: Closes a conversation
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "id": "c456",
    "status": "closed",
    "closedAt": "2023-06-15T17:00:00Z",
    "message": "Conversation closed successfully"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Conversation closed successfully
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Conversation not found
  - `500 Internal Server Error`: Server error

  ### 4. Knowledge Base

  #### Get Articles

  - **Endpoint**: `/api/knowledge-base`
  - **Method**: `GET`
  - **Description**: Retrieves all knowledge base articles
  - **Query Parameters**:

  - `category` (optional): Filter by category
  - `search` (optional): Search term
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of articles per page

  - **Response**:

  ```json
  {
    "articles": [
      {
        "id": "kb123",
        "title": "Understanding Gender Identity",
        "content": "Gender identity refers to a person's internal sense of their own gender...",
        "category": "Fundamentals",
        "tags": ["identity", "basics", "terminology"],
        "createdAt": "2023-05-10T09:00:00Z",
        "updatedAt": "2023-05-10T09:00:00Z"
      },
      {
        "id": "kb124",
        "title": "Respectful Communication",
        "content": "When communicating about gender, it's important to use language that...",
        "category": "Communication",
        "tags": ["language", "respect", "conversation"],
        "createdAt": "2023-05-12T11:30:00Z",
        "updatedAt": "2023-05-12T11:30:00Z"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
  ```

  - **Status Codes**:

  - `200 OK`: Articles retrieved successfully
  - `500 Internal Server Error`: Server error

  #### Get Article by ID

  - **Endpoint**: `/api/knowledge-base/{id}`
  - **Method**: `GET`
  - **Description**: Retrieves a specific knowledge base article by ID
  - **Response**:

  ```json
  {
    "id": "kb123",
    "title": "Understanding Gender Identity",
    "content": "Gender identity refers to a person's internal sense of their own gender...",
    "category": "Fundamentals",
    "tags": ["identity", "basics", "terminology"],
    "createdAt": "2023-05-10T09:00:00Z",
    "updatedAt": "2023-05-10T09:00:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Article retrieved successfully
  - `404 Not Found`: Article not found
  - `500 Internal Server Error`: Server error

  #### Create Article

  - **Endpoint**: `/api/knowledge-base`
  - **Method**: `POST`
  - **Description**: Creates a new knowledge base article
  - **Headers**: `Authorization: Bearer {token}`
  - **Request Body**:

  ```json
  {
    "title": "Gender-Inclusive Language in the Workplace",
    "content": "Creating an inclusive workplace environment includes using gender-inclusive language...",
    "category": "Workplace",
    "tags": ["workplace", "inclusion", "language"]
  }
  ```

  - **Response**:

  ```json
  {
    "id": "kb125",
    "title": "Gender-Inclusive Language in the Workplace",
    "content": "Creating an inclusive workplace environment includes using gender-inclusive language...",
    "category": "Workplace",
    "tags": ["workplace", "inclusion", "language"],
    "createdAt": "2023-06-15T18:00:00Z",
    "updatedAt": "2023-06-15T18:00:00Z"
  }
  ```

  - **Status Codes**:

  - `201 Created`: Article created successfully
  - `400 Bad Request`: Invalid request data
  - `401 Unauthorized`: Invalid or expired token
  - `500 Internal Server Error`: Server error

  #### Update Article

  - **Endpoint**: `/api/knowledge-base/{id}`
  - **Method**: `PUT`
  - **Description**: Updates an existing knowledge base article
  - **Headers**: `Authorization: Bearer {token}`
  - **Request Body**:

  ```json
  {
    "title": "Gender-Inclusive Language in Professional Settings",
    "content": "Updated content about gender-inclusive language in professional environments...",
    "category": "Workplace",
    "tags": ["workplace", "inclusion", "language", "professional"]
  }
  ```

  - **Response**:

  ```json
  {
    "id": "kb125",
    "title": "Gender-Inclusive Language in Professional Settings",
    "content": "Updated content about gender-inclusive language in professional environments...",
    "category": "Workplace",
    "tags": ["workplace", "inclusion", "language", "professional"],
    "createdAt": "2023-06-15T18:00:00Z",
    "updatedAt": "2023-06-15T18:30:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Article updated successfully
  - `400 Bad Request`: Invalid request data
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Article not found
  - `500 Internal Server Error`: Server error

  #### Delete Article

  - **Endpoint**: `/api/knowledge-base/{id}`
  - **Method**: `DELETE`
  - **Description**: Deletes a knowledge base article
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "message": "Article deleted successfully"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Article deleted successfully
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Article not found
  - `500 Internal Server Error`: Server error

  ### 5. Terminology

  #### Get Terminology Entries

  - **Endpoint**: `/api/terminology`
  - **Method**: `GET`
  - **Description**: Retrieves all terminology entries
  - **Query Parameters**:

  - `search` (optional): Search term
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of entries per page

  - **Response**:

  ```json
  {
    "entries": [
      {
        "id": "t123",
        "term": "Gender Identity",
        "definition": "A person's internal sense of their own gender, which may or may not match their assigned sex at birth.",
        "usage": "Respect each person's gender identity by using their preferred pronouns and terms.",
        "alternatives": ["Gender", "Gender Expression"],
        "createdAt": "2023-05-15T10:00:00Z",
        "updatedAt": "2023-05-15T10:00:00Z"
      },
      {
        "id": "t124",
        "term": "Cisgender",
        "definition": "A term for people whose gender identity matches their sex assigned at birth.",
        "usage": "Many people are cisgender, but it's important not to assume everyone is.",
        "alternatives": ["Cis"],
        "createdAt": "2023-05-15T10:15:00Z",
        "updatedAt": "2023-05-15T10:15:00Z"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
  ```

  - **Status Codes**:

  - `200 OK`: Entries retrieved successfully
  - `500 Internal Server Error`: Server error

  #### Get Terminology Entry by ID

  - **Endpoint**: `/api/terminology/{id}`
  - **Method**: `GET`
  - **Description**: Retrieves a specific terminology entry by ID
  - **Response**:

  ```json
  {
    "id": "t123",
    "term": "Gender Identity",
    "definition": "A person's internal sense of their own gender, which may or may not match their assigned sex at birth.",
    "usage": "Respect each person's gender identity by using their preferred pronouns and terms.",
    "alternatives": ["Gender", "Gender Expression"],
    "createdAt": "2023-05-15T10:00:00Z",
    "updatedAt": "2023-05-15T10:00:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Entry retrieved successfully
  - `404 Not Found`: Entry not found
  - `500 Internal Server Error`: Server error

  #### Create Terminology Entry

  - **Endpoint**: `/api/terminology`
  - **Method**: `POST`
  - **Description**: Creates a new terminology entry
  - **Headers**: `Authorization: Bearer {token}`
  - **Request Body**:

  ```json
  {
    "term": "Non-binary",
    "definition": "An umbrella term for gender identities that are not exclusively masculine or feminine.",
    "usage": "Some non-binary individuals use they/them pronouns, while others may use different pronouns.",
    "alternatives": ["Enby", "Genderqueer"]
  }
  ```

  - **Response**:

  ```json
  {
    "id": "t125",
    "term": "Non-binary",
    "definition": "An umbrella term for gender identities that are not exclusively masculine or feminine.",
    "usage": "Some non-binary individuals use they/them pronouns, while others may use different pronouns.",
    "alternatives": ["Enby", "Genderqueer"],
    "createdAt": "2023-06-15T19:00:00Z",
    "updatedAt": "2023-06-15T19:00:00Z"
  }
  ```

  - **Status Codes**:

  - `201 Created`: Entry created successfully
  - `400 Bad Request`: Invalid request data
  - `401 Unauthorized`: Invalid or expired token
  - `500 Internal Server Error`: Server error

  #### Update Terminology Entry

  - **Endpoint**: `/api/terminology/{id}`
  - **Method**: `PUT`
  - **Description**: Updates an existing terminology entry
  - **Headers**: `Authorization: Bearer {token}`
  - **Request Body**:

  ```json
  {
    "term": "Non-binary",
    "definition": "An umbrella term for gender identities that are not exclusively masculine or feminine and fall outside the gender binary.",
    "usage": "Some non-binary individuals use they/them pronouns, while others may use different pronouns or a combination of pronouns.",
    "alternatives": ["Enby", "Genderqueer", "Gender Non-conforming"]
  }
  ```

  - **Response**:

  ```json
  {
    "id": "t125",
    "term": "Non-binary",
    "definition": "An umbrella term for gender identities that are not exclusively masculine or feminine and fall outside the gender binary.",
    "usage": "Some non-binary individuals use they/them pronouns, while others may use different pronouns or a combination of pronouns.",
    "alternatives": ["Enby", "Genderqueer", "Gender Non-conforming"],
    "createdAt": "2023-06-15T19:00:00Z",
    "updatedAt": "2023-06-15T19:30:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Entry updated successfully
  - `400 Bad Request`: Invalid request data
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Entry not found
  - `500 Internal Server Error`: Server error

  #### Delete Terminology Entry

  - **Endpoint**: `/api/terminology/{id}`
  - **Method**: `DELETE`
  - **Description**: Deletes a terminology entry
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "message": "Terminology entry deleted successfully"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Entry deleted successfully
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Entry not found
  - `500 Internal Server Error`: Server error

  ### 6. Answered Questions

  #### Get Answered Questions

  - **Endpoint**: `/api/answered-questions`
  - **Method**: `GET`
  - **Description**: Retrieves all answered questions
  - **Query Parameters**:

  - `search` (optional): Search term
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of questions per page

  - **Response**:

  ```json
  {
    "questions": [
      {
        "id": "aq123",
        "question": "How do I respectfully ask someone about their pronouns?",
        "answer": "A good approach is to introduce yourself with your own pronouns first, which creates an opening for others to share theirs if they wish. For example, 'Hi, I'm Alex and I use they/them pronouns.' This normalizes the practice of sharing pronouns and makes it more comfortable for others to share theirs.",
        "tags": ["pronouns", "introduction", "respect"],
        "createdAt": "2023-06-01T14:00:00Z",
        "updatedAt": "2023-06-01T14:00:00Z"
      },
      {
        "id": "aq124",
        "question": "What's the difference between gender identity and gender expression?",
        "answer": "Gender identity is a person's internal sense of their own gender, while gender expression refers to how a person presents their gender externally through clothing, behavior, and personal appearance. Someone's gender expression may not always align with their gender identity, and both can be fluid and change over time.",
        "tags": ["identity", "expression", "basics"],
        "createdAt": "2023-06-02T15:30:00Z",
        "updatedAt": "2023-06-02T15:30:00Z"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
  ```

  - **Status Codes**:

  - `200 OK`: Questions retrieved successfully
  - `500 Internal Server Error`: Server error

  #### Get Answered Question by ID

  - **Endpoint**: `/api/answered-questions/{id}`
  - **Method**: `GET`
  - **Description**: Retrieves a specific answered question by ID
  - **Response**:

  ```json
  {
    "id": "aq123",
    "question": "How do I respectfully ask someone about their pronouns?",
    "answer": "A good approach is to introduce yourself with your own pronouns first, which creates an opening for others to share theirs if they wish. For example, 'Hi, I'm Alex and I use they/them pronouns.' This normalizes the practice of sharing pronouns and makes it more comfortable for others to share theirs.",
    "tags": ["pronouns", "introduction", "respect"],
    "createdAt": "2023-06-01T14:00:00Z",
    "updatedAt": "2023-06-01T14:00:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Question retrieved successfully
  - `404 Not Found`: Question not found
  - `500 Internal Server Error`: Server error

  #### Create Answered Question

  - **Endpoint**: `/api/answered-questions`
  - **Method**: `POST`
  - **Description**: Creates a new answered question
  - **Headers**: `Authorization: Bearer {token}`
  - **Request Body**:

  ```json
  {
    "question": "How can I make my workplace more inclusive for transgender employees?",
    "answer": "Creating an inclusive workplace for transgender employees involves several key steps: 1) Implement clear non-discrimination policies that explicitly include gender identity and expression. 2) Provide gender-neutral restroom options. 3) Use inclusive language in all communications. 4) Offer training on transgender awareness and inclusion. 5) Create a process for employees to update their names and pronouns in company systems. 6) Ensure health benefits cover transgender-related healthcare needs.",
    "tags": ["workplace", "inclusion", "transgender"]
  }
  ```

  - **Response**:

  ```json
  {
    "id": "aq125",
    "question": "How can I make my workplace more inclusive for transgender employees?",
    "answer": "Creating an inclusive workplace for transgender employees involves several key steps: 1) Implement clear non-discrimination policies that explicitly include gender identity and expression. 2) Provide gender-neutral restroom options. 3) Use inclusive language in all communications. 4) Offer training on transgender awareness and inclusion. 5) Create a process for employees to update their names and pronouns in company systems. 6) Ensure health benefits cover transgender-related healthcare needs.",
    "tags": ["workplace", "inclusion", "transgender"],
    "createdAt": "2023-06-15T20:00:00Z",
    "updatedAt": "2023-06-15T20:00:00Z"
  }
  ```

  - **Status Codes**:

  - `201 Created`: Question created successfully
  - `400 Bad Request`: Invalid request data
  - `401 Unauthorized`: Invalid or expired token
  - `500 Internal Server Error`: Server error

  #### Update Answered Question

  - **Endpoint**: `/api/answered-questions/{id}`
  - **Method**: `PUT`
  - **Description**: Updates an existing answered question
  - **Headers**: `Authorization: Bearer {token}`
  - **Request Body**:

  ```json
  {
    "question": "How can I make my workplace more inclusive for transgender employees?",
    "answer": "Updated answer with more comprehensive guidance on creating an inclusive workplace environment...",
    "tags": ["workplace", "inclusion", "transgender", "policy"]
  }
  ```

  - **Response**:

  ```json
  {
    "id": "aq125",
    "question": "How can I make my workplace more inclusive for transgender employees?",
    "answer": "Updated answer with more comprehensive guidance on creating an inclusive workplace environment...",
    "tags": ["workplace", "inclusion", "transgender", "policy"],
    "createdAt": "2023-06-15T20:00:00Z",
    "updatedAt": "2023-06-15T20:30:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Question updated successfully
  - `400 Bad Request`: Invalid request data
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Question not found
  - `500 Internal Server Error`: Server error

  #### Delete Answered Question

  - **Endpoint**: `/api/answered-questions/{id}`
  - **Method**: `DELETE`
  - **Description**: Deletes an answered question
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "message": "Answered question deleted successfully"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Question deleted successfully
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Question not found
  - `500 Internal Server Error`: Server error

  ### 7. Summarization

  #### Generate Summary

  - **Endpoint**: `/api/conversations/{id}/summarize`
  - **Method**: `POST`
  - **Description**: Generates a summary of a conversation
  - **Headers**: `Authorization: Bearer {token}`
  - **Request Body**:

  ```json
  {
    "includeContext": true,
    "format": "detailed"
  }
  ```

  - **Response**:

  ```json
  {
    "conversationId": "c456",
    "summary": "The user asked about respectfully inquiring about someone's pronouns. The responder advised introducing oneself with one's own pronouns first to normalize the practice, and provided specific examples of phrasing. The user asked for additional context-specific advice, and the responder provided guidance for workplace, social, and educational settings.",
    "keyPoints": [
      "Introduce yourself with your own pronouns first",
      "Normalize pronoun sharing in group settings",
      "Respect privacy if someone is uncomfortable sharing",
      "Different approaches for different contexts (workplace, social, educational)"
    ],
    "generatedAt": "2023-06-15T21:00:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Summary generated successfully
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Conversation not found
  - `500 Internal Server Error`: Server error

  #### Get Summary

  - **Endpoint**: `/api/conversations/{id}/summary`
  - **Method**: `GET`
  - **Description**: Retrieves the summary of a conversation
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**:

  ```json
  {
    "conversationId": "c456",
    "summary": "The user asked about respectfully inquiring about someone's pronouns. The responder advised introducing oneself with one's own pronouns first to normalize the practice, and provided specific examples of phrasing. The user asked for additional context-specific advice, and the responder provided guidance for workplace, social, and educational settings.",
    "keyPoints": [
      "Introduce yourself with your own pronouns first",
      "Normalize pronoun sharing in group settings",
      "Respect privacy if someone is uncomfortable sharing",
      "Different approaches for different contexts (workplace, social, educational)"
    ],
    "generatedAt": "2023-06-15T21:00:00Z"
  }
  ```

  - **Status Codes**:

  - `200 OK`: Summary retrieved successfully
  - `401 Unauthorized`: Invalid or expired token
  - `404 Not Found`: Conversation or summary not found
  - `500 Internal Invalid or expired token
  - `404 Not Found`: Conversation or summary not found
  - `500 Internal Server Error`: Server error

  ## Integration Guide

  ### Updating Stimulus Controllers

  The existing Stimulus controllers need to be updated to work with the new API endpoints. Here's how to update each controller:

  #### Authentication Controller

  ```javascript
  // controllers/authentication_controller.js
  import { Controller } from "@hotwired/stimulus";

  export default class extends Controller {
    static targets = ["form", "email", "password", "error"];

    async login(event) {
      event.preventDefault();

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.emailTarget.value,
            password: this.passwordTarget.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token in localStorage
          localStorage.setItem("genderbase_token", data.token);
          localStorage.setItem("genderbase_user", JSON.stringify(data.user));

          // Redirect to dashboard
          window.location.href = "/responder/dashboard.html";
        } else {
          this.errorTarget.textContent = data.message || "Invalid credentials";
          this.errorTarget.classList.remove("hidden");
        }
      } catch (error) {
        this.errorTarget.textContent = "An error occurred. Please try again.";
        this.errorTarget.classList.remove("hidden");
      }
    }

    logout() {
      localStorage.removeItem("genderbase_token");
      localStorage.removeItem("genderbase_user");
      window.location.href = "/responder/login.html";
    }
  }
  ```

  #### Question Controller

  ```javascript
  // controllers/question_controller.js
  import { Controller } from "@hotwired/stimulus";

  export default class extends Controller {
    static targets = [
      "form",
      "name",
      "email",
      "question",
      "context",
      "success",
      "error",
    ];

    async submit(event) {
      event.preventDefault();

      try {
        const response = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.nameTarget.value || "Anonymous",
            email: this.emailTarget.value,
            question: this.questionTarget.value,
            context: this.contextTarget.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          this.formTarget.reset();
          this.successTarget.textContent = data.message;
          this.successTarget.classList.remove("hidden");
          this.errorTarget.classList.add("hidden");
        } else {
          this.errorTarget.textContent =
            data.message || "Failed to submit question";
          this.errorTarget.classList.remove("hidden");
          this.successTarget.classList.add("hidden");
        }
      } catch (error) {
        this.errorTarget.textContent = "An error occurred. Please try again.";
        this.errorTarget.classList.remove("hidden");
        this.successTarget.classList.add("hidden");
      }
    }
  }
  ```

  #### Dashboard Controller

  ```javascript
  // controllers/dashboard_controller.js
  import { Controller } from "@hotwired/stimulus";

  export default class extends Controller {
    static targets = ["questionsList", "questionTemplate", "emptyState"];

    connect() {
      this.loadPendingQuestions();
    }

    async loadPendingQuestions() {
      try {
        const token = localStorage.getItem("genderbase_token");

        if (!token) {
          window.location.href = "/responder/login.html";
          return;
        }

        const response = await fetch("/api/questions/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("genderbase_token");
          localStorage.removeItem("genderbase_user");
          window.location.href = "/responder/login.html";
          return;
        }

        const data = await response.json();

        this.questionsListTarget.innerHTML = "";

        if (data.questions.length === 0) {
          this.emptyStateTarget.classList.remove("hidden");
          return;
        }

        this.emptyStateTarget.classList.add("hidden");

        data.questions.forEach((question) => {
          const clone = this.questionTemplateTarget.content.cloneNode(true);

          clone.querySelector(".question-id").textContent = question.id;
          clone.querySelector(".question-text").textContent = question.question;
          clone.querySelector(".question-context").textContent =
            question.context || "No context provided";
          clone.querySelector(".question-timestamp").textContent = new Date(
            question.timestamp,
          ).toLocaleString();
          clone.querySelector(".question-link").href =
            `/responder/conversation.html?id=${question.id}`;

          this.questionsListTarget.appendChild(clone);
        });
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    }
  }
  ```

  #### Conversation Controller

  ```javascript
  // controllers/conversation_controller.js
  import { Controller } from "@hotwired/stimulus";

  export default class extends Controller {
    static targets = [
      "questionText",
      "questionContext",
      "messagesList",
      "messageForm",
      "messageInput",
      "emptyState",
    ];

    connect() {
      this.questionId = new URLSearchParams(window.location.search).get("id");

      if (!this.questionId) {
        window.location.href = "/responder/dashboard.html";
        return;
      }

      this.loadQuestion();
      this.loadConversation();
    }

    async loadQuestion() {
      try {
        const token = localStorage.getItem("genderbase_token");

        if (!token) {
          window.location.href = "/responder/login.html";
          return;
        }

        const response = await fetch(`/api/questions/${this.questionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("genderbase_token");
          localStorage.removeItem("genderbase_user");
          window.location.href = "/responder/login.html";
          return;
        }

        const question = await response.json();

        this.questionTextTarget.textContent = question.question;
        this.questionContextTarget.textContent =
          question.context || "No context provided";
      } catch (error) {
        console.error("Error loading question:", error);
      }
    }

    async loadConversation() {
      try {
        const token = localStorage.getItem("genderbase_token");

        const response = await fetch(`/api/conversations/${this.questionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 404) {
          // No conversation yet, show form to start one
          this.emptyStateTarget.classList.remove("hidden");
          return;
        }

        const conversation = await response.json();

        this.conversationId = conversation.id;
        this.renderMessages(conversation.messages);

        if (conversation.status === "closed") {
          this.messageFormTarget.classList.add("hidden");
        } else {
          this.messageFormTarget.classList.remove("hidden");
        }
      } catch (error) {
        console.error("Error loading conversation:", error);
      }
    }

    renderMessages(messages) {
      this.messagesListTarget.innerHTML = "";

      messages.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add(
          "message",
          message.sender === "responder" ? "message-responder" : "message-user",
        );

        const contentElement = document.createElement("div");
        contentElement.classList.add("message-content");
        contentElement.textContent = message.content;

        const timestampElement = document.createElement("div");
        timestampElement.classList.add("message-timestamp");
        timestampElement.textContent = new Date(
          message.timestamp,
        ).toLocaleString();

        messageElement.appendChild(contentElement);
        messageElement.appendChild(timestampElement);

        this.messagesListTarget.appendChild(messageElement);
      });

      // Scroll to bottom
      this.messagesListTarget.scrollTop = this.messagesListTarget.scrollHeight;
    }

    async startConversation(event) {
      event.preventDefault();

      const initialResponse = this.messageInputTarget.value.trim();

      if (!initialResponse) return;

      try {
        const token = localStorage.getItem("genderbase_token");

        const response = await fetch("/api/conversations", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: this.questionId,
            initialResponse,
          }),
        });

        const conversation = await response.json();

        this.conversationId = conversation.id;
        this.renderMessages(conversation.messages);

        this.emptyStateTarget.classList.add("hidden");
        this.messageFormTarget.classList.remove("hidden");
        this.messageInputTarget.value = "";
      } catch (error) {
        console.error("Error starting conversation:", error);
      }
    }

    async sendMessage(event) {
      event.preventDefault();

      const content = this.messageInputTarget.value.trim();

      if (!content) return;

      try {
        const token = localStorage.getItem("genderbase_token");

        const response = await fetch(
          `/api/conversations/${this.conversationId}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content,
              sender: "responder",
            }),
          },
        );

        const message = await response.json();

        // Add the new message to the list
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "message-responder");

        const contentElement = document.createElement("div");
        contentElement.classList.add("message-content");
        contentElement.textContent = message.content;

        const timestampElement = document.createElement("div");
        timestampElement.classList.add("message-timestamp");
        timestampElement.textContent = new Date(
          message.timestamp,
        ).toLocaleString();

        messageElement.appendChild(contentElement);
        messageElement.appendChild(timestampElement);

        this.messagesListTarget.appendChild(messageElement);

        // Clear input and scroll to bottom
        this.messageInputTarget.value = "";
        this.messagesListTarget.scrollTop =
          this.messagesListTarget.scrollHeight;
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    async closeConversation() {
      if (!confirm("Are you sure you want to close this conversation?")) return;

      try {
        const token = localStorage.getItem("genderbase_token");

        const response = await fetch(
          `/api/conversations/${this.conversationId}/close`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          this.messageFormTarget.classList.add("hidden");
          alert("Conversation closed successfully");
        }
      } catch (error) {
        console.error("Error closing conversation:", error);
      }
    }
  }
  ```

  #### Knowledge Base Controller

  ```javascript
  // controllers/knowledge_base_controller.js
  import { Controller } from "@hotwired/stimulus";

  export default class extends Controller {
    static targets = [
      "articlesList",
      "articleTemplate",
      "searchInput",
      "categoryFilter",
    ];

    connect() {
      this.loadArticles();
    }

    async loadArticles() {
      try {
        const searchTerm = this.searchInputTarget.value;
        const category = this.categoryFilterTarget.value;

        let url = "/api/knowledge-base";
        const params = new URLSearchParams();

        if (searchTerm) {
          params.append("search", searchTerm);
        }

        if (category) {
          params.append("category", category);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        this.articlesListTarget.innerHTML = "";

        data.articles.forEach((article) => {
          const clone = this.articleTemplateTarget.content.cloneNode(true);

          clone.querySelector(".article-title").textContent = article.title;
          clone.querySelector(".article-content").textContent = article.content;
          clone.querySelector(".article-category").textContent =
            article.category;
          clone.querySelector(".article-link").href =
            `/knowledge-base.html?id=${article.id}`;

          const tagsContainer = clone.querySelector(".article-tags");
          article.tags.forEach((tag) => {
            const tagElement = document.createElement("span");
            tagElement.classList.add("tag");
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
          });

          this.articlesListTarget.appendChild(clone);
        });
      } catch (error) {
        console.error("Error loading articles:", error);
      }
    }

    search() {
      this.loadArticles();
    }

    filterByCategory() {
      this.loadArticles();
    }
  }
  ```

  #### Terminology Controller

  ```javascript
  // controllers/terminology_controller.js
  import { Controller } from "@hotwired/stimulus";

  export default class extends Controller {
    static targets = ["entriesList", "entryTemplate", "searchInput"];

    connect() {
      this.loadEntries();
    }

    async loadEntries() {
      try {
        const searchTerm = this.searchInputTarget.value;

        let url = "/api/terminology";

        if (searchTerm) {
          url += `?search=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        this.entriesListTarget.innerHTML = "";

        data.entries.forEach((entry) => {
          const clone = this.entryTemplateTarget.content.cloneNode(true);

          clone.querySelector(".term").textContent = entry.term;
          clone.querySelector(".definition").textContent = entry.definition;
          clone.querySelector(".usage").textContent = entry.usage;

          const alternativesContainer = clone.querySelector(".alternatives");
          entry.alternatives.forEach((alt) => {
            const altElement = document.createElement("span");
            altElement.classList.add("alternative");
            altElement.textContent = alt;
            alternativesContainer.appendChild(altElement);
          });

          this.entriesListTarget.appendChild(clone);
        });
      } catch (error) {
        console.error("Error loading terminology entries:", error);
      }
    }

    search() {
      this.loadEntries();
    }
  }
  ```

  #### Summarization Controller

  ```javascript
  // controllers/summarization_controller.js
  import { Controller } from "@hotwired/stimulus";

  export default class extends Controller {
    static targets = [
      "form",
      "conversationId",
      "includeContext",
      "format",
      "summary",
      "keyPoints",
      "error",
    ];

    async generateSummary(event) {
      event.preventDefault();

      try {
        const token = localStorage.getItem("genderbase_token");

        if (!token) {
          window.location.href = "/responder/login.html";
          return;
        }

        const conversationId = this.conversationIdTarget.value;

        const response = await fetch(
          `/api/conversations/${conversationId}/summarize`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              includeContext: this.includeContextTarget.checked,
              format: this.formatTarget.value,
            }),
          },
        );

        if (response.status === 401) {
          localStorage.removeItem("genderbase_token");
          localStorage.removeItem("genderbase_user");
          window.location.href = "/responder/login.html";
          return;
        }

        const data = await response.json();

        this.summaryTarget.textContent = data.summary;

        this.keyPointsTarget.innerHTML = "";
        data.keyPoints.forEach((point) => {
          const li = document.createElement("li");
          li.textContent = point;
          this.keyPointsTarget.appendChild(li);
        });

        this.errorTarget.classList.add("hidden");
      } catch (error) {
        this.errorTarget.textContent = "An error occurred. Please try again.";
        this.errorTarget.classList.remove("hidden");
      }
    }
  }
  ```

  ### Adding Authentication Middleware

  Create a middleware function to check for authentication on protected routes:

  ```javascript
  // middleware/auth.js
  export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify token (implementation depends on your JWT library)
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
  ```

  ### Updating HTML Pages

  The HTML pages need to be updated to work with the dynamic data from the API. Here's how to update each page:

  #### Login Page

  ```html
  &lt;!-- responder/login.html -->
  <div data-controller="authentication">
    <form
      data-action="submit->authentication#login"
      data-authentication-target="form"
    >
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          type="email"
          id="email"
          data-authentication-target="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          type="password"
          id="password"
          data-authentication-target="password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div
        data-authentication-target="error"
        class="text-red-500 mb-4 hidden"
      ></div>
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Log in
      </button>
    </form>
  </div>
  ```

  #### Dashboard Page

  ```html
  &lt;!-- responder/dashboard.html -->
  <div data-controller="dashboard">
    <h1 class="text-2xl font-bold mb-4">Pending Questions</h1>

    <div data-dashboard-target="emptyState" class="hidden">
      <p class="text-gray-500">No pending questions at the moment.</p>
    </div>

    <div data-dashboard-target="questionsList" class="space-y-4"></div>

    <template data-dashboard-target="questionTemplate">
      <div class="bg-white shadow rounded-lg p-4">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm text-gray-500">
              Question ID: <span class="question-id"></span>
            </p>
            <h2 class="text-lg font-medium question-text"></h2>
            <p class="text-sm text-gray-600 question-context"></p>
          </div>
          <p class="text-sm text-gray-500 question-timestamp"></p>
        </div>
        <div class="mt-4">
          <a
            href="#"
            class="question-link inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Respond
          </a>
        </div>
      </div>
    </template>
  </div>
  ```

  #### Conversation Page

  ```html
  &lt;!-- responder/conversation.html -->
  <div data-controller="conversation">
    <div class="bg-white shadow rounded-lg p-4 mb-4">
      <h1 class="text-xl font-bold mb-2">Question</h1>
      <p data-conversation-target="questionText" class="text-lg"></p>
      <h2 class="text-lg font-medium mt-4 mb-2">Context</h2>
      <p data-conversation-target="questionContext" class="text-gray-600"></p>
    </div>

    <div class="bg-white shadow rounded-lg p-4 mb-4">
      <h2 class="text-lg font-medium mb-4">Conversation</h2>

      <div
        data-conversation-target="messagesList"
        class="space-y-4 max-h-96 overflow-y-auto mb-4"
      ></div>

      <div data-conversation-target="emptyState" class="hidden">
        <p class="text-gray-500 mb-4">
          No messages yet. Start the conversation by sending a response.
        </p>
        <form data-action="submit->conversation#startConversation">
          <div class="mb-4">
            <label
              for="initialResponse"
              class="block text-sm font-medium text-gray-700"
              >Initial Response</label
            >
            <textarea
              id="initialResponse"
              data-conversation-target="messageInput"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div>
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Start Conversation
          </button>
        </form>
      </div>

      <form
        data-conversation-target="messageForm"
        data-action="submit->conversation#sendMessage"
        class="hidden"
      >
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700"
            >Message</label
          >
          <textarea
            id="message"
            data-conversation-target="messageInput"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send
          </button>
          <button
            type="button"
            data-action="conversation#closeConversation"
            class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Close Conversation
          </button>
        </div>
      </form>
    </div>
  </div>
  ```

  #### Knowledge Base Page

  ```html
  &lt;!-- knowledge-base.html -->
  <div data-controller="knowledge-base">
    <div class="mb-4 flex space-x-4">
      <div class="flex-1">
        <label for="search" class="block text-sm font-medium text-gray-700"
          >Search</label
        >
        <input
          type="text"
          id="search"
          data-knowledge-base-target="searchInput"
          data-action="input->knowledge-base#search"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700"
          >Category</label
        >
        <select
          id="category"
          data-knowledge-base-target="categoryFilter"
          data-action="change->knowledge-base#filterByCategory"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="Fundamentals">Fundamentals</option>
          <option value="Communication">Communication</option>
          <option value="Workplace">Workplace</option>
          <option value="Education">Education</option>
        </select>
      </div>
    </div>

    <div data-knowledge-base-target="articlesList" class="space-y-4"></div>

    <template data-knowledge-base-target="articleTemplate">
      <div class="bg-white shadow rounded-lg p-4">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-lg font-medium article-title"></h2>
            <p class="text-sm text-gray-600 article-content line-clamp-3"></p>
            <p class="text-sm text-gray-500 mt-2">
              Category: <span class="article-category"></span>
            </p>
            <div class="article-tags flex flex-wrap gap-2 mt-2"></div>
          </div>
        </div>
        <div class="mt-4">
          <a
            href="#"
            class="article-link text-indigo-600 hover:text-indigo-800"
          >
            Read more
          </a>
        </div>
      </div>
    </template>
  </div>
  ```

  #### Terminology Page

  ```html
  &lt;!-- how-do-i-say.html -->
  <div data-controller="terminology">
    <div class="mb-4">
      <label for="search" class="block text-sm font-medium text-gray-700"
        >Search</label
      >
      <input
        type="text"
        id="search"
        data-terminology-target="searchInput"
        data-action="input->terminology#search"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div data-terminology-target="entriesList" class="space-y-4"></div>

    <template data-terminology-target="entryTemplate">
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg font-medium term"></h2>
        <p class="text-sm text-gray-600 definition mt-2"></p>
        <h3 class="text-md font-medium mt-4">Usage</h3>
        <p class="text-sm text-gray-600 usage"></p>
        <h3 class="text-md font-medium mt-4">Alternatives</h3>
        <div class="alternatives flex flex-wrap gap-2 mt-2"></div>
      </div>
    </template>
  </div>
  ```

  #### Summarization Page

  ```html
  &lt;!-- responder/summarize.html -->
  <div data-controller="summarization">
    <form
      data-summarization-target="form"
      data-action="submit->summarization#generateSummary"
      class="bg-white shadow rounded-lg p-4 mb-4"
    >
      <div class="mb-4">
        <label
          for="conversationId"
          class="block text-sm font-medium text-gray-700"
          >Conversation ID</label
        >
        <input
          type="text"
          id="conversationId"
          data-summarization-target="conversationId"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div class="mb-4 flex items-center">
        <input
          type="checkbox"
          id="includeContext"
          data-summarization-target="includeContext"
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label for="includeContext" class="ml-2 block text-sm text-gray-700"
          >Include Context</label
        >
      </div>
      <div class="mb-4">
        <label for="format" class="block text-sm font-medium text-gray-700"
          >Format</label
        >
        <select
          id="format"
          data-summarization-target="format"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="brief">Brief</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>
      <div
        data-summarization-target="error"
        class="text-red-500 mb-4 hidden"
      ></div>
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Generate Summary
      </button>
    </form>

    <div class="bg-white shadow rounded-lg p-4">
      <h2 class="text-lg font-medium mb-4">Summary</h2>
      <p data-summarization-target="summary" class="text-gray-600 mb-4"></p>

      <h3 class="text-md font-medium mb-2">Key Points</h3>
      <ul
        data-summarization-target="keyPoints"
        class="list-disc pl-5 text-gray-600"
      ></ul>
    </div>
  </div>
  ```

  ## Data Models

  Here are the recommended data models for the Genderbase API:

  ### User Model

  ```javascript
  {
    id: String,
    name: String,
    email: String,
    password: String (hashed),
    role: String (enum: ['responder', 'admin']),
    createdAt: Date,
    updatedAt: Date
  }
  ```

  ### Question Model

  ```javascript
  {
    id: String,
    name: String,
    email: String,
    question: String,
    context: String,
    status: String (enum: ['pending', 'in_progress', 'answered', 'closed']),
    assignedTo: String (User ID, optional),
    conversationId: String (optional),
    createdAt: Date,
    updatedAt: Date
  }
  ```

  ### Conversation Model

  ```javascript
  {
    id: String,
    questionId: String,
    messages: [
      {
        id: String,
        sender: String (enum: ['user', 'responder']),
        content: String,
        timestamp: Date
      }
    ],
    status: String (enum: ['active', 'closed']),
    summary: {
      content: String,
      keyPoints: [String],
      generatedAt: Date
    },
    createdAt: Date,
    updatedAt: Date,
    closedAt: Date (optional)
  }
  ```

  ### Knowledge Base Article Model

  ```javascript
  {
    id: String,
    title: String,
    content: String,
    category: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date
  }
  ```

  ### Terminology Entry Model

  ```javascript
  {
    id: String,
    term: String,
    definition: String,
    usage: String,
    alternatives: [String],
    createdAt: Date,
    updatedAt: Date
  }
  ```

  ### Answered Question Model

  ```javascript
  {
    id: String,
    question: String,
    answer: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date
  }
  ```

  ## Security Considerations

  ### Authentication and Authorization

  1. **JWT Authentication**: Use JSON Web Tokens (JWT) for authentication. Tokens should be short-lived (e.g., 1 hour) with refresh token functionality.
  2. **Password Security**: Store passwords using strong hashing algorithms (e.g., bcrypt) with appropriate salt rounds.
  3. **Role-Based Access Control**: Implement RBAC to restrict access to certain endpoints based on user roles.
  4. **CSRF Protection**: Implement CSRF tokens for form submissions to prevent cross-site request forgery attacks.

  ### Data Protection

  1. **Input Validation**: Validate all user inputs on both client and server sides to prevent injection attacks.
  2. **Rate Limiting**: Implement rate limiting to prevent brute force attacks and API abuse.
  3. **HTTPS**: Ensure all API communications are encrypted using HTTPS.
  4. **Sensitive Data**: Minimize the collection of personally identifiable information (PII) and implement appropriate data anonymization techniques.
  5. **Error Handling**: Implement proper error handling to avoid leaking sensitive information in error messages.

  ### API Security

  1. **API Keys**: Use API keys for external integrations.
  2. **CORS**: Configure Cross-Origin Resource Sharing (CORS) to restrict access to the API from unauthorized domains.
  3. **Content Security Policy**: Implement CSP headers to prevent XSS attacks.
  4. **Security Headers**: Set appropriate security headers (X-Content-Type-Options, X-Frame-Options, etc.) to enhance security.

  ## Testing

  ### Unit Testing

  1. **Controllers**: Test each controller function to ensure they handle requests and responses correctly.
  2. **Models**: Test model validations, methods, and relationships.
  3. **Middleware**: Test authentication and other middleware functions.

  ### Integration Testing

  1. **API Endpoints**: Test each API endpoint to ensure it returns the expected responses for various inputs.
  2. **Authentication Flow**: Test the complete authentication flow, including login, token verification, and logout.
  3. **Error Handling**: Test error scenarios to ensure the API returns appropriate error messages and status codes.

  ### End-to-End Testing

  1. **User Flows**: Test complete user flows, such as submitting a question, starting a conversation, and generating a summary.
  2. **Frontend Integration**: Test the integration between the frontend and the API to ensure they work together correctly.

  ### Performance Testing

  1. **Load Testing**: Test the API under heavy load to ensure it can handle multiple concurrent requests.
  2. **Response Time**: Measure and optimize API response times.

  ## Deployment

  ### Environment Setup

  1. **Environment Variables**: Use environment variables for configuration settings, such as database connection strings, API keys, and JWT secrets.
  2. **Multiple Environments**: Set up separate environments for development, testing, and production.

  ### Deployment Options

  1. **Containerization**: Use Docker to containerize the application for consistent deployment across environments.
  2. **CI/CD**: Implement continuous integration and continuous deployment pipelines for automated testing and deployment.
  3. **Hosting**: Choose an appropriate hosting provider based on your requirements (e.g., AWS, Google Cloud, Heroku).

  ### Monitoring and Maintenance

  1. **Logging**: Implement comprehensive logging to track API usage, errors, and performance metrics.
  2. **Monitoring**: Set up monitoring tools to track API health, performance, and usage patterns.
  3. **Backup and Recovery**: Implement regular database backups and disaster recovery procedures.
  4. **Updates and Patches**: Regularly update dependencies and apply security patches.

  ## Backend Implementation

  ### Node.js with Express

  For a Node.js implementation with Express, here's a basic structure:

  ```plaintext
  /
  ├── src/
  │   ├── controllers/
  │   │   ├── authController.js
  │   │   ├── questionController.js
  │   │   ├── conversationController.js
  │   │   ├── knowledgeBaseController.js
  │   │   ├── terminologyController.js
  │   │   └── summarizationController.js
  │   ├── models/
  │   │   ├── User.js
  │   │   ├── Question.js
  │   │   ├── Conversation.js
  │   │   ├── KnowledgeBaseArticle.js
  │   │   ├── TerminologyEntry.js
  │   │   └── AnsweredQuestion.js
  │   ├── middleware/
  │   │   ├── auth.js
  │   │   ├── errorHandler.js
  │   │   └── rateLimiter.js
  │   ├── routes/
  │   │   ├── authRoutes.js
  │   │   ├── questionRoutes.js
  │   │   ├── conversationRoutes.js
  │   │   ├── knowledgeBaseRoutes.js
  │   │   ├── terminologyRoutes.js
  │   │   └── summarizationRoutes.js
  │   ├── services/
  │   │   ├── authService.js
  │   │   ├── emailService.js
  │   │   └── summarizationService.js
  │   ├── utils/
  │   │   ├── jwt.js
  │   │   ├── validation.js
  │   │   └── helpers.js
  │   ├── config/
  │   │   ├── database.js
  │   │   └── app.js
  │   └── app.js
  ├── tests/
  │   ├── unit/
  │   ├── integration/
  │   └── e2e/
  ├── .env
  ├── .env.example
  ├── package.json
  └── README.md
  ```

  ### Example Controller Implementation

  Here's an example implementation of the authentication controller:

  ```javascript
  // src/controllers/authController.js
  const User = require("../models/User");
  const jwt = require("../utils/jwt");
  const bcrypt = require("bcrypt");

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token
      const token = jwt.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Return user and token
      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  };

  exports.logout = (req, res) => {
    // In a stateless JWT implementation, the client is responsible for removing the token
    res.status(200).json({ message: "Logged out successfully" });
  };

  exports.verify = (req, res) => {
    // The user is already verified by the auth middleware
    res.status(200).json({
      valid: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    });
  };
  ```

  ### Example Route Implementation

  Here's an example implementation of the authentication routes:

  ```javascript
  // src/routes/authRoutes.js
  const express = require("express");
  const router = express.Router();
  const authController = require("../controllers/authController");
  const { requireAuth } = require("../middleware/auth");

  // Public routes
  router.post("/login", authController.login);
  router.post("/logout", authController.logout);

  // Protected routes
  router.get("/verify", requireAuth, authController.verify);

  module.exports = router;
  ```

  ### Example Middleware Implementation

  Here's an example implementation of the authentication middleware:

  ```javascript
  // src/middleware/auth.js
  const jwt = require("../utils/jwt");

  exports.requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
  ```

  ## Conclusion

  This document provides a comprehensive guide for implementing the Genderbase API, replacing the static HTML scaffolds with a dynamic backend. By following these guidelines, you can create a robust API that supports all the required functionality, including user authentication, question submission, conversation management, knowledge base articles, terminology guidance, and conversation summarization.

  The implementation details provided here are flexible and can be adapted to different backend technologies and frameworks based on your specific requirements and preferences. The key is to ensure that the API endpoints, data models, and security considerations are properly implemented to create a secure and efficient system.

  Remember to thoroughly test the API before deploying it to production, and to implement proper monitoring and maintenance procedures to ensure its continued reliability and performance.
