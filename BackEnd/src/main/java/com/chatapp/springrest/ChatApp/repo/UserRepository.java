package com.chatapp.springrest.ChatApp.repo;

import java.util.List;

import com.chatapp.springrest.ChatApp.model.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
	List<User> existsById(long id);

	// User login(User user);

}
