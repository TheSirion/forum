## Create database

```
CREATE TABLE IF NOT EXISTS users (
	user_id serial primary key,
  	username varchar(255) unique not null,
  	password varchar(255) not null,
  	email varchar(255) unique not null,
  	avatar text,
  	refresh_token text default null,
  	created_at timestamp default now()
);


CREATE TABLE IF NOT EXISTS roles (
	role_id serial primary key,
  	role_name varchar(255) not null
);


CREATE TABLE IF NOT EXISTS user_role (
	user_id int not null,
  	role_id int not null,
  	grant_date timestamp default now(),
  	
  	primary key (user_id, role_id),
  	foreign key (user_id) references users (user_id) ON DELETE CASCADE,
   	foreign key (role_id) references roles (role_id)
);


CREATE TABLE IF NOT EXISTS forums (
	forum_id serial primary key,
  	forum_name varchar(255) not null,
  	created_at timestamp default now()
);


CREATE TABLE IF NOT EXISTS forum_view (
	forum_id int primary key,
  	user_id int not null,
  	foreign key (forum_id) references forums (forum_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS user_forums (
	user_id int not null,
  	forum_id int not null,
	joined_date timestamp default now(),
  
  	primary key (user_id, forum_id),
  	foreign key (user_id) references users (user_id) ON DELETE CASCADE,
  	foreign key (forum_id) references forums (forum_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS posts (
	post_id serial primary key,
  	user_id int not null,
  	forum_id int not null,
  	title varchar(255) not null,
  	content text not null,
  	created_at timestamp default now(),
  	updated_at timestamp default now(),
  	
  	foreign key (user_id) references users (user_id) ON DELETE CASCADE,
  	foreign key (forum_id) references forums (forum_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS post_view (
	post_id int primary key,
  	foreign key (post_id) references posts (post_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS comments (
	comment_id serial primary key,
  	user_id int not null,
  	post_id int not null,
  	content text not null,
  	created_at timestamp default now(),
  	updated_at timestamp default now(),
  	
  	foreign key (user_id) references users (user_id) ON DELETE CASCADE,
  	foreign key (post_id) references posts (post_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS replies (
	reply_id serial primary key,
  	user_id int not null,
  	comment_id int not null,
  	content text not null,
  	created_at timestamp default now(),
  	
  	foreign key (user_id) references users (user_id) ON DELETE CASCADE,
  	foreign key (comment_id) references comments (comment_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS post_likes (
  	post_like_id serial primary key,
	post_id int not null,
  
  	foreign key (post_id) references posts(post_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS comment_likes (
  	comment_like_id serial primary key,
	comment_id int not null,
  
  	foreign key (comment_id) references comments(comment_id) ON DELETE CASCADE
);
```