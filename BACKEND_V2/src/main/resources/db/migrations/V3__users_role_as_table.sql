CREATE TABLE users_roles
(
    user_id BIGINT NOT NULL,
    role    VARCHAR(255)
);

ALTER TABLE users_roles
    ADD CONSTRAINT fk_users_roles_on_user FOREIGN KEY (user_id) REFERENCES users_ (id);

ALTER TABLE users_
    DROP COLUMN roles;