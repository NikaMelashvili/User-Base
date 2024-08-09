use user_registration;

create table user(
                     id bigint primary key auto_increment,
                     email varchar(255),
                     password varchar(255),
                     profile_pic longblob
);