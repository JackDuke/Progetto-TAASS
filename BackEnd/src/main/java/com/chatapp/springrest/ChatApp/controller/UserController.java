package com.chatapp.springrest.ChatApp.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.chatapp.springrest.ChatApp.model.User;
import com.chatapp.springrest.ChatApp.repo.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class UserController {
    
    @Autowired
	UserRepository repository;

    @PostMapping(value = "/login")
	public ResponseEntity<User> login(@RequestBody User user) {
        return repository
            .findByEmailAndPassword(user.getEmail(), user.getPassword())
            .map(u -> {
                u.setStatus("Online");
                return repository.save(u);
            })
            .map(u -> ResponseEntity.ok(u))
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
	}

    @GetMapping("/users")
	public List<User> getAllCustomers() {
		System.out.println("Get all Customers...");

		List<User> users = new ArrayList<>();
		repository.findAll().forEach(users::add);

		return users;
	}
}
