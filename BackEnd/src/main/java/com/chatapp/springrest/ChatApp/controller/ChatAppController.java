package com.chatapp.springrest.ChatApp.controller;

import com.chatapp.springrest.ChatApp.repo.ChatAppRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class ChatAppController {
    
    @Autowired
	ChatAppRepository repository;
}
