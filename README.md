# mini-wp
A simple blog project

To run the server, go to the server directory run : 
```
npm install
npm start
```

# API References
## Login
```
POST /api/users/login
```
### Body:
email: registered email address  
password: password associated with the specified email  

## Register
```
POST /api/users/register
```
### Body:
name: user's full name  
email: user's email address  
password: user's password  

## Get articles created by everyone
```
GET /api/articles/all
```

# The following requests require a token which can be obtained from login
### Header
```
token: <token>
```

## Get authenticated user's articles
```
GET /api/articles
```

## Get an article by its article id
```
GET /api/articles/:articleId
```

## Post a new article
```
POST /api/articles
```
### Body
title: article's title  
tags: comma separated tags (e.g. : tag1,tag2,tag3)  
content: article's content  

## Update an article
```
PUT /api/articles/:articleId
```
### Body
title: article's title  
tags: comma separated tags (e.g. : tag1,tag2,tag3)  
content: article's content  

## Delete an article
```
DELETE /api/articles/:articleId
```

## Post an image for an article
```
POST /api/articles/file/:articleId
```
### Body
image: the image file  
