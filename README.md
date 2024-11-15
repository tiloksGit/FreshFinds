# FreshFinds

# Project Specifications

## User Authentication

- [ ] **Sign Up/Login**: Users can create accounts and log in.

* [ ] **Profile Management**: Users can edit their profiles, including contact information and payment details.

## Product Listings

- [ ] **Create Listings**: Users can upload items for sale with descriptions, images, prices, and categories.

* [ ] **Edit/Delete Listings**: Sellers can modify or remove their listings.

## Search and Filter

- [ ] **Search Bar**: Users can search for specific items.

* [ ] **Filters**: Users can filter by category, price range, condition (new/used), and location.

## Categories

- [ ] **Product Categories**: Organize items into categories like electronics, clothing, furniture, etc.

* [ ] **Subcategories**: Further refine categories for easier navigation.

## Product Details

- [ ] **Item Pages**: Each item should have a dedicated page with detailed descriptions, images, seller information, and options to contact the seller.

## Shopping Cart

- [ ] **Add to Cart**: Users can add items to a cart for later purchase.

* [ ] **Checkout Process**: A streamlined checkout process with options for payment.

## Messaging System

- [ ] **In-App Messaging**: Allow buyers and sellers to communicate directly through the platform.

* [ ] **Notifications**: Notify users about messages, new listings, and updates on their products.

## Reviews and Ratings

- [ ] **Feedback System**: Buyers can leave reviews and ratings for sellers, helping build trust in the community.

## Admin Panel

- [ ] **Manage Users**: Admins can view and manage user accounts.
- [ ] **Moderate Listings**: Admins can approve, reject, or delete listings that violate guidelines.
- [ ] **Analytics**: Track user engagement, popular products, and overall site performance.

## Location Services

- [ ] **Geolocation**: Show listings based on the user's location.
- [ ] **Pickup/Delivery Options**: Options for local pickup or delivery services.

## Payment Integration

- [ ] **Secure Payments**: Integrate payment gateways (like PayPal or Stripe) for secure transactions.

* [ ] **Payment Tracking**: Allow users to track their payment history.

## Wish Lists

- [ ] **Save Items**: Users can create wish lists for items they’re interested in but not ready to buy.

## Community Features

- [ ] **Forums/Discussion Boards**: Allow users to discuss items, share tips, or organize swaps.

* [ ] **Event Calendar**: Promote events like swap meets or sales.

## Responsive Design

- [ ] **Mobile-Friendly**: Ensure the site works well on mobile devices for users on the go.

## Analytics Dashboard

- [ ] **User Insights**: Provide users with insights into their buying/selling history and performance.

## Security Features

- [ ] **Data Protection**: Ensure user data is secure and comply with privacy regulations.

* [ ] **Report Listings**: Allow users to report inappropriate listings or scams.



# Chat Application - Overview

## Added Files Overview

### Frontend

#### `Chat.js`

- **Purpose**: Renders an individual chat conversation. Users can view message history, send new messages, and receive real-time message updates.
- **Key Functions**:
  - Displays messages from a selected conversation.
  - Manages the input and sending of new messages.
  - Connects to WebSocket for real-time messaging.

#### `ChatMessages.js`

- **Purpose**: Helper component that renders individual messages within a conversation, supporting different styles for sent and received messages.
- **Usage**: Used within `Chat.js` to render each message with appropriate styling.

#### `Chat.css`

- **Purpose**: Contains styling for the chat UI elements, such as message bubbles, input fields, and layout of the conversation area.

---

### Backend

#### `ChatController.js`

- **Purpose**: Implements the logic for handling chat operations, including fetching conversation history, retrieving user messages, and sending messages.
- **Key Functions**:
  - `getConversations`: Retrieves all conversations relevant to a specific user.
  - `getMessages`: Fetches all messages for a specified conversation.
  - `sendMessage`: Saves a new message to the database and broadcasts it to conversation participants in real time.

#### `ChatRoute.js`

- **Purpose**: Defines API endpoints for chat-related operations.
- **Endpoints**:
  - `GET /conversations`: Gets all conversations for the logged-in user.
  - `GET /messages/:conversationId`: Retrieves messages for a specific conversation.
  - `POST /messages`: Sends a new message in a conversation.

#### `User.js`

- **Purpose**: Defines the schema for user data, storing information about buyers and sellers.
- **Fields**: 
  - `username`, `email`, `role` (buyer/seller), and other relevant fields.

#### `UserRoute.js`

- **Purpose**: Manages user-specific operations such as registration, login, and updating user details.
- **Endpoints**:
  - User management endpoints, such as login and registration, supporting user authentication and role assignment.

---

## Workflow

1. **User Accesses Conversations List**
   - **Component**: `Messages.js` (existing component, displays the conversation list).
   - **API Call**: `GET /conversations` (via `ChatRoute.js` and `ChatController.js`).
   - **Functionality**: Fetches and displays a list of conversations for the authenticated user.

2. **User Opens a Conversation**
   - **Components**: `Messages.js` and `Chat.js`.
   - **API Call**: `GET /messages/:conversationId` (via `ChatRoute.js` and `ChatController.js`).
   - **Functionality**: 
     - When a user selects a conversation, `Chat.js` loads the conversation’s message history.
     - Messages are displayed with `ChatMessages.js`, showing each message’s sender and timestamp.

3. **User Sends a New Message**
   - **Component**: `Chat.js`.
   - **API Call**: `POST /messages` (via `ChatRoute.js` and `ChatController.js`).
   - **Functionality**: 
     - User types a message and sends it, triggering the `sendMessage` function.
     - `sendMessage` updates the database with the new message.
     - The message is broadcast to participants in real time using WebSocket.

4. **Real-Time Updates with WebSocket**
   - **Backend**: Configured in `server.js` (WebSocket setup).
   - **Functionality**: 
     - When a message is sent, WebSocket broadcasts it to all connected users in the conversation.
     - Real-time updates are shown in `Chat.js` without needing a page refresh.

5. **Access Control and Authentication**
   - **Middleware**: `authenticateMiddleware.js` (existing).
   - **Functionality**: 
     - Ensures users can only access their own conversations.
     - Middleware verifies the user’s JWT token and checks their role, providing secure access to conversations and messages.
