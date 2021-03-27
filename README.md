# Application Title: Bang it Out!

This application allows the user to join a community, speak one's mind, and get something off one's chest.  Bang it Out lets users creat a blog post and get connected with a community who thinks likewise.

## Important Links

- [Other Repo](https://github.com/Team-Bang/Bang-front)
- [Deployed API](https://secure-earth-37350.herokuapp.com/)
- [Deployed Client](https://team-bang.github.io/Bang-front/#/)

## Planning Story

Our first plan of action was to create a Kanban board to work off of.  Our main focus was around setting up the back-end first and get all of our crud actions taken care of with our main resource.  Upon completion of that, the plan was to attack the front-end and incorporate our new resource's crud actions on the front.  With a little bit of pair programming and mostly team programming we made sure that all of our checkpoint were hit so a user can join the community, and set up a new blog post.  We worked off of our kanban board, requirements and wireframes.

### User Stories

- As a unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a unregistered user, I would like to see all users blog posts.
- As a unregistered user, I would like to see comments on those blog posts.
- As a signed in user, I would to create blog posts.
- As a signed in user, I would to comment on other users' blog posts.
- As a signed in user, I would to update my blog posts and comments.
- As a signed in user, I would to delete my blog posts and comments.

### Technologies Used

- React
- HTML/CSS
- Bootstrap
- Javascript
- React Router
- Mongoose

### Catalog of Routes

Verb         |	URI Pattern
------------ | -------------
GET | /blogposts
GET | /blogposts/:id
POST | /blogposts
PATCH | /blogposts/:id
DELETE | /blogposts/:id

### Unsolved Problems

- Still need to work on styling.
- Would like to eventually allow other user's to comment on blogposts.

## Images

---

#### Wireframe:
##### Sign In/Up
![wireframe](https://media.git.generalassemb.ly/user/33542/files/ab0b8d80-8bb3-11eb-92ac-0c0f9b63b2eb)
##### Main Page
![wireframe](https://media.git.generalassemb.ly/user/33542/files/d8f0d200-8bb3-11eb-8e09-a4053baa91b9)
##### User Page
![wireframe](https://media.git.generalassemb.ly/user/33542/files/e27a3a00-8bb3-11eb-83f6-3fd342ceb9ed)

#### ERD
![ERD](https://media.git.generalassemb.ly/user/33542/files/4ea96d80-8bb5-11eb-8142-965f98d7db61)
